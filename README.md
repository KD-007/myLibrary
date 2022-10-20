Library-Management-System-on-React
myLibrary
myLibrary is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an teacher section where the teacher can do things like add books, delete books, increase the quantity of a book etc.


myLibrary consists of the following features:

Authentication
It uses JSON Web Token (JWT) for authentication.
Token is generated on user login
Token is perpetually verified to check the state of the user if logged in or not.
teacher User is pre-seeded into the application with administrative priviledges
student User
Users can register
Users can log in
Users can view all books in the library
Users can borrow books
Users can return books



teacher Users:-

teacher Users can log in
teacher Users can Add, Modify & Delete Books
teacher Users sort & categorize books

Technology
myLibrary makes use of a host of modern technologies. The core ones are:

REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about See this link.
ECMAScript 6: Also known as ES2015, this is a version of Javascript with next-generation features like arrow functions, generators, enhanced object literals, spread operators and more. The ES2015 is used in many areas of this project. See this link for details.
NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side. See this link for details.
ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs. see this link.
Context-API: The React Context API is a way for a React app to effectively produce global variables that can be passed around. This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on. Context is also touted as an easier, lighter approach to state management using Redux.
MongoDB:MongoDB is an open-source document database and leading NoSQL database. MongoDB is written in C++. This tutorial will give you great understanding on MongoDB concepts needed to create and deploy a highly scalable and performance-oriented database.



Requirements:-
MongoDB
Node.js



dependencies:
you can install them by 'npm i {name of dependency}' in your project folder through console :
example: npm i express

backend dependencies to be installed:
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.6.5",
    "nodemon": "^2.0.20"

frontend dependencies to be installed:
     "concurrently": "^7.4.0",
    "react-router-dom": "^6.4.2"

yow can start the app by running the following command in root folder :

    npm run both