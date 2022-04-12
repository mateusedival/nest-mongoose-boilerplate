nest new nest-mongoose-boilerplate

nest g resource modules/auth
nest g resource modules/users
nest g resource modules/products


## TODO:
  - [x] mongodb and schemas
    - [x] user
    - [x] product
  - [x] config
    - [x] database auth
  - [x] Documentation with swagger
  - [x] logger
  - [x] authentication
    - [x] jwt/local strategy
    - [x] hashing passwords
  - [x] interceptors for validation/parsing
  - [x] abstract repositories
  - [ ] unit testing
  - [ ] e2e testing
  - [ ] interceptor for serializing response?
  - [ ] caching
  - [ ] authorization
  - [ ] constants?