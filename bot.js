const mineflayer = require('mineflayer');
const { setInterval } = require('timers');
const http = require('http');

// Create the bot and set the username
const bot = mineflayer.createBot({
  host: '167.235.169.242', // Replace with the server IP
  port: 28007, // Default Minecraft port, change if necessary
  username: 'ServManager1',
  version: '1.20.2' // Ensure this matches your server version
});

// When the bot has logged in successfully
bot.on('spawn', () => {
  console.log('Bot has logged in!');

  // Start the bot to do random actions
  setInterval(randomMovement, 3000); // Random actions every 3 seconds
});

// Function to move the bot randomly
function randomMovement() {
  const randomAction = Math.floor(Math.random() * 4);

  switch (randomAction) {
    case 0: // Move forward
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000); // Stop after 1 second
      break;
    case 1: // Jump
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000); // Stop after 1 second
      break;
    case 2: // Move backward
      bot.setControlState('back', true);
      setTimeout(() => bot.setControlState('back', false), 1000); // Stop after 1 second
      break;
    case 3: // Turn randomly
      const randomTurn = Math.random() < 0.5 ? 'left' : 'right';
      bot.setControlState(randomTurn, true);
      setTimeout(() => bot.setControlState(randomTurn, false), 1000); // Stop turning after 1 second
      break;
  }
}

// Error handling
bot.on('error', err => {
  console.log('An error occurred:', err);
});

bot.on('end', () => {
  console.log('Bot has disconnected!');
  process.exit(0); // Make sure the bot keeps running even after disconnecting
});

// HTTP Server to respond to pings
http.createServer((req, res) => {
    console.log('Received a ping request');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
}).listen(process.env.PORT || 3000, () => {
    console.log('HTTP Server running!');
});
