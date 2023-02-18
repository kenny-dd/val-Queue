const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("valq")
    .setDescription(
      "Sets up a queue to see players willing to queue Valorant."
    ),
  async execute(interaction, client) {
    const valEmbed = new EmbedBuilder()
      .setTitle(`Valorant 5-Queue List`)
      .setDescription(`Are you free to play tonight?\n\u200B`)
      .setColor(0xfa4454)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .addFields([
        {
          name: `Available`,
          value: "test\n\u200B",
          inline: true,
        },
        {
          name: `Busy`,
          value: `Value 2\n\u200B`,
          inline: true,
        },
      ]);

    const valButton = new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          customId: "available",
          label: "Available",
          style: ButtonStyle.Primary,
        }),
        new ButtonBuilder({
          customId: "busy",
          label: "Busy",
          style: ButtonStyle.Danger,
        }),
      ],
    });

    const queueList = [];
    const busyList = [];

    client.on("interactionCreate", async (button) => {
      if (button.customId === "available") {
        queueList.push(interaction.user.tag);
        [...new Set(queueList)];
        console.log(queueList);

        valEmbed.addFields({
          name: "Available:",
          value: `${queueList} + \n`,
          inline: true,
        });
      } else if (button.customId === "busy") {
        busyList.push(interaction.user.tag);
        [...new Set(busyList)];
        console.log(busyList);

        valEmbed.addFields({
          name: "Busy:",
          value: `${busyList} + \n`,
          inline: true,
        });
      }
    });

    await interaction.reply({
      embeds: [valEmbed],
      components: [valButton],
    });
  },
};
