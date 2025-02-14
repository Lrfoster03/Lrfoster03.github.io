---
layout: post
title:  "Touch ID Macropad Mod"
date:   2025-02-13 00:00:00 -0000
author: "Logan Foster"
categories: Posts
permalink: /macropad
---

I'm excited to share something that I've been working on for a bit now that Mac people may enjoy, TouchID integration on a Macropad!

<img width="1109" title="My custom TouchID Sensor integrated into a Grid100 macropad" alt="My custom TouchID Sensor integrated into a Grid100 macropad" src="/assets/images/grid 100_files/GridWorkingAgain.jpg">

The idea first came about when I saw a Snazzy Labs video on YouTube where Quinn was able to harvest the mainboard and TouchID sensor into a small 3D printed piece that he connected up to his desk. 

<iframe width="1109" height="728" src="https://www.youtube.com/embed/hz9Ek6fxX48?si=Qzql1VS6_PrZv-vn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In this video, he showcases the process in which Ifixit was able to harvest the same components and they worked without needing to be connected to the full keyboard. At the time this was a really cool idea, but not something I could see much benefit from. After all, such a big clunky piece of tech on my desk would be a bit of an eyesore.

That was until I saw the Grid100 Macropad. 

<img width="1109" title="The Grid 100 Macropad" alt="The Grid 100 Macropad" src="/assets/images/grid 100_files/grid+100+IC+images+20230406X40.jpg">
*Photo source: [Grid 100 Official Website](https://www.gridishere.com/work/grid-100){:target="_blank"}*

The Grid100 is a 10% modular keypad keypad, which supports three different modules:

- MINI-PRESS: a 1x2U with a tiny keyboard with hot-swappable sockets

- CYCLE-ENCODER: a 2x2U encoder module similar to the CYCLE module for grid 650.

- CYCLE-JOYSTICK: 2x2U module with a joystick.

<img width="1109" title="The grid 100 Macropad" alt="The grid 100 Macropad" src="/assets/images/grid 100_files/grid+100+IC+images+20230406X5.jpg">
*Photo source: [Grid 100 Official Website](https://www.gridishere.com/work/grid-100){:target="_blank"}*

It easily allows you to swap out the modules into any configuration you want to fit your needs. 
<img width="1109" title="The grid 100 Macropad" alt="The grid 100 Macropad" src="/assets/images/grid 100_files/grid100+PCB+movement+small+960+copy.gif">
*Source: [Grid 100 Official Website](https://www.gridishere.com/work/grid-100){:target="_blank"}*

Immediately upon seeing this, my mind started racing with ideas. This was the perfect opportunity to see how I could integrate the sensor and components into the macropad. 

The Grid team was very thorough in the design of the Grid 100 as well. Measuring the Grid 100 Mini-Press modules, I was able to easily model a housing for the sensor that would fit within the same dimensions. After a few iterations, I was able to get a design that would fit the sensor and the mainboard.

<img width="1109" title="The different iterations of the top module" alt="The different iterations of the top module" src="/assets/images/grid 100_files/GridIterations.jpg">

After prototyping the top module, I had to find a way to mount the lightning connector to the case. I wanted to keep it as slim as possible as to not interrupt the design language of the Grid 100 too much. I took some design queue's from Snazzy Labs and designed a small 3D printed piece that would hold the lightning connector in place, and then using some long 3D printed pieces and a soldering iron, we we're able to create a plastic weld that would hold the connector in place. 

<img width="1109" title="The lightning connector mount" alt="The lightning connector mount" src="/assets/images/grid 100_files/LightningConnectorDirect.jpeg">

<img width="1109" title="The lightning connector mount" alt="The lightning connector mount" src="/assets/images/grid 100_files/LightningConnector.jpeg">

After printing the mount and the top module, I was able to connect the sensor to the mainboard and the lightning connector to the sensor. After a bit of testing, I was able to get the sensor to work with the macropad.

I'm really happy with how this project turned out. It was a fun challenge to see how I could integrate the sensor into the macropad. I'm excited to see what other projects I can come up with in the future!

<img width="1109" title="The final design in use" alt="The final design in use" src="/assets/images/grid 100_files/GridWorking.jpg">

If you too want to recreate this project, can download them them [here]({{ site.url }}/assets/downloads/Grid100 TouchID.zip). I hope you enjoy!