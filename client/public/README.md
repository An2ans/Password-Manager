#Password Manager

- index
- Descripcion

- Server
  The server-side of the project is built in

  1. Arquitecture
  2. DB
  3. Routes

- Client

  1. MAP
  2. Sign-up / Log-in
  3. Manager

- Features

- Bugs and next features

- Updates

The server-side of the project is built using Express as a RESTful API. It includes the database service code, the main server code to run express and other libraries, the routes, controllers and repositories, as well as the encryption code. The layout of files is:

- server.js - main server code
- dbService.js - database related code
- encryption.js - code to encrypt and decrypt the passwords
- routes
  - user
  - credentials
- controllers
  - user
  - credentials
- repositories
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

The users table store all the information about the different users (username, email, password), so different users can use the app in the same device and keep their credentials safe. Since we are using the username to log in, this is set as unique (at this moment) to avoid issues. Once an user sign-up, an new user is created and inserted in users table with an unique id.

All the credentials are saved in the same table, depending on the user who added the credentials, they will have an user id that we will use to fetch the right credentials only. Each credentials have a name to identify similar ones, an URL to quickly access the site, the username, password, iv number and the time stamp when it was created at.

Both, users and credentials tables store the passwords as a hash, toguether with an iv number needed for the decryption.

All the code related to the database service is included in the file dbService.js. This uses the promise form of [MySQL2 library](https://www.npmjs.com/package/mysql2)

---
