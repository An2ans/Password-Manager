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

## Server

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

## DATABASE

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

## API

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

Inside the public folder you can find a copy of this readme file, the favicon examples, and the index.html file with the root where we will render the app.

Inside the src folder you can find the global styles named as index.css, the index.js file where the app component is, and 3 folders containing the components, the specific styles for each component, and a folder named utils with the form validators.

In index.js, we can render the right components depending on the route and state. Example: if the user is not logged in they cannot access the manager page at the root route "/" they will see the welcome page instead. Once the user is logged, the same route will show the manager page. This is also used to restrict the access to log-in / sign-up page is the user is already logged in.

The user journey will be as follows:

First, the user will sign up at /sign-up, the user credentials will be sent to the db, the app will log-in the new user automatically and re-direct them to the manager page. Here, the user can see all the credentials already in the account (empty due new user) and can create new credentials.

To do so, they must click on the modal add. On click, the modal will change the display state and show a form to create new credentials. There is a password generator that will return a randon 12 characters (alfanumeric and special) password, also a password strength indicator if you wish to create your own password. You can hide / show the password using the icon next to it field. For last, the form has all sort of validators to ensure the fields have a min character number, password is min 8 character, the url is correct, etc.

Once the credentials are created, it will be shown on the password manager. It can get quite messy with more and more credentials, so I added a search bar to sort them fo their name. To hide the username and password from other eyes, the user must click on the show modal, it will display the credentials for a limited time (10s). You can click on the password and it will be copied to your clipboard.
