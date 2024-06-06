# Guide

## Prerequisites

* Node v16.18.1 or higher
* NPM 8.19.2 or higher

## Local Setup

1. Run the following command in the root of the project directory
    ```
    npm install
    ```
    If the above command results to error, run this command instead
    ```
    npm install --legacy-peer-deps
    ```
2. To locally build and watch for changes in the ReactJS app
    ```
    npm run watch-client
    ```
3. Start the backend server and watch for file changes as well
    ```
    npm run dev-server
    ```
4. Open this link in the browser to view the application: [http://localhost:3000](http://localhost:3000)

## Deploy to production

1. Build the server code, output files will be created in the `_./build/server/src_` directory
    ```
    npm run build-server
    ```
2. Build the ReactJS app, output files will be created in the `_./build/dist_` directory
    ```
    npm run build-client
    ```
3. Run the server and ReactJS application
    ```
    npm start
    ```
4. Open this link in the browser to view the application: [http://localhost:3000](http://localhost:3000)
