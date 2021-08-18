let config = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
let PlayerCount = require('../server/players');

module.exports = {
  name: "listajugadores",
  alias: ["playerlist"],

execute (client, message, args){
        PlayerCount.getPlayerCount().then((result) => {
            
            let list = result.data;
            var id = "";
            var players = "";
            var ping = ""
            for(var i = 0; i < list.length; i++){
                id += list[i].id+'\n';
                players += list[i].name+'\n';
                ping += list[i].ping+'\n';
               
            }
            const pListEmbed = new Discord.MessageEmbed()
                .setColor('#03fc41')
                .setTitle('Jugadores Conectados')
                .setDescription(`Jugadores en total: ${list.length}`)
                .setThumbnail(config.SERVER_LOGO)
//                .setImage("https://i.imgur.com/mUA85tz.png")
                .addFields(
                    { name: 'ID del jugador', value: id, inline: true  },
                    { name: 'Nombre del jugador', value: players, inline: true  },
                    { name: '📶', value: `${ping}`, inline: true },
                   
                )
                .setTimestamp(new Date())
                .setFooter(`Enviado Por: ${message.author.tag}`);
                message.channel.send(pListEmbed);
            
            
        })
        .catch(function(){
            const errpListEmbed = new Discord.MessageEmbed()
                .setColor('#fc0303')
                .setTitle('Jugadores Conectados')
                .setDescription(`Jugadores en total: 0`)
                .setThumbnail(config.SERVER_LOGO)
//                .setImage("https://i.imgur.com/mUA85tz.png")
                .addFields(
                    { name: 'ID del jugador', value: '0', inline: true  },
                    { name: 'Nombre del jugador', value: 'No hay jugadores', inline: true  },
                    { name: '📶', value: 'No hay jugadores', inline: true },
                   
                )
                .setTimestamp(new Date())
                .setFooter(`Enviado Por: ${message.author.tag}`);
                message.channel.send(errpListEmbed);
        })
    }, 
};