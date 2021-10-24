const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var http = require('https');
const client = new Discord.Client({ws: { intents: new Discord.Intents(Discord.Intents.ALL)}});

client.once("ready", () => {
    console.log(`${client.user.tag} listo !!!`);
});

var ubicacion = "/var/www/html/log_imagenes/"; //Location where deleted images and videos will be saved
var URL = "https://memesproxx.com/log_imagenes/"; //URL of your web server (can be IP address number)
var Channels = `898789664402575380`; //channel id where the deleted videos and images will arrive

client.on("messageDelete", message => {
    if (message.attachments.size !== 0) {
        texto = message.attachments.first().name;
        nombre = uuidv4();
        if(texto.includes("png")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("jpg")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("jpeg")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".png" , embedx(message,exampleEmbed,nombre));
        }
        if(texto.includes("gif")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".gif" , embedx2(message,exampleEmbed,nombre));
        }
        if(texto.includes("mov")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".mov" ,mensaje1(message));
        }
        if(texto.includes("mp4")) {
            const exampleEmbed = new MessageEmbed();
            download(message.attachments.first().url, ubicacion+nombre+".mp4" , mensaje2(message));
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
        .setImage(URL + nombres+".png")
        .setTimestamp()
        .setFooter(msg.author.id);
        client.channels.cache.get(Channels).send(embs);
        var urlname = URL + nombres+".png";
        var urlcode = `\`\`\`${urlname}\`\`\``;
        client.channels.cache.get(Channels).send(urlcode);
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
        .setImage(URL + nombres+".gif")
        .setTimestamp()
        .setFooter(msg.author.id);
        client.channels.cache.get(Channels).send(embs);
        var urlname = URL + nombres+".gif";
        var urlcode = `\`\`\`${urlname}\`\`\``;
        client.channels.cache.get(Channels).send(urlcode);
        return;
  }
  var mensaje1 = function(msg) {
    client.channels.cache
    .get(Channels)
    .send(URL + nombre+".mov" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
} 
var mensaje2 = function(msg) {
    client.channels.cache
    .get(Channels)
    .send(URL + nombre+".mp4" + " Enviado por: "+ msg.member.user.tag+ " En el canal: "+ "<#" + msg.channel.id + ">")
}


client.login('token');
