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
const adminRoleId = '1255590017494155415'; //ايدي الرتبة يلي تقدر تكتب الامر
const pendingCategoryId = '1276925906316689428'; // ايدي الكاتجوري للتذاكر المفتوحة
const closedCategoryId = '1276925978035228773'; // ايدي الكاتجوري للتذاكر المغلقة
const adsChannelId = '1261746084749905960'; // ايدي الروم الخاص بإرسال الإعلانات
const adsCategory = '1276926037690810491';
const bankid = '996652813268557834'; // ايدي البنك
let probotId = "282859044593598464"; //ايدي بروبوت
const targetChannelId = '1276922235260633212';
client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(prefix + 'ads')) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('ليس لديك الصلاحية لاستخدام هذا الأمر.');
    }


    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('إعلانات')
      .setDescription('لإنشاء تذكرة إعلان، اضغط على الزر أدناه.');

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('open_ticket')
        .setLabel('Open')
        .setStyle('PRIMARY')
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});


client.on('interactionCreate', async interaction => {
if (interaction.isButton()) {

  if (interaction.customId === 'open_ticket') {
    const channelName = `ticket-${interaction.user.username}`;
    const category = interaction.guild.channels.cache.get(pendingCategoryId);

    const ticketChannel = await interaction.guild.channels.create(channelName, {
      type: 'GUILD_TEXT',
      parent: category,
      permissionOverwrites: [
        {
id: interaction.guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }
      ]

});

    const embed = new MessageEmbed()
.setColor('BLUE')
.setTitle(`تذكرة ${interaction.user.username}`)
.setDescription('استخدم الخيارات أدناه للتحكم في التذكرة.');

const selectMenuRow = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId('ticket_options')
    .setPlaceholder('اختر نوع الإعلان')
    .addOptions([
        { label: 'everyone', description: 'اعلان مع منشن افريون', value: 'everyone' },
        { label: 'here', description: 'اعلان مع منشن هير', value: 'here' },
        { label: 'Ads With Giveaway', description: 'اعلان مع منشن افريون وهير وجيف اواي', value: 'giveaway' }
    ])
);

const buttonRow = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('close_ticket')
    .setLabel('Close')
    .setStyle('DANGER')
)
     await ticketChannel.send({ embeds: [embed], components: [selectMenuRow,buttonRow], content: `<@${interaction.user.id}>` });
    await interaction.reply({ content: `تم إنشاء التذكرة: ${ticketChannel}`, ephemeral: true });
  }

  if (interaction.customId === 'close_ticket') {
    await interaction.channel. send({content: 'سيتم إغلاق التذكرة خلال 5 ثواني.',ephemeral: true});

    setTimeout(async () => {
      const channel = interaction.channel;

      await channel.edit({
        name: `closed-${channel.name}`,
        parent: closedCategoryId,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          },
          {
            id: interaction.user.id,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          },
          {
            id: adminRoleId,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          }
        ]
      });

      await interaction.channel.send({ content: 'تم إغلاق التذكرة.' });
    }, 5000);
  }
}

