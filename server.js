var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.post('/scrape', function (req, res) {
  let url = 'https://www.npr.org/sections/national/';
  if (req.query.url === undefined || req.query.url == '') {
    return res.status(400).json({ status: false, message: "URL is madatory", data: [] });
  }else{
    url = req.query.url;
    request(url, function (error, response, html) {
      let data = [];
      if (!error) {
        var $ = cheerio.load(html);
        let post = {
          title: $('h1').text(),
          canonical: $('link[rel="canonical"]').attr('href'),
          description: $('meta[name="description"]').attr('content'),
          // Get OG Values
          og_title: $('meta[property="og:title"]').attr('content'),
          og_url: $('meta[property="og:url"]').attr('content'),
          og_img: $('meta[property="og:image"]').attr('content'),
          og_type: $('meta[property="og:type"]').attr('content'),
          // Get Twitter Values
          twitter_site: $('meta[name="twitter:site"]').attr('content'),
          twitter_domain: $('meta[name="twitter:domain"]').attr('content'),
          twitter_img_src: $('meta[name="twitter:image:src"]').attr('content'),
          // Get Facebook Values
          fb_appid: $('meta[property="fb:app_id"]').attr('content'),
          fb_pages: $('meta[property="fb:pages"]').attr('content'),
        }
        data.push(post)
        fs.writeFile("log.json", JSON.stringify(data), function (err) {
          if (err) return console.error(err);
          console.log("Scrap Completed");
        });

        return res.status(200).json({ status: true, data:data, message:"Successful" });
      }
    });
  }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
