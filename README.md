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
  - [ ] abstract repositories
  - [x] Documentation with swagger
  - [ ] authentication
    - [ ] jwt/local strategy
    - [ ] hashing passwords
  - [ ] interceptors for validation/parsing
  - [ ] unit testing
  - [ ] e2e testing
  - [x] logger
  - [ ] interceptor for serializing response
  - [ ] caching
  - [ ] authorization