if (interaction.isSelectMenu() && interaction.customId === 'ticket_options' && interaction.user.id === interaction.message.mentions.users.first()?.id) {
    const selectedOption = interaction.values[0];
    const ticketChannel = interaction.channel;
    interaction.user.msg = interaction.message;

    let price;
    let tax;
    if (selectedOption === 'everyone') {
      price = 2;
      tax = Math.floor(price * (20) / (19) + (1))
      await ticketChannel.send({ content: `<@${interaction.user.id}>\n**لديك 3 دقائق للتحويل ، قم بتحويل المبلغ لشراء اعلان __ايفريون__**\n\`\`\`C ${bankid} ${tax}\`\`\``});
    } else if (selectedOption === 'here') {
      price = 1;
      tax = Math.floor(price * (20) / (19) + (1))
      await ticketChannel.send({ content: `<@${interaction.user.id}>\n**لديك 3 دقائق للتحويل ، قم بتحويل المبلغ لشراء اعلان __هير__**\n\`\`\`C ${bankid} ${tax}\`\`\``});
    } else if (selectedOption === 'giveaway') {
      price = 3;
      tax = Math.floor(price * (20) / (19) + (1))
      await ticketChannel.send({ content: `<@${interaction.user.id}>\n**لديك 3 دقائق للتحويل ، قم بتحويل المبلغ لشراء اعلان __افريون وهير مع جيف اواي__**\n\`\`\`C ${bankid} ${tax}\`\`\``});
    } 

 const timeoutId = setTimeout(async () => {
   await ticketChannel.send('انتهى الوقت، لا تقم بالتحويل.');
  }, 180000);

     let filter = m => m.author.id === probotId && m.content.includes(`${interaction.user.username}`) && m.content.includes(`has transferred`) && m.content.includes(`\`$${price}\``) && m.content.includes(`<@!${bankid}>`);
  ticketChannel.awaitMessages({
    filter: filter,
      max: 1,
      time: 180000,
      errors: ['time']
  }).then(async collected => {
    clearTimeout(timeoutId)
     let msg = interaction.channel.messages.cache.get(interaction.user.msg.id);
    if(msg){
    let components = msg.components[0];
    let select = components.components[0];
    select.setDisabled(true);
    await msg.edit({components: [components]});
    }


      const embed = new MessageEmbed()

        .setColor('GREEN')

        .setDescription('تم التحويل بنجاح. اضغط على الزر أدناه لإضافة الإعلان.');

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`confirm_payment_${selectedOption}`)
          .setLabel('Ads')
          .setStyle('PRIMARY')
      );

      await ticketChannel.send({ embeds: [embed], components: [row], content: `${interaction.user}` });
    }).catch((error) => {
      ticketChannel.send(`انتهى الوقت ، لا تقم بالتحويل !\n ${error}`);
    });
  }

  if (interaction.isButton() && interaction.customId.startsWith('confirm_payment_') && interaction.user.id === interaction.message.mentions.users.first()?.id) {
    const adType = interaction.customId.split('_')[2];

    let modal;
    if (adType === 'giveaway') {
      modal = new Modal()
        .setCustomId('modal_ad_giveaway')
        .setTitle('نموذج الإعلان')
        .addComponents(
          new MessageActionRow().addComponents(new TextInputComponent()
              .setCustomId('channel_name')
              .setLabel('اسم الروم')
              .setStyle('SHORT')
              .setRequired(true)
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('ad_content')
              .setLabel('ضع إعلانك هنا')
              .setStyle('PARAGRAPH')
              .setRequired(true)
          )
        );
    } else {
      modal = new Modal()
        .setCustomId(`modal_ad_${adType}`)
        .setTitle('نموذج الإعلان')
        .addComponents(
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('ad_content')
              .setLabel('ضع إعلانك هنا')
              .setStyle('PARAGRAPH')
              .setRequired(true)
          )
        );
    }

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit()) {
if(interaction.customId.startsWith('modal_ad_')){


    const adType = interaction.customId.split('_')[2];

    const adContent = interaction.fields.getTextInputValue('ad_content');
    if (adType === 'everyone' || adType === 'here') {
      await interaction.update({ content: 'تم إرسال إعلانك.', embeds: [], components: [] });

    let msg = interaction.channel.messages.cache.get(interaction.user.msg.id);
    if(msg){
    let components = msg.components[0];
    let select = components.components[0];
    select.setDisabled(false);
    await msg.edit({components: [components]});
    }

      const mention = adType === 'everyone' ? '@everyone' : '@here';
      const adsChannel = interaction.guild.channels.cache.get(adsChannelId);
      await adsChannel.send({ content: `${adContent}\n\n${mention}` });
    } else if (adType === 'giveaway') {
      const channelName = interaction.fields.getTextInputValue('channel_name');

      interaction.user.tempChannelName = channelName;
      interaction.user.tempAdContent = adContent;

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('اضغط على الزر أدناه لإضافة قيمة الجيف أواي.');

      const row = new MessageActionRow().addComponents(new MessageButton()
          .setCustomId('add_giveaway')
          .setLabel('Add Giveaway')
          .setStyle('SUCCESS')
      );

      await interaction.update({ embeds: [embed], components: [row] });
    }
  }
}

  if (interaction.isButton() && interaction.customId === 'add_giveaway' && interaction.user.id === interaction.message.mentions.users.first()?.id) {
    const modal = new Modal()
      .setCustomId('modal_giveaway_price')
      .setTitle('قيمة الجيف أواي')
      .addComponents(
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('giveaway_price')
            .setLabel('ضع قيمة الجيف أواي')
            .setPlaceholder('ضع القيمة بالكريدت')
            .setStyle('SHORT')
            .setRequired(true)
        )
      );

    await interaction.showModal(modal);

  }

  if (interaction.isModalSubmit() && interaction.customId === 'modal_giveaway_price') {

    const giveawayPrice = interaction.fields.getTextInputValue('giveaway_price');

const ch = interaction.channel;
    await interaction.message.delete();

    const args = giveawayPrice.replace("k", "000").replace("K", "000").replace("m", "000000").replace("M", "000000").replace("b", "000000000000").replace("B", "000000000000")
  const tax = Math.floor(args * (20) / (19) + (1))

if(!giveawayPrice.endsWith("k") && !giveawayPrice.endsWith("K") && !giveawayPrice.endsWith("m") && !giveawayPrice.endsWith("M") && !giveawayPrice.endsWith("b") && !giveawayPrice.endsWith("B") && isNaN(giveawayPrice)){
  return await interaction.reply("Enter a valid price number!")
}
  interaction.reply({content: "قم بتحويل المبلغ", ephemeral: true})
await ch.send({ content: `<@${interaction.user.id}>\n**لديك 3 دقائق للتحويل ، قم بتحويل المبلغ لشراء اعلان __ايفريون__**\n\`\`\`C ${bankid} ${tax}\`\`\``});

    const timeoutId = setTimeout(async () => {
      await ch.send('انتهى الوقت، لا تقم بالتحويل.');
    }, 180000);
     let filter = m => m.author.id === probotId && m.content.includes(`${interaction.user.username}`) && m.content.includes(`has transferred`) && m.content.includes(`\`$${giveawayPrice}\``) && m.content.includes(`<@!${bankid}>`);
     ch.awaitMessages({
      filter: filter,
      max: 1,
      time: 180000,
      errors: ["time"]
    }).then(async collected => {
    clearTimeout(timeoutId);

    const channelName = interaction.user.tempChannelName;
    const adContent = interaction.user.tempAdContent;

    const category = interaction.guild.channels.cache.get(adsCategory);

    const giveawayChannel = await interaction.guild.channels.create(channelName, {
      type: 'GUILD_TEXT',
      parent: category,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone.id,
          deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        }
      ]
    });

    const giveawayMessage = await giveawayChannel.send({content: `${adContent}\n\n@everyone | @here`});

    // بدء الجيف أواي
const giveawayEm = new MessageEmbed()
.setTitle('🎉 Giveaway 🎉')
.setDescription(`Prize: **${giveawayPrice}**\nReact with 🎉 to enter!\nEnds in 30 seconds.`)
.setColor('BLUE')

   const giveawayMsg = await giveawayChannel.send({embeds: [giveawayEm]})
await giveawayMsg.react('🎉');

    // الانتظار لمدة 30 ثانية
    setTimeout(async () => {
      const fetchedMessage = await giveawayChannel.messages.fetch(giveawayMsg.id);
      const reactions = fetchedMessage.reactions.cache.get('🎉');
      const users = await reactions.users.fetch();
      const entries = users.filter(user => !user.bot).map(user => user);

      if (entries.length > 0) {
        const winner = entries[Math.floor(Math.random() * entries.length)];
        await giveawayChannel.send(`🎉 مبروك! <@${winner.id}> فاز بجائزة ${giveawayPrice}!`);

        await giveawayChannel.messages.edit(giveawayMsg.id, { content: 'تم انتهاء الجيف أواي.', embeds: [giveawayEm], components: [] });
      } else {
        await giveawayChannel.send('لم يتم العثور على فائز.');
      }
    }, 30000);

    await ch.send({ content: 'تم ارسال الاعلان و الجيف أواي.', ephemeral: true });
    }).catch(async () => {
      await ch.send('لم يتم التحويل في الوقت المحدد.');
    });
  }
});
//===================================
/*
const BankId = '996652813268557834'; // ضع معرف البنك هنا
const Price = '2'; // ضع السعر المطلوب هنا
const ProBotId = '282859044593598464'; // ضع معرف بروبوت هنا

client.on('messageCreate', async message => {
if (message.author.bot || !message.guild) return;

if (message.content.startsWith(prefix + 'p')) {
const embed = new MessageEmbed()
.setColor('YELLOW')
.setTitle('عملية تحويل')
.setDescription('اضغط على الزر أدناه للبدء.');

const row = new MessageActionRow().addComponents(
new MessageButton()
.setCustomId('start_transfer')
.setLabel('Click Here')
.setStyle('SECONDARY')
);

await message.channel.send({ embeds: [embed], components: [row] });
}
});

client.on('interactionCreate', async interaction => {
if (!interaction.isButton()) return;

if (interaction.customId === 'start_transfer') {
await interaction.update({
components: [new MessageActionRow().addComponents(
new MessageButton()
.setCustomId('confirm_price')
.setLabel('Confirm')
.setStyle('PRIMARY')
)]
});
}

let tax;
if (interaction.customId === 'confirm_price') {
tax = Math.floor(Price * (20) / (19) + (1))
await interaction.update({
content: `قم بتحويل المبلغ المطلوب\n\`\`\`C <@${BankId}> ${tax}\`\`\``,
components: []
});

  
const timeoutId = setTimeout(async () => {
      await ch.send('انتهى الوقت، لا تقم بالتحويل.');
    }, 180000);
let filter = m => m.author.id === ProBotId && m.content.includes(`${interaction.user.username}`) && m.content.includes('has transferred') && m.content.includes(`\`$${Price}\``) && m.content.includes(`<@!${BankId}>`);
interaction.channel.awaitMessages({
filter: filter,
max: 1,
time: 60000,
errors: ['time']
}).then(async collected => {
clearTimeout(timeoutId);

const embed = new MessageEmbed()
.setColor('GREEN')
.setDescription('تم التحويل بنجاح.');

const row1 = new MessageActionRow().addComponents(
new MessageButton()
.setCustomId('confirm_payment')
.setLabel('Done')
.setStyle('SUCCESS')
);

await interaction.update({ embeds: [embed], components: [row1], content: `${interaction.user}` });
}).catch((error) => {
interaction.channel.send(`انتهى الوقت، لا تقم بالتحويل!\n${error}`);
});
}

if (interaction.customId === 'confirm_payment') {
await interaction.followUp({content: 'تم التحويل',ephemeral: true});
}
});
*/
const db = require('pro.db')
const ProBot = '282859044593598464'; //ايدي بروبوت
const BankId = '996652813268557834'; // ايدي البنك
const encryptionRoomId = '1270884484056875130'; // ايدي روم التشفير
const categoryID1 = '1257476267373232158'; // ايدي الكاتجوري الخاصة بـ categoryAd
const categoryID2 = '1257476267373232158'; // ايدي الكاتجوري الخاصة بـ newAd
const mentionRoomId = '1276922235260633212'; // ايدي الروم الخاص بـ mentionHere و mentionEveryone
const logChannelId = '1279109247266984007'; // ايدي روم اللوق
const adGiftsRoomId = '1279109247266984007'; //ايدي روم هدايا الاعلانات
const roles = ['ROLE_ID_1', 'ROLE_ID_2']; // ايدي الرتب هنا
// أسعار التحويل لكل خيار
const prices = {
mentionHere: 1,
mentionEveryone: 2,
adGifts: 3,
categoryAd: 4,
newAd: 5,
firstRoomAd: 6
}
// أوقات الانتهاء لكل خيار
const adDurations = {
mentionHere: 600000, // 10 دقائق
mentionEveryone: 1200000, // 20 دقيقة
adGifts: 1800000, // 30 دقيقة
categoryAd: 3600000, // ساعة
newAd: 7200000, // ساعتين
firstRoomAd: 10800000 // 3 ساعات
};

