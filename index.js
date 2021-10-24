const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var http = require('https');
const client = new Discord.Client({ws: { intents: new Discord.Intents(Discord.Intents.ALL)}});

client.once("ready", () => {
    console.log(`${client.user.tag} listo !!!`);
});

client.on("messageDelete", message => {
    if (message.attachments.size !== 0) {
        texto = message.attachments.first().name;
        nombre = uuidv4();
        if(texto.includes("png")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("jpg")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("jpeg")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("gif")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".gif" , embedx2(message,exampleEmbed,nombre));
        }
        if(texto.includes("mov")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".mov" ,mensaje1(message));
        }
        if(texto.includes("mp4")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, "/var/www/html/log_imagenes/"+nombre+".mp4" , mensaje2(message));
        }
    }
});

var error = function() {
    console.log("error");
}
var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb);
      });
    }).on('error', function(err) {
      fs.unlink(dest);
      if (cb) cb(err.message);
    });
  };

  var embedx = function(msg,embs,nombres) {
    embs.setColor('#0099ff')
    .setURL(msg.author.avatarURL)
    .setAuthor(msg.member.user.tag, msg.author.avatarURL, msg.author.avatarURL)
    .setThumbnail(msg.author.avatarURL)
    .addFields(
        { name: 'Canal', value: msg.channel },
    )
        .setImage('https://memesproxx.com/log_imagenes/' + nombres+".png")
        .setTimestamp()
        .setFooter(msg.author.id);
        client.channels.cache.get(`898789664402575380`).send(embs);
        client.channels.cache.get(`898769926884581474`).send(embs);
        var urlname = 'https://memesproxx.com/log_imagenes/' + nombres+".png";
        var urlcode = `\`\`\`${urlname}\`\`\``;
        client.channels.cache.get(`898789664402575380`).send(urlcode);
        client.channels.cache.get(`898769926884581474`).send(urlcode);
        return;
  }

  var embedx2 = function(msg,embs,nombres) {
    embs.setColor('#0099ff')
    .setURL(msg.author.avatarURL)
    .setAuthor(msg.member.user.tag, msg.author.avatarURL, msg.author.avatarURL)
    .setThumbnail(msg.author.avatarURL)
    .addFields(
        { name: 'Canal', value: msg.channel },
    )
        .setImage('https://memesproxx.com/log_imagenes/' + nombres+".gif")
        .setTimestamp()
        .setFooter(msg.author.id);
        client.channels.cache.get(`898789664402575380`).send(embs);
        client.channels.cache.get(`898769926884581474`).send(embs);
        var urlname = 'https://memesproxx.com/log_imagenes/' + nombres+".gif";
        var urlcode = `\`\`\`${urlname}\`\`\``;
        client.channels.cache.get(`898789664402575380`).send(urlcode);
        client.channels.cache.get(`898769926884581474`).send(urlcode);
        return;
  }
  var mensaje1 = function(msg) {
    client.channels.cache
    .get(`898769926884581474`)
    .send('https://memesproxx.com/log_imagenes/' + nombre+".mov" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
    client.channels.cache
    .get(`898789664402575380`)
    .send('https://memesproxx.com/log_imagenes/' + nombre+".mov" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
} 
var mensaje2 = function(msg) {
    client.channels.cache
    .get(`898789664402575380`)
    .send('https://memesproxx.com/log_imagenes/' + nombre+".mp4" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
    client.channels.cache
    .get(`898769926884581474`)
    .send('https://memesproxx.com/log_imagenes/' + nombre+".mp4" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
}


client.login('token');