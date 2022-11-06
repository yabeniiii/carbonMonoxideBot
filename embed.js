const { config } = require('dotenv');
config();

const { GatewayIntentBits } = require('discord.js');
const { MessageEmbed } =  require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const click = 'Click here to view message';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.get(`${process.env.CHANNEL_ID}`).send('my name is Skylar White yo');
});

client.on('messageCreate', async (message) => {
    console.log(`${message.author.id}: ${message.content}`)
    const embed = {
	    color: 0x0099ff,
    	title: `${message.content}`,
    	author: {
    		name: `${message.author.tag}`,
    		icon_url: `${message.author.avatarURL()}`
    	},
        fields: [
            {name: `Current CO count: ${counterJSON.count}`, value: 'Crank up that atmospheric PPM'},
        ],
        description: `[${click}](${message.url})`,
    	timestamp: new Date().toISOString(),
    };

    if (!message?.author.bot) {
        message.channel.send(`this mf (${message.author}) said carbon monoxide ong :skull:`);
        message.channel.send({embeds: [embed]});
    }
})



client.login(`${process.env.DISCORD_TOKEN}`);