let selectedOption;
let selectedPrice;
let targetChannel;
let adMessageSent;
// تعيين أسماء الخيارات
const optionsLabels = {
mentionHere: 'Here',
mentionEveryone: 'Everyone',
adGifts: 'Ads Gifts',
categoryAd: 'cateAds',
newAd: 'cateAds2',
firstRoomAd: 'fisrtServer'
};

client.once('ready', async () => {
console.log(`Logged in as ${client.user.tag}!`);

// استعادة صلاحيات القنوات من قاعدة البيانات
const channelsData = await db.get('channels') || [];
const currentTime = Date.now();
for (const { channelId, endTime } of channelsData) {
const channel = await client.channels.cache.get(channelId);
if (channel) {
const remainingTime = endTime - currentTime;
if (remainingTime > 0) {

setTimeout(async () => {
await revokeViewPermissions(channel);
}, remainingTime);
} else {
await revokeViewPermissions(channel);
}
}
}
});

client.on('messageCreate', async message => {
if (message.author.bot || !message.guild) return;
if (message.content.startsWith(`${prefix}send`)) {
const row = new MessageActionRow().addComponents(
new MessageButton()
.setCustomId('menuButton')
.setLabel('اختيارات الإعلان')
.setStyle('PRIMARY')
);
await message.channel.send({ content: 'اضغط على الزر للاختيار:', components: [row] });
}
});

