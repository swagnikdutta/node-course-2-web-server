const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; // run on heroku || run locally

var app = express();




hbs.registerPartials(__dirname + '/views/partials/');





app.set('view engine', 'hbs');





															// middlewares
app.use((req, res, next)=>{									//log file

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n' , (err)=>{

		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
})

// app.use((req, res, next)=>{									//blocker
// 	res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));				// middle ware telling path







hbs.registerHelper('getCurrentYear', ()=>{					// register helper function

	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{						// register helper function

	return text.toUpperCase();
})






app.get('/' , (req, res)=>{

	res.render('home.hbs',{

		pageTitle: 'Home page',
		welcomeNote: 'Welcome! Look around'
	});
});

app.get('/about', (req, res)=>{

	res.render('about.hbs',{

		pageTitle: 'About page'
	});
});

app.get('/projects', (req, res)=>{

	res.render('projects.hbs', {

		pageTitle: 'Projects'
	});
})






app.listen(port, ()=>{

	console.log(`server is running on port ${port}`);
});
