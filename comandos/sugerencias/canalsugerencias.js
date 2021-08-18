const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("megadb")
const canalsugerencia = new db.crearDB("canalsugerencia")
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "canalsugerencia",
  alias: [],

execute (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")

  const embedperms = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`❌ No puedes usar este comando\n\nNecessitas permisos *ADMINISTRADOR*`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!perms) return message.channel.send(embedperms)

  const canal = message.mentions.channels.first()

  const embedcanalnomencionado = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`❌ Debes decir un canal!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!canal) return message.channel.send(embedcanalnomencionado)
  const canalservidor = message.guild.channels.resolve(canal.id)

  const embedcanalenserver = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`El canal debe de estar un servidor!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!canalservidor) return message.channel.send(embedcanalenserver)

  canalsugerencia.establecer(message.guild.id, canal.id)

  const embedcanalpuesto = new Discord.MessageEmbed()

  .setTitle("Hecho.")
  .setDescription(`El canal se ha establecido a **${canalservidor.name}** exitosamente ✅`)
  .setColor("#12FF00")
  .setImage("https://i.imgur.com/mUA85tz.png")

  message.channel.send(embedcanalpuesto)

 }

}