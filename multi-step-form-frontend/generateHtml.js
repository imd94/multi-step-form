const currentTask = process.env.npm_lifecycle_event;
import { config } from 'dotenv'
import React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import { StaticRouter as Router } from "react-router-dom/server";
import StaticPreloadContent from './app/components/StaticPreloadContent';

if(currentTask == 'generateBuild') {
  config({ path: './.env.prod' });
} else {
  config({ path: './.env.dev' });
}

function Shell() {
  return (
    <Router>
      <StaticPreloadContent />
    </Router>      
  )
}

const startOfHTML = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Frontend Mentor | Multi-step form</title>

        <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
    </head>

    <body>

        <div id="app">`

const endOfHTML = `</div>
    </body>
  </html>`

/* Use Node tools (outside the scope of this course) to setup a
  stream we can write to that saves to a file on our hard drive
*/
const fileName = "./app/index-template.html"
const writeStream = fs.createWriteStream(fileName)

// Add the start of our HTML template to the stream
writeStream.write(startOfHTML)

/*
  Add the actual React generated HTML to the stream.
  We can use ReactDomServer (you can see how we imported
  that at the very top of this file) to generate a string
  of HTML text that a Node stream can leverage.
*/
const myStream = ReactDOMServer.renderToPipeableStream(<Shell />, {
  onAllReady() {
    myStream.pipe(writeStream)
    // End the stream with the final bit of our HTML
    writeStream.end(endOfHTML)
  }
})