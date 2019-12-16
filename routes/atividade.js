var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/atividade');

router.get('/', function(req, res, next) {
  res.send('respondendo a solicitação.');
});
router.get('/register', function(req, res, next) {
  res.render('register',{title:'Registrar'});
});


router.post('/register',function(req, res, next) {
  var description = req.body.description;
  var responsavel = req.body.responsavel;
  var status = req.body.status;
  var deadline = req.body.deadline;

  req.checkBody('description','Descrição é obrigatória.').notEmpty();
  req.checkBody('responsavel','Responsável é obrigatório.').notEmpty();
  req.checkBody('status','Status é obrigatório').notEmpty();
  req.checkBody('deadline','DeadLine é obrigatório.').notEmpty();

  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{
  	var novaAtividade = new Atividade({
      description: description,
      responsavel: responsavel,
      status: status,
      deadline: deadline
    });

    Atividade.createUser(novaAtividade, function(err, atividade){
      if(err) throw err;
      console.log(atividade);
    });

    req.flash('success', 'Atividade cadastrada com sucesso!!');

    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Você não está logado!!!');
  res.redirect('/users/login');
});

module.exports = router;
