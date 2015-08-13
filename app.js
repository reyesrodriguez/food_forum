var express = require('express');
var app = express();
var ejs = require('ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('food.db');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.use(urlencodedBodyParser);

app.use(methodOverride('_method'));

app.set('view_engine', 'ejs');

app.get('/', function (req,res){
	res.redirect('/patron')
});
// where user inserts input 
app.get('/patron', function (req,res){
	res.render('index.ejs')
});

app.get('/patron/:id', function(req,res){
	db.get('SELECT * FROM users WHERE id= ?', parseInt(req.params.id), function(err, rows){
		if(err){
			throw err;
		}else{
			res.render('show.ejs',{rows:rows})
		}
	});
});

// app.get('/patron/:id/', function(req,res){
// 	db.get('SELECT * FROM users WHERE id= ?', parseInt(req.params.id), function(err, rows){
// 		if(err){
// 			throw err;
// 		}else{
// 			res.render('show.ejs',{rows:rows})
// 		}
// 	});
// });

//takes info from the index page and redirects to patron/:id
app.post('/patron', function (req,res){
	db.run('INSERT INTO users (name, image, email) VALUES (?,?,?)', req.body.name, req.body.image, req.body.email, function(err){
		if (err){
			throw err;
		}else{
			res.redirect('/patron/' + this.lastID)
		}
	});
});

app.put('/patron/:id', function (req,res){
	db.run('UPDATE users SET name=?, image=?, email=? WHERE id=?', req.body.name, req.body.image, req.body.email, req.params.id, function(err, rows){
		console.log(rows)
	if(err){
		throw err
	}else {
		res.redirect('/patron')
	}
	});
});

app.delete('/patron/:id', function (req, res){
	db.run("DELETE FROM users WHERE id=?", parseInt(req.params.id), function(err, rows){
	if(err){
		throw err
	}else{
		res.redirect('/patron')
	}
})
});


app.get('/list', function (req,res){
	db.all('SELECT * FROM business', function(err, rows) {
		if (err){
			throw err;
		} else{
			res.render('list.ejs', {rows: rows})
		}
	});
});

app.get('/business', function (req,res){
	res.render('index_business.ejs')
});

app.get('/business/comments/:id', function (req,res){
	db.get('SELECT * FROM business WHERE id=?', parseInt(req.params.id), function(err, rows){
		if (err){
			throw err;
		}else{
			res.render('show_comments.ejs', {rows:rows})
		}

		
	});
});
//where comments get written posted....then go back to same page show_comments!!!!
app.post('/business/comments', function (req,res){
	db.run('INSERT INTO comments (comment) VALUES (?,?)', req.body.comment, function(err){
		if(err){
			throw err;
		}else{
			res.redirect('/business/comments/:id')
		}
	});
});


app.get('/business/:id', function (req,res){
	db.get('SELECT * FROM business WHERE id=?', parseInt(req.params.id), function(err, rows){
		if (err){
			throw err;
		}else{
			res.render('show_business.ejs', {rows:rows})
		}

	});
});


app.post('/business', function(req,res){
	db.run('INSERT INTO business (name, image, address, type, website, twitter) VALUES (?,?,?,?,?,?)', req.body.name, req.body.image, req.body.address, req.body.type, req.body.website, req.body.twitter, function(err){
		if(err){
			throw err;
		}else{
			res.redirect('/business/' + this.lastID)
		}
	});
});

app.listen(3000, function(req,res){
	console.log('it listens!!')
});