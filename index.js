const { config } = require('dotenv');
config();

const fs = require('fs');

const { GatewayIntentBits } = require('discord.js');
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
    client.channels.cache.get(`${process.env.CHANNEL_ID}`).send('yo');
});

client.on('messageCreate', async (input) => {
    let counterJSON = JSON.parse(fs.readFileSync('counter.json'));
    let message = input.content.toLowerCase();
    if(!input?.author.bot) {
        console.log(`${input.author.tag} says: ${input.content}`);
    }   
    const embed = {
	    color: 0x0099ff,
    	title: `${input.content}`,
    	author: {
    		name: `${input.author.tag}`,
    		icon_url: `${input.author.avatarURL()}`
    	},
        fields: [
            {name: '\u200b', value: '\u200b'},
            {name: `Current CO count: ${counterJSON.count}`, value: 'Crank up that atmospheric PPM'},
        ],
        description: `[${click}](${input.url})`,
    	timestamp: new Date().toISOString(),
    };
    if ((message.includes('carbon'))&&(message.includes('monoxide'))&&(!input?.author.bot)) {
        client.channels.cache.get(`${process.env.CHANNEL_ID}`).send(`this mf (${input.author}) said carbon monoxide ong :skull:`);
        client.channels.cache.get(`${process.env.CHANNEL_ID}`).send({embeds: [embed]});
        counterJSON.count++;
        console.log(counterJSON.count);
        //const embed = new Discord.Embed()
        //    .setTitle(`${message.content}`);
        //client.channels.cache.get('1037528965428027462').send({embeds: [embed]});
    }
    fs.writeFileSync("counter.json", JSON.stringify(counterJSON));
});

var stdin = process.openStdin();

stdin.on('data', data => {
    client.channels.cache.get(`${process.env.CHANNEL_ID}`).send(data.toString());
});

client.login(`${process.env.DISCORD_TOKEN}`);