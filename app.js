var express = require('express');
var app = express();
var ejs = require('ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('food.db');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname+'/public'));

app.use(urlencodedBodyParser);

app.use(methodOverride('_method'));

app.set('view_engine', 'ejs');


/////////////////////////////////user routes //////////////////////////////////////
// where user inserts input 

app.get('/', function (req,res){
	res.redirect('/patron')
});

app.get('/patron', function (req,res){
	res.render('index.ejs')
});

app.get('/patron/:id', function(req,res){
	db.get('SELECT * FROM users WHERE id= ?', req.params.id, function(err, rows){
		if(err){
			throw err;
		}else{
			res.render('show.ejs',{rows:rows})
			console.log(rows)
		}
	});
});



//takes info from the index page and redirects to patron/:id
app.post('/patron', function (req,res){
	db.run('INSERT INTO users (username, name, email, image) VALUES (?,?,?,?)',req.body.username, req.body.name, req.body.email, req.body.image, function(err){
		if (err){
			throw err;
		}else{
			res.redirect('/patron/' + this.lastID)
		}
	});
});

app.put('/patron/:id', function (req,res){
		
		db.run('UPDATE users SET username=?, name=?, email=?, image=? WHERE id=?', req.body.username, req.body.name, req.body.email, req.body.image, req.params.id, function(err){
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

////////////////////////////routes for listing each user //////////////////////////////////
app.get('/users', function (req,res){
	db.all('SELECT * FROM users', function(err, rows) {
		if (err){
			throw err;
		} else{
			res.render('list_user.ejs', {rows: rows})
		}
	});
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

//////////////////////////////business routes////////////////////////////////////


app.get('/business', function (req,res){
	res.render('index_business.ejs')
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
	db.run('INSERT INTO business (name, address, type, image) VALUES (?,?,?,?)', req.body.name, req.body.address, req.body.type, req.body.image, function(err){
		if(err){
			throw err;
		}else{
			res.redirect('/business/' + this.lastID)
		}
	});
});

app.put('/business/:id', function (req,res){
		
		db.run('UPDATE business SET name=?, address=?, type=?, image=? WHERE id=?', req.body.name, req.body.address, req.body.type, req.body.image, req.params.id, function(err){
	if(err){
		throw err
	}else {
		res.redirect('/business')
	}
	
	});
});

app.delete('/business/:id', function (req, res){
	db.run("DELETE FROM business WHERE id=?", parseInt(req.params.id), function(err, rows){
	if(err){
		throw err
	}else{
		res.redirect('/list')
	}
})
});

////////////////////////////comment routes///////////////////////////////////


app.get('/business/comments/:id', function (req,res){

		db.get('SELECT * FROM business WHERE id=?', parseInt(req.params.id), function(err, business){
		if (err){
			throw err;
		}else{
			db.all('SELECT users.username FROM users', function(err, user){
				if(err){
					throw err;
				}else{
					db.all('SELECT users.image, comments.comment, comments.username, comments.created_at FROM users LEFT JOIN comments ON users.id=comments.users_id WHERE business_id=? ORDER BY comments.created_at DESC ',req.params.id, function(err, comments){
				if(err){
					throw err;
				}else{
					console.log(comments)
					res.render('show_comments.ejs', {user:user, business:business, comments:comments})
				}
			})
		}
});
}
});
});

	//db.all('SELECT users.username, comments.comment FROM users LEFT JOIN comments ON users.users_id=comments.users_id WHERE business_id=? ORDER BY users.created_at'


//where comments get written posted....then go back to same page show_comments!!!!
app.post('/business/comments/:id', function (req,res){
	db.run('INSERT INTO comments (comment, username, users_id, business_id) VALUES (?,?,?,?)', req.body.comment, req.body.username, req.params.id,req.params.id,function(err){
		if(err){
			throw err;
		}else{
		 res.redirect('/business/comments/' + req.params.id)
		}
	});
});

app.delete('/business/comments/:id', function (req, res){
	db.run("DELETE FROM comments ", function(err){
	if(err){
		throw err
	}else{
		res.redirect('/list')
	}
})
});







app.listen(3000, function(req,res){
	console.log('it listens!!')
});
