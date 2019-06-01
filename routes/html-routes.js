const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/scrape', function(req, res) {
  axios.get('https://us.motorsport.com/').then(function(response) {
    var $ = cheerio.load(response.data);
    $('h3.ms-item_title').each(function(i, element) {
      var result = [];
      var title = $(element).text().trim();
      var link = $(element).children().attr('href');
      result.push = ({
        title: title,
        link: link
      })
      console.log(result);
      res.end();
    })
  })
  });

router.get('*', function(req, res) {
  res.render('index');
})

module.exports = router;