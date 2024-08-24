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
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent,  showModal, InteractionCollector, SelectMenuComponent, MessageSelectMenu, PermissionFlagsBits } = require('discord.js');

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

let prefix = '+'
const db = require('pro.db')

client.login(process.env.token)

client.once('ready', () => {
  const targetChannelId = '1276922235260633212';
  const targetChannel = client.channels.cache.get(targetChannelId);

  if (targetChannel) {
    targetChannel.send(`**Logged ${client.user.tag} is Online** 🟢`);
  } else {
    console.log('لم يتم العثور على الروم المحدد.');
  }
}); 

//============================================
const adminRoleId = '1255590017494155415'; // معرف رتبة المدير
const pendingCategoryId = '1276925906316689428'; // معرف الكاتجوري للتذاكر المفتوحة
const closedCategoryId = '1276925978035228773'; // معرف الكاتجوري للتذاكر المغلقة
const adsChannelId = '1276926037690810491'; // معرف الروم الخاص بإرسال الإعلانات
const bankId = '996652813268557834'; // معرف البنك
//const GivePrice = '3'

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
  if (!interaction.isButton() && !interaction.isSelectMenu() && !interaction.isModalSubmit()) return;

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
    .setPlaceholder('اختر إعداد التذكرة')
    .addOptions([
        { label: 'everyone', value: 'everyone' },
        { label: 'here', value: 'here' },
        { label: 'Ads With Giveaway', value: 'giveaway' }
    ])
);

const buttonRow = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('close_ticket')
    .setLabel('Close')
    .setStyle('DANGER')
);

  /*  const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(`تذكرة ${interaction.user.username}`)
      .setDescription('استخدم الخيارات أدناه للتحكم في التذكرة.');

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('ticket_options')
        .setPlaceholder('اختر إعداد التذكرة')
        .addOptions([
          { label: 'everyone', value: 'everyone' },
          { label: 'here', value: 'here' },
          { label: 'Ads With Giveaway', value: 'giveaway' }
        ]),
      new MessageButton()
        .setCustomId('close_ticket')
        .setLabel('Close')
        .setStyle('DANGER')
    );*/

    await ticketChannel.send({ embeds: [embed], components: [selectMenuRow,buttonRow], content: `<@${interaction.user.id}>` });
    await interaction.reply({ content: `تم إنشاء التذكرة: ${ticketChannel}`, ephemeral: true });
  }

  if (interaction.customId === 'close_ticket') {
    await interaction.update({
      content: 'سيتم إغلاق التذكرة خلال 5 ثواني.',
      embeds: [],
      components: [],
      ephemeral: true
    });

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
if (interaction.isSelectMenu() && interaction.customId === 'ticket_options' && interaction.user.id === interaction.message.mentions.users.first().id) {
    const selectedOption = interaction.values[0];
    const ticketChannel = interaction.channel;

    let price;
    if (selectedOption === 'everyone') {
      price = 2;
      await ticketChannel.send(`C <@${bankid}> \`${price}\``);
    } else if (selectedOption === 'here') {
      price = 1;
      await ticketChannel.send(`C <@${bankid}> \`${price}\``);
    } else if (selectedOption === 'giveaway') {
      price = 3;
      await ticketChannel.send(`C <@${bankid}> \`${price}\``);
    }

    const timeoutId = setTimeout(async () => {
      await ticketChannel.send('انتهى الوقت، لا تقم بالتحويل.');
    }, 180000);

    ticketChannel.awaitMessages({
      filter: m => m.content.includes('has transferred') && m.author.id === interaction.user.id,
      max: 1,
      time: 180000,
      errors: ['time']
    }).then(async collected => {
      clearTimeout(timeoutId);

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('تم التحويل بنجاح. اضغط على الزر أدناه لإضافة الإعلان.');

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`confirm_payment_${selectedOption}`)
          .setLabel('Ads')
          .setStyle('PRIMARY')
      );

      await ticketChannel.send({ embeds: [embed], components: [row] });
    }).catch(() => {
      ticketChannel.send('لم يتم التحويل في الوقت المحدد.');
    });
  }

  if (interaction.isButton() && interaction.customId.startsWith('confirm_payment_') && interaction.user.id === interaction.message.mentions.users.first().id) {
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
    const adType = interaction.customId.split('_')[2];

    const adContent = interaction.fields.getTextInputValue('ad_content');
    if (adType === 'everyone' || adType === 'here') {
      await interaction.update({ content: 'تم إرسال إعلانك.', embeds: [], components: [] });

      const mention = adType === 'everyone' ? '<@redacted>' : '<@redacted>';
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
          .setStyle('PRIMARY')
      );

      await interaction.update({ embeds: [embed], components: [row] });
    }
  }

  if (interaction.isButton() && interaction.customId === 'add_giveaway' && interaction.user.id === interaction.message.mentions.users.first().id) {
    const modal = new Modal()
      .setCustomId('modal_giveaway_price')
      .setTitle('قيمة الجيف أواي')
      .addComponents(
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('giveaway_price')
            .setLabel('ضع قيمة الجيف أواي')
            .setStyle('SHORT')
            .setRequired(true)
        )
      );

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'modal_giveaway_price') {
    const giveawayPrice = interaction.fields.getTextInputValue('giveaway_price');
    const channelName = interaction.user.tempChannelName;
    const adContent = interaction.user.tempAdContent;

    const category = interaction.guild.channels.cache.get(pendingCategoryId);

    const giveawayChannel = await interaction.guild.channels.create(channelName, {
      type: 'GUILD_TEXT',
      parent: category,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone.id,
          deny: ['SEND_MESSAGES']
        }
      ]
    });

    const giveawayMessage = await giveawayChannel.send({content: `${adContent}`});

    // بدء الجيف أواي
