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
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent,  showModal, InteractionCollector, SelectMenuComponent, MessageSelectMenu, PermissionFlagsBits, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.MESSAGE_CONTENT,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
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
const targetChannelId = '1276922235260633212';
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

/*const giveaways = new Collection();

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
${winners.join('')}`);
giveawayMessage.edit({ embeds: [giveawayMessage.embeds[0].setColor('RED').setDescription(`انتهى الجيف أواي. الفائزين:
${winners.join('')}`)] });
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
}*/
///////////////

const logChannelId = '1279109247266984007'; // ضع هنا معرف روم اللوق

const giveaways = new Collection();
client.on('messageCreate', async (message) => {
if (message.author.bot || !message.guild) return;
if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

if (command === 'start') {
if (args.length < 4) {
return message.channel.send('يرجى التأكد من كتابة الأمر بشكل صحيح. مثال: +start #channel prize time winners');
}

const [channelMention, prize, time, winnersCount] = args;
const channel = message.guild.channels.cache.get(channelMention.replace('<#', '').replace('>', ''));
if (!channel || !prize || !time || !winnersCount) {
return message.channel.send('يرجى التأكد من كتابة الأمر بشكل صحيح. مثال: +start #channel prize time winners');
}

const endTime = Math.floor(Date.now() / 1000) + ms(time) / 1000;
const embed = new MessageEmbed()
.setTitle(prize)
.setDescription(`### 🎁 **Winners:** ${winnersCount}
**Hosted by:** <@${message.author.id}>
**duration:** ${ms(ms(time), { long: true })}
**Ends:** <t:${endTime}:R> (<t:${endTime}:f>)`)
.setFooter('Ends at')
.setTimestamp(endTime * 1000)
.setColor('GREEN');

const button = new MessageButton()
.setCustomId(`giveaway_join_${endTime}`)
.setLabel('0')
.setStyle('SECONDARY')
.setEmoji('<:pws:1282483663774416960>');

const row = new MessageActionRow().addComponents(button);
const giveawayMessage = await channel.send({ embeds: [embed], components: [row] });

giveaways.set(giveawayMessage.id, {
channelId: channel.id,
prize,
endTime,
winnersCount: parseInt(winnersCount),
messageId: giveawayMessage.id,
host: message.author.id,
participants: []
});

message.reply({ content: 'تم إنشاء الجيف أواي بنجاح.', ephemeral: true });

setTimeout(() => {
endGiveaway(giveawayMessage.id);
}, ms(time));
}

if (command === 'gend') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.reply({ content: 'يرجى التأكد من أيدي الجيف أواي.', ephemeral: true });
}
endGiveaway(messageId);
}

if (command === 'random') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.reply({ content: 'يرجى التأكد من أيدي الجيف أواي.', ephemeral: true });
}
const giveaway = giveaways.get(messageId);
const participants = giveaway.participants;
if (participants.length === 0) return message.channel.send('لا يوجد مشاركين.');
const randomUser = participants[Math.floor(Math.random() * participants.length)];
message.channel.send(`شخص عشوائي: <@${randomuser}>`);
}

if (command === 'edit') {
const [newPrize, newTime, newWinnersCount, messageId] = args;
if (!giveaways.has(messageId)) {
return message.reply({ content: 'يرجى التأكد من أيدي الجيف أواي.', ephemeral: true });
}
editGiveaway(messageId, newPrize, newTime, newWinnersCount, message);
}

if (command === 'delete') {
const messageId = args[0];
if (!giveaways.has(messageId)) {
return message.reply({ content: 'يرجى التأكد من أيدي الجيف أواي.', ephemeral: true });
}
deleteGiveaway(messageId, message);
}
});

async function endGiveaway(messageId) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
const participants = giveaway.participants;
if (participants.length === 0) return channel.send('لا يوجد مشاركين في الجيف أواي.');

const winners = [];
for (let i = 0; i < giveaway.winnersCount; i++) {
const winner = participants[Math.floor(Math.random() * participants.length)];
winners.push(`<@${winner}>`);
}
channel.send(`Giveaway Ended!
Congratulations to the winners: ${winners.join('')}
Ther Won **(${giveaway.prize})**`)
giveawayMessage.edit({ embeds: [giveawayMessage.embeds[0].setColor('GREEN').setDescription(`**Winners:**
${winners.join('').setFooter(`Giveaway has Ended`)}`)] });
giveaways.delete(messageId);
}

async function editGiveaway(messageId, newPrize, newTime, newWinnersCount, authorMessage) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);

