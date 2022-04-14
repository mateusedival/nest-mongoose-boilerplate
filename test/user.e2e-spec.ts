import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { ValidationPipe } from '../src/shared/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection, isValidObjectId } from 'mongoose';

// TODO: tests run in parallel, diasable it

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let configService: ConfigService;
  let jwtToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    configService = moduleFixture.get<ConfigService>(ConfigService);

    const username = configService.get('TEST_DATABASE_USER');
    const password = configService.get('TEST_DATABASE_PASSWORD');
    const database = configService.get('TEST_DATABASE_NAME');
    const host = configService.get('DATABASE_HOST');

    connection = await createConnection(`mongodb://${host}/${database}`, {
      auth: { username, password },
      authSource: 'admin',
    });
  });

  describe('(POST) /auth/register', () => {
    test('should register an user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ name: 'admin', password: 'admin', username: 'admin' })
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'admin',
        username: 'admin',
      });
      const isValid = isValidObjectId(response.body._id);
      expect(isValid).toBe(true);
    });

    test('should fail because requires a username', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ name: 'admin', password: 'admin' })
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        messages: { username: 'username should not be empty' },
      });
    });

    test('should fail because username already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ name: 'admin', password: 'admin', username: 'admin' })
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        message: 'Username already in use',
      });
    });
  });

  describe('(POST) /auth/login', () => {
    test('should give an acess_token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin', username: 'admin' })
        .expect(201);

      expect(response.body).toHaveProperty('acess_token');
      jwtToken = response.body.acess_token;
    });

    test('should fail because user doesnt exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ name: 'notadmin', password: 'admin' })
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(POST) /users', () => {
    test('should create an user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .auth(jwtToken, { type: 'bearer' })
        .send({ name: 'Charlie', password: '123', username: 'XxX_charlie_XxX' })
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'Charlie',
        username: 'XxX_charlie_XxX',
      });

      const isValid = isValidObjectId(response.body._id);
      expect(isValid).toBe(true);
      userId = response.body._id;
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'Charlie', password: '123', username: 'XxX_charlie_XxX' })
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(GET) /users', () => {
    test('should should get all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: userId,
            name: 'Charlie',
            username: 'XxX_charlie_XxX',
          }),
        ]),
      );
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(GET) /users/:id', () => {
    test('should get an user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: userId,
        name: 'Charlie',
        username: 'XxX_charlie_XxX',
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(PATCH) /users/:id', () => {
    test('should update an user', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .auth(jwtToken, { type: 'bearer' })
        .send({ name: 'Charlie Todd' })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: userId,
        name: 'Charlie Todd',
        username: 'XxX_charlie_XxX',
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({ name: 'Charlie Todd' })
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(DELETE) /users/:id', () => {
    test('should delete an user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: userId,
        name: 'Charlie Todd',
        username: 'XxX_charlie_XxX',
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await app.close();
  });
});
