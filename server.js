var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./models');

var PORT = 3000;
var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI);

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/scrape', function(req, res) {

  axios.get('https://www.cnet.com/es/').then(function(response) {

    var $ = cheerio.load(response.data);

    $('.latestScrollItems .item .col-5 .col-4 ').each(function(i, element) {
      var result = {};
      
      result.title = $(this).children('h3').text();
      result.summary = $(this).children('p').text();
      result.articleURL = 'https://cnet.com' + $(this).children('h3').children('a').attr('href');

      //console.log(result.title);

      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        }).catch(function (err) {
          console.log(err);
        });
    });

    db.Article.find({})
      .then(function(dbArticle) {
        res.render('index', { articles: dbArticle });
      })
      .catch(function(err) {
        res.json(err);
      });
  });
});

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
