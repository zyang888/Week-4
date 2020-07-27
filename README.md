# Week 4

This week is an exercise in authentication and middleware. 

## Learning Objectives

At the end of this week, a student should:
- have implemented an authenticated API with signup, login, logout, and change password routes
- have used bcrypt to securely store passwords
- have used middleware for authentication enforcement and error handling

## The assignment

The assignment this week is designed to get you to build a simple authenticated API. You will build the common routes for signup, login, logout, and changing passwords. Then you will ensure that only authenticated users can access your protected API routes while ensuring they cannot access data that is not theirs.

### Getting started

1. Make sure you have a recent version of [Node.js](https://nodejs.org/en/download/) installed on your computer. I am using Node v12.16, but anything above 12 will be fine.
2. Ensure you have git and github set up on your computer. If you do not, please follow this guide: https://help.github.com/en/github/getting-started-with-github.
3. Fork this repository and clone it locally. 
4. In your terminal, from inside this project directory, run `npm install` to install the project dependencies.
5. Download and install [MongoDB](https://www.mongodb.com/try/download/community). This project uses the default MongoDB configuration. If you run Mongo in a non-standard way you may need to update the configuration in `index.js` to match. If you have issues, reference the [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html).
6. Run `npm start` to start your local server. You should see a logged statement telling you `Server is listening on http://localhost:5000`.
7. Download [Postman](https://www.postman.com/) or an API client of your choice. Browse the various endpoints contained in this project. Practice calling all of them and getting 200 HTTP responses.
8. Run the unit tests of this project: `npm test`. Your test output should end in something like this:
```
Test Suites: 1 failed, 1 passed, 2 total
Tests:       8 failed, 52 passed, 60 total
```

### Your Task

We are working on an API for notes. A user should be able to create and access notes, but they should only be able to access their own notes. In order to do that, we will need to identify them using authentication. 

We will need routes for a user to sign up, login, log out, and change password. This will use a `User` model. Then we will need routes for notes that only logged in users can access, which will use a `Note` model. The `User` and `Note` models are provided, but you may want to modify them. You will also want to create a new `Token` model.

There is a complete set of tests already provided for these two sets of routes. However, there are no routes defined. You will need to write the following routes:

- Login
  - Signup: `POST /login/signup`
  - Login: `POST /login`
  - Logout: `POST /login/logout`
  - Change Password `POST /login/password`
- Notes (requires authentication)
  - Create: `POST /notes`
  - Get all of my notes: `GET /notes`
  - Get a single note: `GET /notes/:id`

Tests for these routes are in place but mostly failing. Your task is to write the additional route, DAO, and model code that will get these tests passing. Doing so will require the use of the [bcrypt](https://www.npmjs.com/package/bcrypt) library for securely storing passwords. Additionally, you will need to generate random tokens, and I suggest using the [uuid](https://www.npmjs.com/package/uuid) library. Please use middleware to enforce authentication on the `/notes` routes.

Once all the provided tests are passing then you should know your code is correct. You should not make any changes to the test files.


### Grading

Component | Points
--------- | --------
All tests, as originally given, are passing | 60
Passwords are stored and managed securely | 20
Clear, organized project structure | 20

### Submission

- Create a pull request (PR) from your repository to the master branch of this repository. Make your name the title of the PR. 
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.