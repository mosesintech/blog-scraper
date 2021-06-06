const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const data = require('./urls.json');

async function createPost(metaData, postContent) {
  const post = await fs.writeFile(`./panagia/${metaData}`, postContent, function (err) {
    if (err) {
      console.log(`Error: ${metaData}:`, err);
    }
    console.log('File is created successfully: ', metaData);
  });
  return post;
}

async function scrape(url) {
  const post = await requestPromise(url)
    .then(function(html){
        const $ = cheerio.load(html);
        const title = $('article > header > h1').text();
        const metaData = $('article > header > div > a').text() + '.md';
        const content = $('article > div').text();
        const postContent = `${title}\r\n${content}`
        return createPost(metaData, postContent);
    })
    .catch(function(err){
        console.log(`Error: ${url}:`, err)
        return scrape(url);
    });
  return post;
}

async function scrapeSite() {
  const posts = await data.urls.map(async (url) => {
    const post = await scrape(url);
    return post;
  });
  return posts;
}

module.exports = {
  scrapeSite,
}