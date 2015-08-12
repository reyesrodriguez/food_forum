# food_forum

User Stories (2 Points)

This is a simple app to bring restaurants, coffee shops(products) and patrons together in a forum type application. 
The end goal is for users(patrons) to make a better decision on which product to choose based on their friends "word to mouth" approach.


1. **There will be two users on this app.**
	* The product (rest or coffeeshop) will be the topic.
	* The patron will be able to type "words" in a specific topic.
2. **Users can geolocate their position (dont know how this will work exactly).**
3. **Users can login with their Facebook account.**

##Wireframe

Inline-style: 
![alt text](Inline-style: 
![alt text](https://moqups.com/#!/edit/reyes/WsTebNAP "Wireframe") "Wireframe")

##Routes 
```
app.get('/business', function(req, res){
	####gets all business info and puts it in a Database

app.get('/patrons', function(req, res){
	####gets all patrons info and puts it in a Database

app.get('/business/:id', function(req, res){
	####shows business info and ideally the user can "word" here??

app.get('/patrons/:id', function(req, res){
	####shows business info and ideally the user can "word" here??

app.post('/business', function(req,res){
	####post new businesses on Database and render them to an ejs file

app.post('/patrons/', function(req,res){
	####post new patrons on Database and render them to an ejs file

add.put('/business/:id', function(req,res){
	####updates business data to database and render them to an ejs file

add.put('/patrons/:id', function(req,res){
	####updates patrons data to database and render them to an ejs file


add.delete('/business or patron/:id', function(req,res){
	####*dont know how this will work yet!!!?*
	#####delete businesses or patrons by id 

```

##Database Design (ERD/Data Model Diagrams) 

Its on a png file



