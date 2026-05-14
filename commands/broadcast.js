broadcast.js
/**
 * Broadcast Command - Send message to all chats
 */

module.exports = {
    name: 'broadcast',
    aliases: ['bc'],
    category: 'owner',
    description: 'Broadcast message to all chats',
    usage: '.broadcast <message>',
    ownerOnly: true,
    
    async execute(sock, msg, args, extra) {
      try {
        if (args.length === 0) {
          return extra.reply('❌ Usage: .broadcast <message>\n\nExample: .broadcast Hello everyone!');
        }
        
        const message = args.join(' ');
        
        const chats = await sock.groupFetchAllParticipating();
        const groups = Object.values(chats);
        
        let success = 0;
        let failed = 0;
        
        for (const group of groups) {
          try {
            await sock.sendMessage(group.id, {
              text: `📢 *BROADCAST MESSAGE*\n\n${message}\n\n_This is a broadcast message from bot owner_`
            });
            success++;
          } catch (e) {
            failed++;
          }
        }
        
        await extra.reply(`✅ Broadcast complete!\n\n✅ Success: ${success}\n❌ Failed: ${failed}`);
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
  
1
/**
2
 * Broadcast Command - Send message to all chats
3
 */
4
​
5
module.exports = {
6
    name: 'broadcast',
7
    aliases: ['bc'],
8
    category: 'owner',
9
    description: 'Broadcast message to all chats',
10
    usage: '.broadcast <message>',
11
    ownerOnly: true,
12
    
13
    async execute(sock, msg, args, extra) {
14
      try {
15
        if (args.length === 0) {
16
          return extra.reply('❌ Usage: .broadcast <message>\n\nExample: .broadcast Hello everyone!');
17
        }
