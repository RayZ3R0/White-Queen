/*const client = require("../index");
const { ChannelType, Message } = require("discord.js");
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
characterAI.authenticateWithToken('72ee089d29c24b9d0aaf646d6c3a801170e0f377');

const { WebhookClient } = require('discord.js')
const hook = new WebhookClient({ url: 'https://ptb.discord.com/api/webhooks/1004295573979025519/qHthUOZ8YISov78q5mCNYvIQL3ncc53jwa5wIKRuRbLfGgmgqL0nfA66B_S7Eep1ccbv' });

client.on("messageCreate", async (message) => {
  if (message.author.bot || message.channel.id !== '935252085526626394') return;
        
        (async () => {

          const characterId = "V7ycZgq6G1gPARg65yVBgaxPEPQ7LCF1CXvC8ZzNrEU";
          const chat = await characterAI.createOrContinueChat(characterId);
          const response = await chat.sendAndAwaitResponse(`
          (OOC: This message was sent by ${message.author.username} - context is that multiple people are using you to chat in a chatroom using your API) 
          ${message.content}`, true);
                        hook.send(`${response.data}`)
        })

        });
        */
   
