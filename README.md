SQLiteAPI - A RESTful API built using Express and Node.js using data from a SQLite database embedded in the application

## Before You Begin 
Before you begin I recommend you read about:
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.


The first thing you should do is install the Node.js dependencies. The application comes pre-bundled with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.

## Running Your Application
After the install process is over, you'll be able to run your application using:

```
$ npm start
```

Your application should run on the 8085 port so in your browser just go to [http://localhost:8085](http://localhost:8085)

## Testing Your Application
After the install process is over, you'll also be able to test your application using:

```
$ npm test
```
                            
Since this is an API, you wouldn't see anything on localhost:8085. So try using the APIs below:
http://localhost:8085/api/products
http://localhost:8085/api/products/reviews
http://localhost:8085/api/products/1

## API documentationm
Look out for the swagger.json attached with this project. It will tell you about the API endpoints. It's not thoroughly verbose but hey! this is just the first commit to the project.

