const { spawn } = require('child_process');

// Function to start the bot.js script
function startBot() {
  const botProcess = spawn('node', ['bot.js']);

  console.log('Bot has started...');

  // Listen for errors or issues in the bot process
  botProcess.on('error', (err) => {
    console.log('Bot process encountered an error:', err);
  });

  // Listen for the bot process to exit (i.e., when it disconnects)
  botProcess.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Bot process exited with code ${code}. Restarting...`);
    } else {
      console.log('Bot exited normally. Restarting...');
    }
    startBot(); // Restart the bot.js script if it exits
  });

  // Optionally, you can log stdout and stderr from the bot.js process for debugging purposes
  botProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  botProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
}

// Start the bot
startBot();
