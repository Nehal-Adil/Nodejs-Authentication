
# Nodejs-Authentication

Authentication system which can be used as a starter code for creating any new application



## Installation


- Download my project from github
- Run npm install command in the terminal to install required dependencies
- npm run start to launch the project
## Features

- Sign up with email
- Sign in
- Sign out
- Reset password after sign in
- The password stored in the db to be encrypted
- Google login/signup
- Forgot password (generate a random password and send on email)
- Enable re-captcha on both sign up and log in
## Demo 

https://nodejs-auth-pksc.onrender.com



## NPM Packages :-

- express for running server and creating routes
- mongoose ODM for interacting with mongoDB
- ejs for rendering view/html pages
- express-ejs-layouts to render partials and layouts
- Bcrypto for encrypting passwords.
- request for sending http request from server
- dotenv to configure .env file(used for storing sensitive information)
- passport for authentication
- passport-local-strategy for local authentication
- passport-google-oauth2-strategy for social authentication
- nodemailer for sending mail
- cookie-parser for parsing cookies
- express-session for encrypting session-cookie made by passport
- connect-mongo for storing session-cookie in DB to make them persistent
- node-sass-middleware for generating css from scss/sass
- connect-flash for setting notification messages in session-cookie
generate-passwords for creating random passwords
