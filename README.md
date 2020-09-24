# Weather-Journal App Project

- [Overview](#overview)
- [Instructions](#instructions)
- [Extras](#extras)
- [Running the Project](#running-the-project)
- [Weather Journal App](#weather-journal-app)

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.

## Running the Project
To run the project you need to download following packages:
- express
- cors
- body parser
```
npm install express
```
and then you can start the project by executing the following command in terminal:
```
node server.js
```
once server is up and running you should receive following response in the terminal:
```
server running
running on localhost: 8000
```
Now you can open the following link [localhost:8000](localhost:8000) in your web browser.

## Weather Journal App
App is designed to work for Swiss locations. To get the data follow these steps:
- Enter a valid Swiss postal code in the zip code input field (e.g. 8000 for Zürich)
- Describe your feelings in the text area below
- Click on the Generate button
- See the current date, temperature and your input in the field at the bottom