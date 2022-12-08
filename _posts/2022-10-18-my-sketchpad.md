---
layout: post
title:  "My Graph Theory Sketchpad"
date:   2022-10-18 00:00:00 -0000
author: "Logan Foster"
categories: Projects
permalink: /sketchpad
---

Implementation:
	Implementation of my Sketchpad began with downloading the Facebook React Application. I had to install all the newest installs of Node.js and the npm dependencies. The application creates a local server that runs natively on the user’s computer via the local port 3000, parsing website files through the local server to a client in the form of a webpage. In other words, it is a web app. You can access this server by going to a web browser, and simply typing in localhost:3000. This connects you to the client and loads the packets sent by the server. From there the application essentially functions like a website, allowing me to create specific aspects of the app from scratch using website languages such as JavaScript and CSS. Because of the interpreted form of the application, I did not need to create any data structures to store vertices and edges and could instead treat them as their own objects within the webpage. When adding objects to the webpage, each one would function as their own individual object allowing me to indicate a position and color without standardizing it for all variants of the same object on the page. I have prior experience with an extremely similar application I had developed prior, so further development with this application was simple. 

	Creating vertices, we’re relatively simple. Initially all I needed to do was display a dot on the screen of my application, but integrating it in with edges we’re a little more difficult. 

Getting Started: 
	Upon download of my Graph Theorist’s Sketchpad Zip file, there will be a few things that are necessary to download prior to start up. The application is based off the Facebook / Meta React Application framework and requires the latest install of Node.js and npx to run. You can see more about the installation process here: https://github.com/facebook/create-react-app#creating-an-app. When all is installed, you can run the following commands within my Graph Theorist’s Sketchpad folder to run my application: 

cd graph-theory-sketchpad
npm start

After a few seconds, this will start the app and run it via a local server on the port 3000. The application should open automatically in your default browser, however if it does not, you can go to any browser of your choice, and type in localhost:3000 into the search bar and my application will connect and begin running. 

Notice: 
I should specify, this application was developed using my 2018 MacBook Pro running macOS Monterey 12.6. I have not tested this application on a Windows environment. It should run properly but if it does not, then it may require further troubleshooting that I am not aware of. 

Bugs / Trouble I had: 
	Due to the application being a web app, one bug / feature is when reloading the page, all the objects that we’re on the page previously are reset and the application restarts to its default states. This is due to the application being a webpage. Every time the page is refreshed, it reconnects to the server and removes the old client. I view this as a positive feature however as it allows users of the application to easily delete and start over their work. 
