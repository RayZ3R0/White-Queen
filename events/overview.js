const client = require('../index')



client.on('guildMemberAdd', async (member) => {
    const  guild  = member.guild

    const MemberCountChannel  = guild.channels.cache.get("968051671001366559");
    const BotChannel = guild.channels.cache.get("968051950237122601");
    const channelc = guild.channels.cache.get("968052330123628554");
            const membersOverview    = `Members: ${guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()}`;
            const bots   = `Bots: ${guild.members.cache.filter((user) => user.user.bot).size.toLocaleString()}`;
            const channel   = `Channels: ${guild.channels.cache.size - 20}`;

            MemberCountChannel.setName(membersOverview);
            BotChannel.setName(bots);
            channelc.setName(channel)

});

client.on('guildMemberRemove', async (member) => {
    const  guild  = member.guild

    const MemberCountChannel  = guild.channels.cache.get("968051671001366559");
    const BotChannel = guild.channels.cache.get("968051950237122601");
    const channelc = guild.channels.cache.get("968052330123628554");
            const membersOverview    = `Members: ${guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()}`;
            const bots   = `Bots: ${guild.members.cache.filter((user) => user.user.bot).size.toLocaleString()}`;
            const channel   = `Channels: ${guild.channels.cache.size - 20}`;

            MemberCountChannel.setName(membersOverview);
            BotChannel.setName(bots);
            channelc.setName(channel)

});

client.on("channelCreate", function (channel) {
    const  guild  = channel.guild

    const MemberCountChannel  = guild.channels.cache.get("968051671001366559");
    const BotChannel = guild.channels.cache.get("968051950237122601");
    const channelc = guild.channels.cache.get("968052330123628554");
            const membersOverview    = `Members: ${guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()}`;
            const bots   = `Bots: ${guild.members.cache.filter((user) => user.user.bot).size.toLocaleString()}`;
            const channela   = `Channels: ${guild.channels.cache.size - 20}`;

            MemberCountChannel.setName(membersOverview);
            BotChannel.setName(bots);
            channelc.setName(channela)
});

client.on("channelDelete", function (channel) {
    const  guild  = channel.guild

    const MemberCountChannel  = guild.channels.cache.get("968051671001366559");
    const BotChannel = guild.channels.cache.get("968051950237122601");
    const channelc = guild.channels.cache.get("968052330123628554");
            const membersOverview    = `Members: ${guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()}`;
            const bots   = `Bots: ${guild.members.cache.filter((user) => user.user.bot).size.toLocaleString()}`;
            const channela   = `Channels: ${guild.channels.cache.size - 20}`;

            MemberCountChannel.setName(membersOverview);
            BotChannel.setName(bots);
            channelc.setName(channela)
});