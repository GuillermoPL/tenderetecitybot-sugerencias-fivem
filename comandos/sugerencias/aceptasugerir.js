const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("megadb");
const author = new db.crearDB("autor")
const sugerencia = new db.crearDB("sugerencia")
const canalsugerencias = new db.crearDB("canalsugerencia")
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "valorarsugerencia",
  alias: [],

async execute (client, message, args){

  const embednoperms = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`❌ No puedes usar este comando\n\nNecesitas permisos de *ADMINISTRADOR*`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send(embednoperms)

  const accionvalida = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Debes escribir una opcion valida!\n\n(aceptar / rechazar)`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  const accionopcionvalida = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Eso no es una opcion valida!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  const accion = args[0]
  if(!accion) return message.channel.send(accionvalida)

  const idsugnovalida = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Debes escribir la ID del mensaje de la sugerencia!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  const mensaje = args[1]
  if(!mensaje) return message.channel.send(idsugnovalida)

  const embednocanalsug = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`Este servidor no tiene canal de sugerencias usa !canalsugerencia`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  if(!canalsugerencias.tiene(message.guild.id)) return message.channel.send(embednocanalsug)
  const canal = await canalsugerencias.obtener(message.guild.id)

  const embednoencuentrolaid = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`No he encontrado la sugerencia!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  const sugerencias = await client.channels.cache.get(canal).messages.fetch(mensaje)
  if(!sugerencias) return message.channel.send(embednoencuentrolaid)

  const embednoencuentrolapersona = new Discord.MessageEmbed()

  .setTitle("Oops.")
  .setDescription(`No he encontrado la persona!`)
  .setColor("#FF0000")
  .setImage("https://i.imgur.com/mUA85tz.png")

  const persona = await author.obtener(mensaje)
  const usuario = client.users.resolve(persona)
  if(!usuario) return message.channel.send(embednoencuentrolapersona)

  const contenido = await sugerencia.obtener(mensaje)

  if(accion.toLowerCase() === 'aceptar'){
    const embed = new Discord.MessageEmbed()
    .setTitle("Sugerencia aceptada")
    .setDescription(`**${contenido}**`)
    .setFooter(`Aprobada por ${message.author.tag}`)
    .setColor("#2EFF00")
    sugerencias.edit(embed)
    sugerencias.reactions.removeAll()
    message.channel.send("La sugerencia ha sido aceptada")
    return;
  }

  if(accion.toLowerCase() === 'rechazar'){
   var motivo = args.slice(2).join("  ")
   if(!motivo){
     motivo = 'No especificado'
   }
   const embed = new Discord.MessageEmbed()
  .setTitle("Sugerencia rechazada")
  .setDescription(`**${contenido}**\n\nMotivo: ${motivo}`)
  .setFooter(`Rechazada por ${message.author.tag}`)
  .setColor("#FF0000")
   sugerencias.edit(embed)
   sugerencias.reactions.removeAll()
   message.channel.send("La sugerencia ha sido rechazada")
  }


 }

}