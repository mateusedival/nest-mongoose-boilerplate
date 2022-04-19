import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { ValidationPipe } from '../src/shared/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection, isValidObjectId } from 'mongoose';
import { UserDocument } from '../src/modules/users/users.schema';
import { UsersRepository } from '../src/modules/users/users.repository';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let configService: ConfigService;
  let usersRepository: UsersRepository;
  let user: UserDocument;
  let jwtToken: string;
  let productId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    configService = moduleFixture.get<ConfigService>(ConfigService);
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);

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

      user = response.body;
      usersRepository.findByIdAndUpdate(user._id, { hasAdmin: true });
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

  describe('(POST) /products', () => {
    test('should create a product', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .auth(jwtToken, { type: 'bearer' })
        .send({ name: 'T-shirt', description: 'confy', quantity: 10, price: 2 })
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'T-shirt',
        description: 'confy',
        quantity: 10,
        price: 2,
      });

      const isValid = isValidObjectId(response.body._id);
      expect(isValid).toBe(true);
      productId = response.body._id;
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send({ name: 'T-shirt', description: 'confy', quantity: 10, price: 2 })
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(GET) /products', () => {
    test('should should get all products', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'T-shirt',
            description: 'confy',
            quantity: 10,
            price: 2,
          }),
        ]),
      );
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(GET) /products/:id', () => {
    test('should get an user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/products/${productId}`)
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: productId,
        name: 'T-shirt',
        description: 'confy',
        quantity: 10,
        price: 2,
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(PATCH) /products/:id', () => {
    test('should update an user', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/${productId}`)
        .auth(jwtToken, { type: 'bearer' })
        .send({ quantity: 8 })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: productId,
        name: 'T-shirt',
        description: 'confy',
        quantity: 8,
        price: 2,
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/${productId}`)
        .send({ quantity: 8 })
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('(DELETE) /products/:id', () => {
    test('should delete an user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .auth(jwtToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).toMatchObject({
        _id: productId,
        name: 'T-shirt',
        description: 'confy',
        quantity: 8,
        price: 2,
      });
    });

    test('should fail because user does not have permission', async () => {
      usersRepository.findByIdAndUpdate(user._id, { hasAdmin: false });

      const response = await request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .auth(jwtToken, { type: 'bearer' })
        .expect(403);

      expect(response.body).toMatchObject({
        statusCode: 403,
        message: 'Forbidden resource',
      });
    });

    test('should fail because is not logged', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products/${productId}`)
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
