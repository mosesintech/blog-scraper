const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://panagiaquicktohear.com/2021/05/25/hieromonk-ioan-of-sarov/';

requestPromise(url)
  .then(function(html){
      const $ = cheerio.load(html);
      // title
      console.log($('article > header > h1') .text());
      // post data
      console.log($('article > header > div > a').text());
      // post text
      console.log($('article > div > p').text());
  })
  .catch(function(err){
      //handle error
      console.log('error', err)
  });