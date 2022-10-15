# Athena Plugin - Discord Allow List

A plugin for Allow Listing on Discord when Authenticating with the Athena Framework's Discord Login compatible with `4.0.0` of the [Athena Framework](https://athenaframework.com/).

* Ensures a user is in your Discord.
* Ensures a user has an allow list role.

A user who is not in your Discord Server is considered banned.

## Installation

1. Open a command prompt in your main Athena Directory.
2. Navigate to the plugins folder.

```ts
cd src/core/plugins
```

3. Copy the command below.

**SSH**

```
git clone git@github.com:Athena-Roleplay-Framework/athena-plugin-discord-allow-list.git
```

**HTTPS**
```
git clone https://github.com/Athena-Roleplay-Framework/athena-plugin-discord-allow-list
```

4. Navigate into `src/core/plugins/athena-plugin-discord-allow-list/src`
5. Open the `config.ts` file.
6. Fill in the information in the configuration including IDs for roles to allow list.

All the information can be obtained from https://discord.com/developers/applications

* You need to create a bot.
* You need to copy the bot's token and put it into the configuration.
* You need to copy the Discord Guild Identifier. Which can be obtained in developer mode on Discord. Google it.
* Turn off public bot, Turn on `SERVER MEMBERS INTENT` and `PRESENCE INTENT` in the bot settings.
* [Ensure the bot is in your Discord Server](https://discordpy.readthedocs.io/en/stable/discord.html)

7. Start the server, watch for any warnings.
8. If no warnings then the plugin was configured successfully.