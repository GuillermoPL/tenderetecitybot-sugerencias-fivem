let config = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
let PlayerCount = require('../server/players');


module.exports = {
  name: "estado",
  aliases: ["server", "status"],

execute (client, message, args){

        PlayerCount.getPlayerCount().then((result) => {

            if(result.status === 200){
                const onlineEmbed = new Discord.MessageEmbed()
                .setColor('#03fc41')
                .setTitle(config.SERVER_NAME)
                .setDescription('IP: `Usa en el chat !ip`')
                .setThumbnail(config.SERVER_LOGO)
//                .setImage("https://i.imgur.com/mUA85tz.png")
                .addFields(
                    { name: 'Jugadores Conectados', value: result.data.length, inline: true  },
                    { name: 'Status del servidor', value: '✅ ENCENDIDO', inline: true },
                   
                )
                .setTimestamp(new Date())
                .setFooter(`Enviado Por: ${message.author.tag}`);
                message.channel.send(onlineEmbed);
           }
           

        })
           .catch(function(){
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle(config.SERVER_NAME)
            .setDescription('IP: `https://tenderetecity.es`')
            .setThumbnail(config.SERVER_LOGO)
//            .setImage("https://i.imgur.com/mUA85tz.png")
            .addFields(
              { name: 'Jugadores Conectados', value: '0', inline: true  },
              { name: 'Status del servidor', value: '❌ APAGADO/MANTENIMIENTO', inline: true },
             
          )
            .setTimestamp(new Date())
            .setFooter(`Enviado Por: ${message.author.tag}`);
            message.channel.send(offlineEmbed);
           })
         
       
    }, 
};