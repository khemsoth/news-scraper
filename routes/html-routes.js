const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/saved', function(req, res) {
  var result = {};
  
  db.Saved.create(result)
  .then(function(saved) {
    console.log(saved);
  })
  res.render('saved');
});


router.get('/scrape', function(req, res) {
  db.News.remove({});
  axios.get('https://us.motorsport.com/').then(function(response) {
    var $ = cheerio.load(response.data);
    $('h3.ms-item_title').each(function(i, element) {
      var result = {};
      result.title =  $(this).text().trim();
      result.link = $(this).children().attr('href');      
      db.News.create(result)
      .then(function(news) {
        console.log(news);
      })
      }) 
      res.redirect('articles')
   
    })
  })
  router.get('/articles', function(req, res) {
    db.News.find({}).then(function(data) {
      var stuff = {
        articles: []
      }
      for(var i = 0; i < 20; i++) {
        var newsTitle = data[i].title;
        var newsLink = data[i].link;
        var obj = {
         title: newsTitle,
         link: newsLink
        }
        stuff.articles.push(obj);     
    }
      res.render('articles', stuff)
  })
    })
  

router.get('*', function(req, res) {
  res.render('index');
})

module.exports = router;