const giveawayEm = new MessageEmbed()
.setTitle('🎉 Giveaway 🎉')
.setDescription(`Prize: **${giveawayPrice}**\nReact with 🎉 to enter!\nEnds in 30 seconds.`)
.setColor('BLUE')

    await giveawayChannel.send(giveawayEm);
await giveawayMessage.react('🎉');

    // الانتظار لمدة 30 ثانية
    setTimeout(async () => {
      const fetchedMessage = await giveawayChannel.messages.fetch(giveawayMessage.id);
      const reactions = fetchedMessage.reactions.cache.get('🎉');
      const users = await reactions.users.fetch();
      const entries = users.filter(user => !user.bot).map(user => user);

      if (entries.length > 0) {
        const winner = entries[Math.floor(Math.random() * entries.length)];
        await giveawayChannel.send(`🎉 مبروك! <@${winner.id}> فاز بجائزة ${giveawayPrice}!`);

        await giveawayChannel.messages.edit(giveawayMessage.id, { content: 'تم انتهاء الجيف أواي.', embeds: [giveawayEm], components: [] });
      } else {
        await giveawayChannel.send('لم يتم العثور على فائز.');
      }
    }, 30000);

    await interaction.reply({ content: 'تم ارسال الاعلان و الجيف أواي.', ephemeral: true });
  }
});


