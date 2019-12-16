var express = require('express');
var router = express.Router();

//console.log('Log 1 dentro do index.js');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

router.get('/register', function( req, res, next){
  res.render('index', {title:'Atividade'})
})
//console.log('Log 2 dentro do index.js');

router.post('/register' ,function(req, res, next) {
  var description = req.body.description;
  var responsavel = req.body.responsavel;
  var status = req.body.status;
  var deadline = req.body.deadline;

  // Form Validator
  req.checkBody('description','Nome é obrigatório.').notEmpty();
  req.checkBody('responsavel','Responsável é obrigatório.').notEmpty();
  req.checkBody('status','status é obrigatório').notEmpty();
  req.checkBody('deadline','DeadLine é obrigatório.').notEmpty();

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('index', {
  		errors: errors
  	});
  } else{
  	var newActivity = new Activity({
      description: description,
      responsavel: responsavel,
      status: status,
      deadline: deadline
    });

    Activity.createUser(newActivity, function(err, user){
      if(err) throw err;
      //console.log(user);
    });

    req.flash('success', 'Atividade cadastrada com sucesso!!');

    res.location('/');
    res.redirect('/');
  }
});

function ensureAuthenticated(req, res, next){
	//console.log('Dentro da function ensureAuthenticated');
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
