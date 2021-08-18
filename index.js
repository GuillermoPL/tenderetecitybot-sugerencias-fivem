const Discord = require('discord.js');
const { Client, Intents, Collection, Guild, MessageEmbed } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();
const config = require('./config.json');
let PlayerCount = require('./server/players');


const fs = require('fs')

let prefix = '!' //Esto define un prefix

///////////////HANDLER////////////////////////

client.command = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
const musicaCommandFiles = fs.readdirSync('./comandos/musica').filter(file => file.endsWith('.js'));
const diversosCommandFiles = fs.readdirSync('./comandos/diversos').filter(file => file.endsWith('.js'));
const sugerenciasCommandFiles = fs.readdirSync('./comandos/sugerencias').filter(file => file.endsWith('.js'));
const pruebasCommandFiles = fs.readdirSync('./comandos/pruebas').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./comandos/${file}`);
    client.command.set(command.name, command);
}

for (const file of musicaCommandFiles){
    const command = require(`./comandos/musica/${file}`);
    client.command.set(command.name, command);
}

for (const file of diversosCommandFiles){
    const command = require(`./comandos/diversos/${file}`);
    client.command.set(command.name, command);
}

for (const file of sugerenciasCommandFiles){
    const command = require(`./comandos/sugerencias/${file}`);
    client.command.set(command.name, command);
}

for (const file of pruebasCommandFiles){
    const command = require(`./comandos/pruebas/${file}`);
    client.command.set(command.name, command);
}

///////////////HANDLER////////////////////////


///////////////////PRESENCE///////////////////

client.on('ready', () => {

  setInterval(() => {
    const statuses = [
      `!help`,
      `tenderetecity.es`,
      `discord.gg/tenderete`,
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/tenderetecity"
    });
}, 4000);

console.log('Tenderete Bot esta listo!')

});

///////////////////PRESENCE///////////////////

client.on('message', (message) => {
  if(message.content.startsWith('F')) {
    message.channel.send(`<a:F_press:876844180285030530>`);
  }

if (!message.content.startsWith(prefix)) return
if (message.author.bot) return;

let usuario = message.mentions.members.first() || message.member; //definimos usuario
const args = message.content.slice(prefix.length).trim().split(/ +/g); //defenimos los argumentos
const command = args.shift().toLowerCase(); //definimos el comando

///////////////HANDLER////////////////////////

let cmd = client.command.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
  cmd.execute(client, message, args)
}
if(!cmd){
//  const embed = new Discord.MessageEmbed()
//
//  .setTitle("Oops.")
//  .setDescription(`❌ No existe el comando **${command}**.\n\nUsa !ayuda/help`)
//  .setColor("#FF0000")
//  .setImage("https://i.imgur.com/mUA85tz.png")

//  message.channel.send(embed)
}

});

//////////////DISTUBE///////////////

const Distube = require("distube")
client.distube = new Distube(client, {
  emitNewSongonly: false, 
  searchSongs: false,
  leaveOnStop: true,
  leaveOnFinish: true, 
  leaveOnEmpty: true
});

client.distube.on("addList", (message, queue, playList) => {

  const embedaddlist = new Discord.MessageEmbed()

  .setTitle("Musica")
  .setDescription(`Playlist: **${playlist.name}**`)
  .setColor("RANDOM")

  message.channel.send(embedaddlist)
})

client.distube.on("addSong", (message, queue, song) => {

  const embedaddsong = new Discord.MessageEmbed()

  .setTitle("Musica")
  .setTitle(`Cancion añadida: **${song.name}**const Database = require("@replit/database") - **${song.formattedDuration}**`)
  .setColor("RANDOM")

  message.channel.send(embedaddsong)
})

client.distube.on("playSong", (message, queue, playsong) => {

  const embedplaysong = new Discord.MessageEmbed()

  .setTitle("Muscia")
  .setDescription(`Reproduciendo ahora: **${playsong.name}** - **${playsong.formattedDuration}**`)
  .setColor("RANDOM")


  message.channel.send(embedplaysong)
})

client.distube.on("playList", (message, queue, playlist) => {

  const embedplaylist = new Discord.MessageEmbed()

  .setTitle("Musica")
  .setDescription(`Reproducciendo playlist: **${playlist.name}**`)
  .setColor("RANDOM")

  message.channel.send(embedplaylist)

})

client.distube.on("error", (message, error) => {
  console.log(error)
})

//////////////DISTUBE///////////////

client.login(process.env.TOKEN)