/*
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
    if (!interaction.isButton() && !interaction.isSelectMenu() && !interaction.isModalSubmit()) return;

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
    .setPlaceholder('اختر إعداد التذكرة')
    .addOptions([
        { label: 'everyone', value: 'everyone' },
        { label: 'here', value: 'here' },
        { label: 'Ads With Giveaway', value: 'giveaway' }
    ])
);

const buttonRow = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('close_ticket')
    .setLabel('Close')
    .setStyle('DANGER')
);

await ticketChannel.send({ embeds: [embed], components: [selectMenuRow, buttonRow] });
await interaction.reply({ content: `تم إنشاء التذكرة: ${ticketChannel}`, ephemeral: true });
    }

    /*    const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`تذكرة ${interaction.user.username}`)
            .setDescription('استخدم الخيارات أدناه للتحكم في التذكرة.');

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('ticket_options')
                .setPlaceholder('اختر إعداد التذكرة')
                .addOptions([
                    { label: 'everyone', value: 'everyone' },
                    { label: 'here', value: 'here' },
                    { label: 'Ads With Giveaway', value: 'giveaway' }
                ]),
            new MessageButton()
                .setCustomId('close_ticket')
                .setLabel('Close')
                .setStyle('DANGER')
        );

        await ticketChannel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `تم إنشاء التذكرة: ${ticketChannel}`, ephemeral: true });
    }

    if (interaction.customId === 'close_ticket') {
        await interaction.update({ content: 'سيتم إغلاق التذكرة خلال 5 ثواني.', embeds: [], components: [], ephemeral: true });

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

    if (interaction.isSelectMenu() && interaction.customId === 'ticket_options') {
        const selectedOption = interaction.values[0];
        const ticketChannel = interaction.channel;

        if (selectedOption === 'everyone' || selectedOption === 'here') {
            const price = selectedOption === 'everyone' ? '2' : '1';  // تعيين السعر بناءً على الخيار
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`حول المبلغ ل ${bankId} بقيمة ${price}\nc <@${bankId}> ${price}`);

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId(`confirm_payment_${selectedOption}`)
                    .setLabel('Ads')
                    .setStyle('PRIMARY')
            );

            await interaction.reply({ embeds: [embed], components: [row] });
        } else if (selectedOption === 'giveaway') {
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription('اضغط على الزر أدناه لإدخال تفاصيل الإعلان.');

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('giveaway_details')
                    .setLabel('Ads')
                    .setStyle('PRIMARY')
            );

            await interaction.update({ embeds: [embed], components: [row] });
        }
    }

    if (interaction.isButton() && interaction.customId === 'giveaway_details') {
const modal = new Modal()
            .setCustomId('modal_ad_giveaway')
            .setTitle('نموذج الإعلان')
            .addComponents(
                new MessageActionRow().addComponents(
                    new TextInputComponent()
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

        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_ad_giveaway') {
        const channelName = interaction.fields.getTextInputValue('channel_name');
        const adContent = interaction.fields.getTextInputValue('ad_content');

        interaction.user.tempChannelName = channelName;
        interaction.user.tempAdContent = adContent;

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`قم بتحويل سعر الإعلان ل ${bankId} ${GivePrice}\nc <@${bankId}> ${GivePrice}`);

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('confirm_payment_giveaway')
                .setLabel('Confirm')
                .setStyle('PRIMARY')
        );

        await interaction.update({ embeds: [embed], components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'confirm_payment_giveaway') {
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription('تم تحويل سعر الإعلان بنجاح. اضغط على الزر أدناه لإضافة الجيف أواي.');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
.setCustomId('add_giveaway')
                .setLabel('Add Giveaway')
                .setStyle('PRIMARY')
        );

        await interaction.update({ embeds: [embed], components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'add_giveaway') {
        const modal = new Modal()
            .setCustomId('modal_giveaway_price')
            .setTitle('قيمة الجيف أواي')
            .addComponents(
                new MessageActionRow().addComponents(
                    new TextInputComponent()
                        .setCustomId('giveaway_price')
                        .setLabel('ضع قيمة الجيف أواي')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            );

        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_giveaway_price') {
        const giveawayPrice = interaction.fields.getTextInputValue('giveaway_price');
        const channelName = interaction.user.tempChannelName;
        const adContent = interaction.user.tempAdContent;

        setTimeout(async () => {
            const category = interaction.guild.channels.cache.get(pendingCategoryId);

            const giveawayChannel = await interaction.guild.channels.create(channelName, {
                type: 'GUILD_TEXT',
                parent: category,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: ['SEND_MESSAGES']
                    }
                ]
            });

            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setTitle('إعلان جديد مع جيف أواي')
                .setDescription(adContent);

            const giveawayMessage = await giveawayChannel.send({ embeds: [embed] });

            // بدء الجيف أواي
            await giveawayMessage.react('🎉');
await giveawayChannel.send(`🎉 **Giveaway** 🎉
Prize: ${giveawayPrice}
React with 🎉 to enter!
Ends in 20 seconds.`);

            // الانتظار لمدة 20 ثانية
            setTimeout(async () => {
                const fetchedMessage = await giveawayChannel.messages.fetch(giveawayMessage.id);
                const reactions = fetchedMessage.reactions.cache.get('🎉');
                const users = await reactions.users.fetch();
                const entries = users.filter(user => !user.bot).map(user => user);

                if (entries.length > 0) {
                    const winner = entries[Math.floor(Math.random() * entries.length)];
                    await giveawayChannel.send(`🎉 مبروك! <@${winner.id}> فاز بجائزة ${giveawayPrice}!`);

                    await giveawayChannel.messages.edit(giveawayMessage.id, { content: 'تم انتهاء الجيف أواي.', embeds: [], components: [] });
                } else {
                    await giveawayChannel.send('لم يتم العثور على فائز.');
                }
            }, 20000);

            await interaction.followUp({ content: 'تم فتح روم الجيف أواي.', ephemeral: true });
        }, 5000);
    }
});
*/