client.on('interactionCreate', async interaction => {
if (!interaction.isButton() && !interaction.isSelectMenu() && !interaction.isModalSubmit()) return;

if (interaction.customId === 'menuButton') {
const menuRow = new MessageActionRow().addComponents(
new MessageSelectMenu()
.setCustomId('adOptions')
.setPlaceholder('اختر نوع الإعلان')
.addOptions([
{ label: 'Here', value: 'mentionHere' },
{ label: 'Everyone', value: 'mentionEveryone' },
{ label: 'AdsGifts', value: 'adGifts' },
{ label: 'CateAd', value: 'categoryAd' },
{ label: 'CateAd2', value: 'newAd' },
{ label: 'firstServer', value: 'firstRoomAd' }
])
);

await interaction.reply({
content: 'رجاءً اختر نوع الإعلان:',
components: [menuRow]});
} else if (interaction.customId === 'adOptions') {
selectedOption = interaction.values[0];
selectedPrice = prices[selectedOption];
let tax;
tax = Math.floor(selectedPrice * (20) / (19) + (1))
  
const confirmEmbed = new MessageEmbed()
.setColor('BLUE')
.setTitle('تأكيد التحويل')
.setDescription(`قم بالتحويل لديك دقيقتين فقط للتحويل.
\`c ${BankId} ${tax}\``);

await interaction.update({ content: `قم بالتحويل لاكمال عملية الشراء`, embeds: [confirmEmbed], components: [] });

await interaction.followUp({ content: `c ${BankId} ${tax}` });

let filter = m => m.author.id === ProBot && m.content.includes(`${interaction.user.username}`) && m.content.includes('has transferred') && m.content.includes(`\`$${selectedPrice}\``) && m.content.includes(`<@!${BankId}>`);
const collector = interaction.channel.createMessageCollector({ filter, time: 120000, max: 1 });

collector.on('collect', async () => {
const choicesModal = new Modal()
.setCustomId('adSubmit')
.setTitle('ضع الإعلان')
.addComponents(
new TextInputComponent()
.setCustomId('adMessage')
.setLabel('الإعلان')
.setStyle('PARAGRAPH')
.setRequired(true)
.setPlaceholder('ادخل نص الإعلان هنا'),
new TextInputComponent()
.setCustomId('roomName')
.setLabel('اسم الروم')
.setStyle('SHORT')
.setRequired(true)
.setPlaceholder('ادخل اسم الروم هنا')
);

const confirmEmbed = new MessageEmbed()
.setColor('GREEN')
.setTitle('تم التحويل بنجاح!')
.setDescription('اضغط على الزر لإدخال الإعلان.');

const adButtonRow = new MessageActionRow().addComponents(
new MessageButton()
.setCustomId('openModal')
.setLabel('ضع الإعلان')
.setStyle('SUCCESS')
);

await interaction.followUp({ embeds: [confirmEmbed], components: [adButtonRow] })

});
collector.on('end', collected => {
if (collected.size === 0) interaction.followUp(`${interaction.user}, لم يتم تأكيد التحويل في الوقت المحدد.`);
});
} else if (interaction.customId === 'openModal') {
let modal;
if (selectedOption === 'mentionHere' || selectedOption === 'mentionEveryone' || selectedOption === 'adGifts') {

const row = new MessageActionRow().addComponents(new TextInputComponent()
.setCustomId('adMessage')
.setLabel('الإعلان')
.setStyle('PARAGRAPH')
.setRequired(true)
.setPlaceholder('ادخل نص الإعلان هنا'));
 modal = new Modal()
.setCustomId('adSubmit')
.setTitle('ضع الإعلان')
.addComponents(row);
} else {
const row = new MessageActionRow().addComponents(new TextInputComponent()
.setCustomId('roomName')
.setLabel('اسم الروم')
.setStyle('SHORT')
.setRequired(true)
.setPlaceholder('ادخل اسم الروم'));
const row1 = new MessageActionRow().addComponents(new TextInputComponent()
.setCustomId('adMessage')
.setLabel('الإعلان')
.setStyle('PARAGRAPH')
.setRequired(true)
.setPlaceholder('ادخل نص الإعلان هنا'));
          
modal = new Modal()
.setCustomId('adSubmit')
.setTitle('ضع الإعلان')
.addComponents(row, row1);
}

await interaction.showModal(modal);
} else if (interaction.customId === 'adSubmit') {
const adMessage = interaction.fields.getTextInputValue('adMessage');
let roomName;
try {
   roomName = interaction.fields.getTextInputValue('roomName');
} catch {null}

if (adMessage.includes('شوب') || adMessage.includes('بيع') || adMessage.includes('شراء') || adMessage.includes('متوفر') || adMessage.includes('سعر') || adMessage.includes('متجر') || adMessage.includes('نصاب') || adMessage.includes('نصابين') || adMessage.includes('@here') || adMessage.includes('@everyone')) {
// الإعلان يحتوي كلمات تحتاج تشفير
await interaction.reply({ content: `قم بتشفير الإعلان من هنا <#${encryptionRoomId}>`, ephemeral: true });
} else {

if (selectedOption === 'categoryAd') {
const category = interaction.guild.channels.cache.get(categoryID1);
if (!category || !category.isText() && category.type !== "GUILD_CATEGORY") return interaction.reply('لم يتم العثور على الكاتجوري المحددة.', { ephemeral: true });

targetChannel = await interaction.guild.channels.create(roomName, {
type: 'GUILD_TEXT',
parent: category.id,
permissionOverwrites: [
{
id: interaction.guild.id,
allow: ['VIEW_CHANNEL'],
},
{
id: interaction.guild.id,
deny: ['SEND_MESSAGES'],
}
]
});
await targetChannel.send('جيف اواي');
await targetChannel.send(adMessage);
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else if (selectedOption === 'newAd') {
const category = interaction.guild.channels.cache.get(categoryID2);
if (!category || !category.isText() && category.type !== "GUILD_CATEGORY") return interaction.reply('لم يتم العثور على الكاتجوري المحددة.', { ephemeral: true });

targetChannel = await interaction.guild.channels.create(roomName, {
type: 'GUILD_TEXT',
parent: category.id,
permissionOverwrites: [
{
id: interaction.guild.id,
allow: ['VIEW_CHANNEL'],
},
{
id: interaction.guild.id,
deny: ['SEND_MESSAGES'],
}
]
});
await targetChannel.send('جيف اواي');
await targetChannel.send(adMessage);
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else if (selectedOption === 'firstRoomAd') {
targetChannel = await interaction.guild.channels.create(roomName, {
type: 'GUILD_TEXT',
permissionOverwrites: [
{
id: interaction.guild.id,
allow: ['VIEW_CHANNEL'],
},
{
id: interaction.guild.id,
deny: ['SEND_MESSAGES'],
}
]
});
await targetChannel.send('جيف اواي');
await targetChannel.send(adMessage);
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else if (selectedOption === 'mentionHere') {
targetChannel = interaction.guild.channels.cache.get(mentionRoomId);
if (!targetChannel) return interaction.reply('لم يتم العثور على الروم المخصص للإعلانات.', { ephemeral: true });

await targetChannel.send({content: `${adMessage} \n\n@here`});
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else if (selectedOption === 'mentionEveryone') {
targetChannel = interaction.guild.channels.cache.get(mentionRoomId);
if (!targetChannel) return interaction.reply('لم يتم العثور على الروم المخصص للإعلانات.', { ephemeral: true });

await targetChannel.send({content: `${adMessage} \n\n@everyone`});
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else if (selectedOption === 'adGifts') {
targetChannel = interaction.guild.channels.cache.get(adGiftsRoomId);
 if (!targetChannel) return interaction.reply('لم يتم العثور على الروم الخاص بالهدايا الإعلانية.', { ephemeral: true });

await targetChannel.send('جيف اواي');
await targetChannel.send(adMessage);
await targetChannel.send('وسيط');
await targetChannel.send(line);
await interaction.update({ content: `**توجه حالا الى <#${targetChannel.id}>**`, embeds: [], components: [] });

} else {
   targetChannel = interaction.guild.channels.cache.get(targetChannelId);
   if (!targetChannel) return interaction.reply('لم يتم العثور على الروم.', { ephemeral: true });

   adMessageSent = await targetChannel.send(adMessage).then(m => m);
console.log(adMessageSent);
}

await interaction.channel.send({ content: 'تم إرسال الإعلان بنجاح.', embeds: [], components: [], ephemeral: true });

const logChannel = interaction.guild.channels.cache.get(logChannelId);
if (logChannel) {
const saudiTime = new Date(Date.now() + 3 * 60 * 60 * 1000);
const saudiEndTime = new Date(Date.now() + adDurations[selectedOption] + 3 * 60 * 60 * 1000);
console.log(adMessageSent?.url);
const logEmbed = new MessageEmbed()
.setColor('ORANGE')
.setTitle('إعلان جديد')
.addFields(
{ name: 'وقت الشراء', value: saudiTime.toLocaleString(), inline: true },
{ name: 'المشتري', value: `<@${interaction.user.id}>`, inline: true },
{ name: 'البنك المستقبل', value: `<@${BankId}>`, inline: true },
{ name: 'نوع الإعلان', value: optionsLabels[selectedOption] || 'غير معروف', inline: true },
{ name: 'السعر', value: `${selectedPrice}`, inline: true },
//{ name: 'رابط رسالة الإعلان', value: `[اضغط هنا](${adMessageSent.url})`, inline: false },
{ name: 'الروم', value: `<#${targetChannel.id}>`, inline: true },
{ name: 'الإعلان', value: `\`\`\`${adMessage}\`\`\``, inline: false },
{ name: 'وقت انتهاء الإعلان', value: saudiEndTime.toLocaleString(), inline: true }
);

logChannel.send({ embeds: [logEmbed] })
await logChannel.send(line);
}

setTimeout(async() => {
await revokeViewPermissions(targetChannel);
}, adDurations[selectedOption]);
}
}
});

async function revokeViewPermissions(channel) {
if (!channel) return;
const permissionOverwrites = roles.map(roleId => ({
id: interaction.guild.id,
deny: ['VIEW_CHANNEL'],
},
{ id: roleId,
allow: ['VIEW_CHANNEL']
}));

await channel.permissionOverwrites.set(permissionOverwrites);
await db.pull('channels', entry => entry.channelId === channel.id);
}
