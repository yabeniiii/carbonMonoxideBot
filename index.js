//import dotenv from 'dotenv';
//dotenv.config();

const { config } = require('dotenv');
config();

const fs = require('fs');

const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const { channel } = require('diagnostics_channel');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.get(`${process.env.CHANNEL_ID}`).send('yo');
});

client.on('messageCreate', async (input) => {
    let counterJSON = JSON.parse(fs.readFileSync('counter.json'));
    let message = input.content.toLowerCase();
    console.log(`${input.author} says: ${input.content}`);
    if ((message.includes('carbon'))&&(message.includes('monoxide'))&&(!input?.author.bot)) {
        client.channels.cache.get(`${process.env.CHANNEL_ID}`).send(`:bangbang::bangbang::bangbang::bangbang::bangbang: \nthis mf (${input.author})said carbon monoxide ong :skull: \n \n"${input.content}" \n \n${input.url} \n \nCurrent CO count: ${counterJSON.count}, crank up that atmospheric PPM \n:bangbang::bangbang::bangbang::bangbang::bangbang:`);
        counterJSON.count++;
        console.log(counterJSON.count);
        //const embed = new Discord.Embed()
        //    .setTitle(`${message.content}`);
        //client.channels.cache.get('1037528965428027462').send({embeds: [embed]});
    }
    fs.writeFileSync("counter.json", JSON.stringify(counterJSON));
});

client.login(`${process.env.DISCORD_TOKEN}`);