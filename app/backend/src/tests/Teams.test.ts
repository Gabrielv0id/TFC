import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/TeamModel';
import { Response } from 'superagent';
import teams from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  afterEach(() => {
    sinon.restore();
   });
   let chaiHttpResponse: Response;
  describe('GET /teams', () => {
    beforeEach(async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    });

    it('deve retornar status 200 e todos os times', async () => {
     chaiHttpResponse = await chai.request(app).get('/teams');

     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.be.equal(teams);
    });
  });

  describe('GET /teams/:id', () => {
    it('deve retornar status 200 e o time correto', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as TeamModel);
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal(teams[0]);
    });

    it('deve retornar o erro 404 caso o id esteja incorreto', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(undefined);
      chaiHttpResponse = await chai.request(app).get('/teams/999');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.equal({ message: "Team not found!" });
    });
  });
});