const newEndTime = Math.floor(Date.now() / 1000) + ms(newTime) / 1000;
const previousDetails = `قبل:
الجائزة: ${giveaway.prize}
الوقت: ${ms(ms(giveaway.endTime * 1000 - Date.now()), { long: true })}
الفائزين: ${giveaway.winnersCount}`;
const newDetails = `بعد:
الجائزة: ${newPrize}
الوقت: ${ms(ms(newTime), { long: true })}
الفائزين: ${newWinnersCount}`;

giveaways.set(messageId, {
...giveaway,
prize: newPrize,
endTime: newEndTime,
winnersCount: parseInt(newWinnersCount),
participants: giveaway.participants,
});

const newEmbed = giveawayMessage.embeds[0]
.setTitle(newPrize)
.setDescription(`### 🎁 **Winners:** ${newWinnersCount}
**Hosted by:** <@${giveaway.host}>
**duration:** ${ms(ms(newTime), { long: true })}
**Ends:** <t:${newEndTime}:R> (<t:${newEndTime}:f>)`)
.setTimestamp(newEndTime * 1000);

giveawayMessage.edit({ embeds: [newEmbed] });
authorMessage.reply({ content: 'تم تعديل الجيف أواي بنجاح.', ephemeral: true });

const logChannel = client.channels.cache.get(logChannelId);
if (logChannel) {
const logEmbed = new MessageEmbed()
.setColor('BLUE')
.setTitle('جيف أواي معدل')
.addField('الروم', `<#${giveaway.channelId}>`)
.addField('قبل', previousDetails)
.addField('بعد', newDetails)
.addField('تم التعديل بواسطة', `<@${authorMessage.author.id}>`);

logChannel.send({ embeds: [logEmbed] });
}
}

async function deleteGiveaway(messageId, authorMessage) {
const giveaway = giveaways.get(messageId);
if (!giveaway) return;
const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
await giveawayMessage.delete();
giveaways.delete(messageId);
authorMessage.reply({ content: 'تم حذف الجيف أواي.', ephemeral: true });

const logChannel = client.channels.cache.get(logChannelId);
if (logChannel) {
const logEmbed = new MessageEmbed()
.setColor('RED')
.setTitle('حذف جيف أواي')
.addField('الروم', `<#${giveaway.channelId}>`)
.addField('الجائزة', giveaway.prize)
//.addField('الوقت', ms(ms(giveaway.endTime * 1000 - Date.now()), { long: true }))
.addField('الفائزين', giveaway.winnersCount)
.addField('حذف بواسطة', `<@${authorMessage.author.id}>`);

logChannel.send({ embeds: [logEmbed] });
}
}

client.on('interactionCreate', async (interaction) => {
if (!interaction.isButton() || !interaction.customId.startsWith('giveaway_join_')) return;

const messageId = interaction.customId.split('_').pop();
const giveaway = giveaways.get(messageId);
/*
if (!giveaway) {
return interaction.reply({ content: 'لا يمكن العثور على الجيف أواي أو ربما انتهى!', ephemeral: true });
}
*/
const isAlreadyParticipating = giveaway.participants.includes(interaction.user.id);

if (isAlreadyParticipating) {
const leaveButton = new MessageButton()
.setCustomId(`giveaway_leave_${messageId}`)
.setLabel('Leave Giveaway')
.setStyle('DANGER');

const row = new MessageActionRow().addComponents(leaveButton);

return interaction.reply({ content: 'هل تريد الخروج من الجيف أواي؟', components: [row], ephemeral: true });
}

giveaway.participants.push(interaction.user.id);
const updatedButton = new MessageButton()
.setCustomId(`giveaway_join_${messageId}`)
.setLabel(`${giveaway.participants.length}`)
.setStyle('SECONDARY')
.setEmoji('<:pws:1282483663774416960>');

const row = new MessageActionRow().addComponents(updatedButton);

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);
giveawayMessage.edit({ components: [row] });
interaction.reply({ content: 'تمت إضافتك إلى الجيف أواي. حظاً سعيداً!', ephemeral: true });
});

client.on('interactionCreate', async (interaction) => {
if (!interaction.isButton() || !interaction.customId.startsWith('giveaway_leave_')) return;

const messageId = interaction.customId.split('_').pop();
const giveaway = giveaways.get(messageId);
/*
if (!giveaway) {
return interaction.reply({ content: 'لا يمكن العثور على الجيف أواي أو ربما انتهى!', ephemeral: true });
}*/

giveaway.participants = giveaway.participants.filter(id => id !== interaction.user.id);
const updatedButton = new MessageButton()
.setCustomId(`giveaway_join_${messageId}`)
.setLabel(`${giveaway.participants.length}`)
.setStyle('SECONDARY')
.setEmoji('<:pws:1282483663774416960>');

const row = new MessageActionRow().addComponents(updatedButton);

const channel = client.channels.cache.get(giveaway.channelId);
const giveawayMessage = await channel.messages.fetch(giveaway.messageId);

giveawayMessage.edit({ components: [row] });
interaction.reply({ content: 'تم إخراجك من الجيف أواي.', ephemeral: true });
});






