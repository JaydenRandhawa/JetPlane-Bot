require('dotenv').config();
const Discord = require('discord.js');
const { json } = require('express');
const app = require('express')();
var http = require('http').createServer(app);
const fs = require('fs');
const { getDefaultSettings } = require('http2');
const { stringify } = require('querystring');
const client = new Discord.Client();

const date = new Date();

client.on('ready', () => {
  console.log(`ready`);  
});

client.on('message', msg => {
  if (msg.channel.id === process.env.channel_id && msg.author.id === process.env.user_id) {
    console.log(msg.author.username, "/", msg.member.displayName, "said", msg.content);

    newStory = {
        date: date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear(),
        content: msg.content
    }

    fs.readFile('news.json', function (err, contents) {
        var prevCon = JSON.parse(contents);
        prevCon["stories"].push(JSON.stringify(newStory));

        var entry = JSON.stringify(prevCon);
    
        fs.writeFileSync("news.json", entry);
    })

    console.log(newStory);
  }
});

  app.get('/news.json', (req, res) => {
    res.sendFile(__dirname + '/news.json');
  });
client.login(process.env.bot_token);
http.listen(2000, () => {

});