/**
 * Premium Menu Command - Stylish Bot Menu
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'Show all available commands',
  usage: '.menu',

  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};

      // Group commands by category
      commands.forEach((cmd, name) => {
        if (cmd.name === name) {
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd);
        }
      });

      const ownerNames = Array.isArray(config.ownerName)
        ? config.ownerName
        : [config.ownerName];

      const displayOwner = ownerNames[0] || 'Bot Owner';

      const user = extra.sender.split('@')[0];

      let menuText = `
╔══════════════════════╗
   🤖 *${config.botName}*
   ⚡ Premium Control Panel
╚══════════════════════╝

👤 User: @${user}
⚙️ Prefix: ${config.prefix}
📦 Commands: ${commands.size}
👑 Owner: ${displayOwner}

━━━━━━━━━━━━━━━━━━━━
`;

      // Helper function for category display
      const addCategory = (title, icon, key) => {
        if (!categories[key]) return;

        menuText += `\n╭─❒ ${icon} *${title}*\n`;

        categories[key].forEach(cmd => {
          menuText += `│ ◦ ${config.prefix}${cmd.name}\n`;
        });

        menuText += `╰───────────────\n`;
      };

      // Categories (clean order)
      addCategory('GENERAL', '🧭', 'general');
      addCategory('AI', '🤖', 'ai');
      addCategory('GROUP', '👥', 'group');
      addCategory('ADMIN', '🛡️', 'admin');
      addCategory('OWNER', '👑', 'owner');
      addCategory('MEDIA', '🎥', 'media');
      addCategory('FUN', '🎭', 'fun');
      addCategory('UTILITY', '🧰', 'utility');
      addCategory('ANIME', '👾', 'anime');
      addCategory('TEXT MAKER', '✍️', 'textmaker');

      menuText += `
━━━━━━━━━━━━━━━━━━━━

💡 Type ${config.prefix}help <command>
⚡ Bot Status: Online & Stable
🔥 Powered by Sahil's PrimeBot
╚══════════════════════╝
`;

      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '../../utils/bot_image.jpg');

      const imageBuffer = fs.existsSync(imagePath)
        ? fs.readFileSync(imagePath)
        : null;

      const sendData = {
        caption: menuText,
        mentions: [extra.sender]
      };

      if (imageBuffer) sendData.image = imageBuffer;
      else sendData.text = menuText;

      await sock.sendMessage(extra.from, sendData, {
        quoted: msg,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: config.newsletterJid || '120363406672648713@newsletter',
            newsletterName: config.botName,
            serverMessageId: -1
          }
        }
      });

    } catch (error) {
      await extra.reply(`❌ Menu Error: ${error.message}`);
    }
  }
};
