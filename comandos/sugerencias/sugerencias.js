const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("megadb");
const author = new db.crearDB("autor")
const sugerencia = new db.crearDB("sugerencia")
const canalsugerencias = new db.crearDB("canalsugerencia")
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "suggest",
  aliases: ["sugerir", "sugerencia"],

async execute (client, message, args){

  const embednocanalsug = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Este servidor no tiene canal de sugerencias usa !canalsugerencia`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!canalsugerencias.tiene(message.guild.id)) return message.channel.send(embednocanalsug).then(msg => {
    msg.delete({ timeout: 5000 })
  })
  .catch(console.error);

  const embedescribesug = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Debes escribir una sugerencia **${message.author}**`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!args.join("  ")) return message.channel.send(embedescribesug).then(msg => {
    msg.delete({ timeout: 5000 })
  })
  .catch(console.error);

  message.delete()

  const usuario = message.author;

  const embed = new Discord.MessageEmbed()

  .setTitle("Nueva Sugerencia")
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
  .setDescription(`**Descripción:** ${args.join("  ")}`)
  .setFooter("Reacciona para votar")
  .setTimestamp()
  .setColor("BLUE")

  const canal = await canalsugerencias.obtener(message.guild.id)

  client.channels.cache.get(canal).send(embed).then(msg =>{
    msg.react("848684942208401517")
    msg.react("844186029698973767")
    author.establecer(msg.id, usuario.id)
    sugerencia.establecer(msg.id, args.join("  "))
  })

 }

}