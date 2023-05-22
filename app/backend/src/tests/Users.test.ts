import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import users from './mocks/Users.mock';
import User from '../database/models/UserModel';
import Token from '../utils/Token'

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  afterEach(() => {
    sinon.restore();
  });
  let chaiHttpResponse: Response;
  describe('POST /login', () => {
    it('retorna status 400 e uma mensagem se não tiver password', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
      });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
    it('retorna status 400 e uma mensagem se não tiver passado email', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('retorna status 401 e uma mensage se não tiver passado a senha incorreta', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'aaaaaaa',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('retorna status 401 e uma mensage se não tiver passado uma senha menor que o necessario', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '11',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('retorna status 401 e uma mensage se não tiver passado um email errado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'asfa123@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('retorna status 401 e uma mensage se não tiver passado um email', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '1asfa',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('retorna status 200 e um token caso tudo seja passado corretamente', async () => {
      sinon.stub(User, 'findOne').resolves(users[0] as User);

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('token')
    });
  });
  describe('GET /login/role', () => {
    it('retorna status 401 e uma mensagem se não tiver um token', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/role')

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found'});
    });

    it('retorna status 401 e uma mensagem se o token não estiver correto ou expirado', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', 'wrong-token');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token'});
    });

    it('retorna status 200 e a role do usuario caso esteja tudo correto', async () => {
      const token = new Token().generate({ id: 1, email: 'admin@admin.com'});
      sinon.stub(User, 'findOne').resolves(users[0] as User);

      chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
    });
  });
});