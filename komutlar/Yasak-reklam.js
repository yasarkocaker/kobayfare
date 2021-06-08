exports.run = (client, message) => {
    let db = require("quick.db")
    let Discord = require("discord.js")
    const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

    let reklam = db.fetch(`reklam.${message.guild.id}.durum`)
    const member3 = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`**HATA** - Bu Sunucuda Yetkili Değilsin.`)
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
    if (reklam) {
        db.delete(`reklam.${message.guild.id}`)
        message.channel.send(`**Başarılı ile reklam engel kapandı.**`).then(l => {
            l.delete({
                timeout: 5000
            })
        })
    } else {
        db.set(`reklam.${message.guild.id}.durum`, true)
        message.channel.send(`**Başarılı ile reklam engel açıldı.**`).then(l => {
            l.delete({
                timeout: 5000
            })
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3,
    usage:'st!reklamengel'
};

exports.help = {
    name: 'reklamengel',
    description: ''
}