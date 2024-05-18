const client = require("../index");
const InvitesTracker = require("@androz2091/discord-invites-tracker");
const tracker = InvitesTracker.init(client, {
  fetchGuilds: true,
  fetchVanity: true,
  fetchAuditLogs: true,
});

tracker.on("guildMemberAdd", async (member, type, invite) => {
  let channel = member.guild.channels.cache.get("901818838381891624");
  if (type === "normal") {
    channel.send(`**${member.user.username}** was invited by **${invite.inviter.username}** and they now have **${invite.uses}** invites`);
  } else if (type === "permissions") {
    channel.send(
      `I can't figure out how **${member.user.username}** joined because I don't have the "MANAGE_GUILD" permission!`
    );
  } else if (type === "unknown") {
    channel.send(
      `I can't figure out how **${member.user.username}** joined the server...`
    );
  } else if (type === "vanity") {
    channel.send(`**${member.user.username}** joined using a custom invite Vanity URL!`);
  }
});
