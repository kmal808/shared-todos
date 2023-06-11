# Shared Todos

# Live site https://sharedtodos.bobbynoodles.com

## Shared Todos is a simple todo/task list app with some added sauce. 

Auth'd users can choose to share their list or lists with other auth'd users. Think aocial network meets todo lists. 


Once logged in, the user will be taken to their lists page.

From here users can:
- create, edit, and delete lists
- share thier lists with others
- view and select lists that are shared with themz

Each indixidual list has the option to 
- create new todos
- read/edit todos
- mark todos as complete (update)
- delete tododa

  <h2>This was designed using MVC (_model, view, controller_)  as the architecture. Passport.js for user authorization, express.js for tbe backemd server, ejs as a template engine, and mongodb for rhe datastore. I call it s MEEN app.</h2>

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# To run this project locally:

1. Creat an empty project folder, `cd` into said folder and run the 'git clone' command. 

2. Once tbe files have been cloned down to your local run the 
`npm install` command to install the needed packages and dependencies.

3. Create a `.env` file 
`touch .env` 
add the following as `key: value` pairs:
- PORT: 2121 (can be any port example: 3000)
- DB_STRING: `your database URI`

4. run `npm run start` to fire up the development server

5. Now enter `localhost:PORT` into your browser address bar (PORTv. vv= the port number choosen in the`.env` file. 

6. Make changes to your clone and enjoy 😎
