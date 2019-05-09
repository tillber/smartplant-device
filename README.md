# smartplant-device




System Documentation
Device / Dummy Data

Group 12
07/05/2019



Team Members
Daria Galal*
Felix Ståhl
Anton Heurlin
Martin Tillberg


*Responsible developer

Contents
 Contents	2
1 Introduction	4
2 Setup IBM Cloud Platform & Device	4
3 Setup Device Software	5
4 Dummy Data Algorithms	7

Revision History
Version
Date
Name
Description
1
07/05/19
Daria Galal
Initial Document





1 Introduction
Prerequisites: 
NodeJS (Version 11.5.0 or later)
Node Package Manager (npm)
IBM Cloud Account
Eclipse or similar text editor
Internet Connection
System Terminal.
SmartPlant is an application with the purpose of easing maintenance of plants and possibly reducing the amount of resources needed for a plant. SmartPlant consists of a device simulating live values from the plant and an internet application, integrated with a database and weather API, where the values are evaluated against user templates and provides general monitoring.
The device is not a an external hardware but a software simulating a hardware with sensor that generates changes in pH, soil humidity and temperature. The device software is connected through IBM’s cloud services for easier data access and monitoring.
This documentation goes through each step for setting up a working device and its algorithms. This document will NOT go through IBM documentations or any tutorial on Java Script, NodeJS and Node Package Manager. However, links will be provided for each of these for further readings if needed.   
2 Setup IBM Cloud Platform & Device
The device is linked to the IBM Watson IoT Platform where the device can be monitored and accessible. The first step is to provision resources for the IoT platform.
When logged in, navigate to the IBM Cloud Dashboard and create a resource.
Search and choose Internet Of Things Platform and fill in the credentials as you see fit.
Navigate to Device Dashboard and add a device.
IMPORTANT! It is strongly recommended to take note of the device credentials before completing this step as they will be used later (Device Type, Device ID and Access/Authentication Token).

3 Setup Device Software
IBM Device Documentation
Device Software Repository
Download or clone the repository.
Open app.js with your text editor and edit the variables ORG_ID and ACCESS_TOKEN according to your own device credentials in the previous section.

Open device.js with your text editor and edit the domain, type and id  inside device_config according to your own device credentials.

Start your system terminal in same folder where the repository is located and type  npm install. This installs all the required node dependencies for the device such as ibmiotf.
In the system terminal, navigate to the same folder where the file app.js is, type node app.js
Your device should be up and running. To check if the device is generating data, log back in to your IBM Cloud account and navigate to your device. Under the tab “Recent Events”, there should be information on the data your device is generating out. 
3.1 Potential problems
“Cannot find module ‘/..’”: Happens after running node app.js. Remove the folder node_modules and reinstall modules with first command npm install.
The free version of IBM Cloud limits the amount of data to be uploaded from the device. You will no longer be able to send data up to the cloud once the limit has been reached. The limit resets each month.


4 Dummy Data Algorithms
The device is a simulation of hardware with sensor. Each sensor (humidity, pH and temperature) is described as a mathematical function over time. The functions provide a logic where the values from the three sensors are affected by each other. In case of NULL as parameter, the respective variable is set to NULL which is then taken care of at the SmartPlant application.
4.1 Mathematical Functions
The functions representing the device sensors are a mix of three types of functions. Linear-, square- and trigonometric functions. Each type has been modified to represent realistic curves and outputs for a 24-hour period.
These functions are free to be changed and modified as it fits.
4.2 Humidity

Humidity function HumCurve short for Humidity Curve, consists of three different graphs, which one is used is dependent on the value of the parameter. The parameter represents hours as integers. The functions can only generate values between a minimum of 22 and a maximum of 86.
For “hours” between and including 0 and 7 (out of 24 hours in a day) the following function is used.


For hours between 7 and including 8.


For hours between 8 and including 24.


If the parameter exceeds the value of 24 or is under the value 0, the following function is used to avoid errors and still provide realistic data.
 
























A visual representation of the four graphs that represents humidity. The dotted line is the function h0 .
4.3 PH

The pH-function is straight forward and consists of one function with low output variety as pH-value in soil varies very slowly under normal circumstances, especially for a house plant. The maximum and minimum value for the pH-function are 7.8 and 5.6 respectively.
 













4.4 Temperature

The temperature function consists of one main trigonometric function with a maximum and minimum value of 26°C and 6°C respectively.



A secondary function, just like humidity, exists for the sole purpose of parameter values higher than 24 or lower than 0.











Visual representation of the graphs, t1 as primary and t0 as secondary (dotted).









4.5 The Interplay
The interplay between the three sensors are affected by each others values.
4.5.1 Humidity, Temperature & pH
Hours between 0 and 7 (value of x-axis), the humidity lowers at a linear rate h1 until the temperature is just below 25°C. At this point the humidity drastically rises to a value of 86, simulating watering, and pH rises as the soil neutralize by the watering As temperature rises and reaches peak value, the humidity lowers as the soil supposedly dries out which affects the pH as the value lowers and indicates a more sour soil. Similar interplay exists for both of the sensors secondary functions, dotted graphs.

