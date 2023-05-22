import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/MatchModel';
import MockedMatches from './mocks/Matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  afterEach(() => {
    sinon.restore();
  });
  let chaiHttpResponse: Response;

  describe('GET /matches', () => {
    it('retorna status 200 e todas as partidas', async () => {
      sinon.stub(Match, 'findAll').resolves(MockedMatches as unknown as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(MockedMatches);
    });

    it('caso o inprogress esteja marcado true retorna status 200 e as partidas com true', async () => {
      sinon.stub(Match, 'findAll').resolves([MockedMatches[1], MockedMatches[3]] as unknown as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([MockedMatches[1], MockedMatches[3]]);
    });

    it('caso o inprogress esteja marcado false retorna status 200 e as partidas com false', async () => {
      sinon.stub(Match, 'findAll').resolves([MockedMatches[0], MockedMatches[2]] as unknown as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([MockedMatches[0], MockedMatches[2]]);
    });
  });
});