const fs = require('fs');

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!createticket') {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('create_ticket')
                .setLabel('Create Ticket')
                .setStyle('PRIMARY')
        );

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Support Ticket')
            .setDescription('Click the button below to create a ticket.');

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const { customId, user, guild } = interaction;

    if (customId === 'create_ticket') {
        const channelName = `ticket-${user.username.toLowerCase()}-${user.discriminator}`;
        let ticketChannel = guild.channels.cache.find(channel => channel.name === channelName);

        if (!ticketChannel) {
            ticketChannel = await guild.channels.create(channelName, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ]
            });

            await ticketChannel.send(`Hello ${user}, a staff member will be with you shortly.`);
        }

        await interaction.reply({ content: `Your ticket has been created: ${ticketChannel}`, ephemeral: true });
    }
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!close' && message.channel.name.startsWith('ticket-')) {
        const messages = await message.channel.messages.fetch({ limit: 100 });
        const transcript = messages.map(m => `${m.createdAt} - ${m.author.tag}: ${m.content}`).reverse().join('');

        const filePath = `./transcripts/${message.channel.name}.txt`;
        fs.writeFileSync(filePath, transcript);

        await message.channel.send({
            content: 'Ticket has been closed and transcript has been saved.',
            files: [filePath]
        });

        setTimeout(() => {
            message.channel.delete();
        }, 5000); // تأخير 5 ثواني قبل حذف القناة لإتاحة الوقت لإرسال ملف الترانسكربت
    }
});


const prizes = ['50k', '100k', '200k', '500k', '1m']; // الجوائز
const BankId = '996652813268557834'; // ايدي البنك
const price = '2'; // المبلغ
const ProBot = '282859044593598464'; // ايدي بروبوت
const CategoryId = '1257476267373232158' // ايدي الكاتجوري 

let tax = Math.floor(price * (20) / (19) + (1)); //الضريبة (لاتلعب بشي)

client.on('messageCreate', async message => {
if (message.content.toLowerCase() === '!spin' && message.channel.parentId === CategoryId) {

 const embed = new MessageEmbed()
.setColor('GREEN')
.setTitle('Spin!')
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`لديك دقيقتين للتحويل ، قم بتحويل المبلغ المطلوب لتدوير العجلة
C ${BankId} ${tax}`)
.setTimestamp();

await message.reply({ embeds: [embed] });
let filter = m => m.author.id === ProBot && m.content.includes(`${message.author.username}`) && m.content.includes('has transferred') && m.content.includes(`\`$${price}\``) && m.content.includes(`<@!${BankId}>`);
const collector = message.channel.createMessageCollector({ filter, time: 120000 });
collector.on('collect', async collected => {
collector.stop();

const spinEm = new MessageEmbed()
.setColor('BLUE')
.setTitle('Spin!')
.setDescription('**اضغط الزر لتدوير العجلة.**')

const row = new MessageActionRow()
.addComponents(new MessageButton().setCustomId('spin_button').setLabel('Spin').setStyle('PRIMARY'));
await message.channel.send({ embeds: [spinEm], components: [row] });

client.on('interactionCreate', async interaction => {
if (!interaction.isButton()) return;
if (interaction.customId === 'spin_button' && interaction.user.id === message.author.id) {
const prizeIndex = Math.floor(Math.random() * prizes.length);
const prize = prizes[prizeIndex];
await interaction.update({content: `<@${interaction.user.id}>`,embeds: [spinEm.setDescription(`**لقد ربحت __${prize}__**`)],components: [row.setComponents(row.components[0].setDisabled(true))]
});
interaction.followUp(`**مبروووك لقد ربحت __${prize}__**`);
}
});
});

collector.on('end', collected => {
if (collected.size === 0) {
message.channel.send('انتهى الوقت لاتقم بالتحويل.');
}
});
}
});

let Sender = '590828897374044181';
client.on('messageCreate', message => {
    if (message.author.bot) return; // لتجنب تكرار الرسائل من البوت نفسه
if (message.author.id !== Sender) return;
    if (message.content.toLowerCase().startsWith('-tr')) {
        const amount = message.content.split(' ')[1];
        if (!isNaN(amount)) {
            message.channel.send(`C <@${message.author.id}> ${amount}`);
        } else {
            message.channel.send('> اكتب الرقم صحيحا');
        }
    } else if (message.content.startsWith('-ca')) {
        const content = message.content.slice(1);
        message.channel.send(content);
    }
});
