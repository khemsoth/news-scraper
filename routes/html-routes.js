const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models')

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/saved', function(req, res) {
  res.render('saved');
});

router.get('/scrape', function(req, res) {
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
      res.end();
    })
  })
  });

router.get('*', function(req, res) {
  res.render('index');
})

module.exports = router;