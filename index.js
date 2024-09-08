const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
//====================================
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent,  showModal, InteractionCollector, SelectMenuComponent, MessageSelectMenu, PermissionFlagsBits } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.MESSAGE_CONTENT] });
//====================================


client.on('ready', () => {
  console.clear()
console.log(`${client.user.tag} is Online 🟢`);
    client.user.setStatus("idle")
    let status =
        [
        `${client.user.username} System`,
        `My Dev M7md6565`,
        `My Prefix ${prefix} | Mention Me`,
        ]
    setInterval(()=>{
        client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
        },8000)
});

process.on("uncaughtException" , err => {
  return console.log(err)
});

process.on("unhandledRejection" , err => {
  return console.log(err)
});

process.on("rejectionHandled", err => {
  return console.log(err)
});
const line = 'https://cdn.discordapp.com/attachments/1141839616954073119/1142543137919729855/standard_1.gif'
let prefix = '+'
//const db = require('pro.db')

client.login(process.env.token)

client.once('ready', () => {
  const targetChannel = client.channels.cache.get(targetChannelId);

  if (targetChannel) {
    targetChannel.send(`**Logged ${client.user.tag} is Online** 🟢`);
  } else {
    console.log('لم يتم العثور على الروم المحدد.');
  }
}); 

//============================================
const ms = require('ms');

const giveaways = new Collection();

client.on('messageCreate', async message => {
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

if (command === 'start') {
const [channelMention, prize, time, winnersCount] = args;
const channel = message.guild.channels.cache.get(channelMention.replace('<#', '').replace('>', ''));
if (!channel || !prize || !time || !winnersCount) {
return message.channel.send('يرجى التأكد من كتابة الأمر بشكل صحيح. +start #channel prize time winners');
}

const endTime = Date.now() + ms(time);
const embed = new MessageEmbed()
.setTitle(prize)
.setDescription(`React with 🎉 to enter!
Time: ${time}
Winners: ${winnersCount}`)
.setFooter(`Ends at`)
.setTimestamp(endTime)
.setColor('GREEN');

const giveawayMessage = await channel.send({ embeds: [embed] });
giveawayMessage.react('🎉');

giveaways.set(giveawayMessage.id, {
channelId: channel.id,
prize,
endTime,
winnersCount: parseInt(winnersCount),
messageId: giveawayMessage.id,
host: message.author.id
});

message.channel.send(`تم إنشاء الجيف أواي في ${channelMention}!`);

setTimeout(() => {
endGiveaway(giveawayMessage.id);
}, ms(time));
}

if (command === 'givend') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.channel.send('يرجى التأكد من أيدي الجيف أواي.');
}
endGiveaway(messageId);
}

if (command === 'random') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.channel.send('يرجى التأكد من أيدي الجيف أواي.');
}
const giveaway = giveaways.get(messageId);
const channel = client.channels.cache.get(giveaway.channelId);

const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
const reactions = giveawayMessage.reactions.cache.get('🎉');
reactions.users.fetch().then(users => {
const participants = users.filter(user => !user.bot).map(user => `<@${user.id}>`);
if (participants.length === 0) return message.channel.send('لا يوجد مشاركين.');
const randomUser = participants[Math.floor(Math.random() * participants.length)];
message.channel.send(`شخص عشوائي: ${randomUser}`);
});
}

if (command === 'edit') {
const [newPrize, newTime, newWinnersCount, messageId] = args;
if (!giveaways.has(messageId)) {
return message.channel.send('يرجى التأكد من أيدي الجيف أواي.');
}
editGiveaway(messageId, newPrize, newTime, newWinnersCount);
}

if (command === 'delete') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.channel.send('يرجى التأكد من أيدي الجيف أواي.');
}
deleteGiveaway(messageId);
}
});

async function endGiveaway(messageId) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
const reactions = giveawayMessage.reactions.cache.get('🎉');
reactions.users.fetch().then(users => {
const participants = users.filter(user => !user.bot).map(user => user.id);
if (participants.length === 0) return channel.send('لا يوجد مشاركين في الجيف أواي.');
const winners = [];
for (let i = 0; i < giveaway.winnersCount; i++) {
const winner = participants[Math.floor(Math.random() * participants.length)];
winners.push(`<@${winner}>`);
}
channel.send(`الفائزين بـ **${giveaway.prize}** هم:
${winners.join('
')}`);
giveawayMessage.edit({ embeds: [giveawayMessage.embeds[0].setColor('RED').setDescription(`انتهى الجيف أواي. الفائزين:
${winners.join('
')}`)] });
});
giveaways.delete(messageId);
}

async function editGiveaway(messageId, newPrize, newTime, newWinnersCount) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);

const newEndTime = Date.now() + ms(newTime);
giveaways.set(messageId, {
...giveaway,
prize: newPrize,
endTime: newEndTime,
winnersCount: parseInt(newWinnersCount)
});

const newEmbed = giveawayMessage.embeds[0]
.setTitle(newPrize)
.setDescription(`React with 🎉 to enter!
Time: ${newTime}
Winners: ${newWinnersCount}`)
.setTimestamp(newEndTime);

giveawayMessage.edit({ embeds: [newEmbed] });
channel.send('تم تعديل الجيف أواي بنجاح.');
}

async function deleteGiveaway(messageId) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
await giveawayMessage.delete();
giveaways.delete(messageId);
channel.send('تم حذف الجيف أواي.');
}
