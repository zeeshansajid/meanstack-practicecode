Final Project: MEAN Stack.
Functional Specification:

1.	Please use nodejs and angularjs to implement the following. 
2.	Write a node server (use express) to read the file system and then publish the APIs to read the:
a.	The folders Only [URL: http:// [domain]: [port]/carriers]
b.	The json Files in the folder  [URL: http:// [domain]: [port]/[specific Carrier] ].
c.	All JSON file contents in the carrier [http:// [domain]: [port]/[specific Carrier]/flightInfo] (optional)
3.	Develop the UI using angular JS which has three view templates to show the flight info. 
a.	Page 1 would have the carriers from step a in previous step.
b.	Page 2 would have the List of JSON file retrieved using the URL mentioned in the step b of the previous point.
c.	Page 3 would have the List of the JSON file contents retrieved using the URL mentioned in the step b of the previous point.
4.	Finally as an optional step we can also go and fetch the JSONS from the MongoDB but is not required.
5.	For the submission, please DONOT check in all the modules. Use bower.json to manage the UI dependencies and the package.json and just check in the code files along with the package.json and the bower.json.



How to run:
Please check configurations in the config/db.js file.
if your mongodb connection runs fine, then you may seed the database using the seedDB.js file it, will pick one file from each directory and will add the contents to the mongo database.
Also please run 

> npm install . 
> bower install

to install all dependencies and then run

> npm start

and the application will start at http://localhost:8000

Thank you.



