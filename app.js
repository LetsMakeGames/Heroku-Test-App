const { App } = require('@slack/bolt');
require('dotenv').config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

function keywordInMessage(message, next) {
  const keyword = ['hello', 'hi', 'hey', 'hola', 'bonjour', 'hola', 'bonjour'];

  // Check message.text for a keyword
  if (keyword.some(word => message.text.toLowerCase().includes(word))) {
    next();
  }
};

// A function that runs when a keyword from a list is detected
app.message(keywordInMessage, async ({ message, context }) => {
  // Send a message to the channel
  await context.sendMessage(`You said: ${message.text}`);
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();