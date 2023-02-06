#Password Manager

- Index
- Description
- Server

  1. Arquitecture
  2. DB
  3. API

- Client

  1. MAP
  2. Sign-up / Log-in
  3. Manager

- Features

- Bugs and next features

- Updates

##Server

The server-side of the project is built using Express as a RESTful API. It includes the database service code, the main server code to run express and other libraries, the routes, controllers and repositories, as well as the encryption code. The layout of files is:

- server.js - main server code
- dbService.js - database related code
- encryption.js - code to encrypt and decrypt the passwords
- routes - All the routes related to the user and credentials
  - user
  - credentials
- controllers -The controllers that deal with the requests / responses
  - user
  - credentials
- repositories - All the code related to the DB and logic
  - user
  - credentials

##DATABASE

The database uses SQL to store the data in a database file named passwordManager.db . If this file does not exist, when the user log-in or sign-up, the route will call the setup method from dbService.js, this will ensure the file exists and it includes the correct tables. There are only 2 tables (at this moment) users and credentials, with the following layout:

- users

  - user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
  - username VARCHAR(50) NOT NULL UNIQUE
  - password VARCHAR(250) NOT NULL
  - iv VARCHAR(250) NOT NULL
  - email VARCHAR(250) NOT NULL

- credentials
  - credentials_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
  - name VARCHAR(50) NOT NULL
  - url VARCHAR(250) NOT NULL
  - username VARCHAR(250) NOT NULL
  - password VARCHAR(250) NOT NULL
  - iv VARCHAR(250) NOT NULL
  - created DATETIME DEFAULT current_timestamp
  - user_id INT NOT NULL FOREIGN KEY REFERENCES users(user_id)

The users table store all the information about the different users (username, email, password), so different users can use the app in the same device and keep their credentials safe. Since we are using the username to log in, this is set as unique to avoid issues. Once an user sign-up, an new user is created and inserted in users table with an unique id.

All the credentials are saved in the same table, depending on the user who added the credentials, they will have an user id that we will use to fetch the right credentials only. Each credentials have a name to identify similar ones, an URL to quickly access the site, the username, password, iv number and the time stamp when it was created at.

Both, users and credentials tables store the passwords as a hash, toguether with an iv number needed for the decryption. In encryption.js we can find 2 functions, encrypt and decrypt, both use the package [Crypto](https://www.npmjs.com/package/crypto-js). Encrypt takes a password (string) and return a hash and a iv number. Decrypt takes a hash and a iv number and returns the original password.

All the code related to the database service is included in the file dbService.js. This uses the promise form of [MySQL2 library](https://www.npmjs.com/package/mysql2) to start the connection.

##API

I have divided all the code regarding the API calls in 3 folders: routes, controllers and repositories. The routes are created according to the RESTfull principles.

- POST /user - create user
- GET /user - list all users
- GET /user/:id - find user by id
- PUT /user/:id - edit user
- DELETE /user/:id - delete user
- POST /auth - login user

- GET /credentials - list all credentials
- GET /credentiald/:userId - get all the user credentials
- POST /credentials/:userId - create new credentials
- GET /credentials/:userId/:credId - show selected credentials (username & password)
- PUT /credentials/:userId/:credId - update the credential details
- DELETE /credentials/:userId/:credId - delete the credentials

The controllers deal with the requests / responses, they take the parameters from req.body and store it in a variable, they call the specific function from the repositories, and they ensure the response has the same structure, with a boolean named "success". This is used in the client side to show the results (if any) or to advise on an error.

The repositories, as mentioned above, is where the db code & logic is. Here I use throw to raise an error if the results are not the expected ones. For example, to create a new user we first search in the db for the same username, to avoid an error while addidng the new user since username is unique. If there is an user with the same username already, the createUser function will throw an error with the message "This username already exists". Since the controller code is inside a try / catch statement, the response will be success: false , message: "This username already exists"; this will be used in the client side to advise the user to try a different username.

## CLIENT

The client-side of this project is built in React using [create-react-app](https://www.npmjs.com/package/create-react-app).
