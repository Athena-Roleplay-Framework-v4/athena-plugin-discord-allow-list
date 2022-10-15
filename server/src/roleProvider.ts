import { Athena } from '@AthenaServer/api/athena';
import { ATHENA_EVENTS_PLAYER } from '@AthenaShared/enums/athenaEvents';
import * as alt from 'alt-server';
import axios from 'axios';
import { DISCORD_CONFIG } from './config';
import { DiscordMember } from './interfaces';

let isValid = false;

const InternalFunctions = {
    /**
     * Formats an API request for the Discord API
     *
     * @param {typeof DISCORD_CONFIG} config
     * @param {string} [endpoint=undefined]
     * @return {*}  {string}
     */
    formatApiRequest(config: typeof DISCORD_CONFIG, endpoint: string = undefined): string {
        let initialURL = `https://discord.com/api/${config.VERSION}/guilds/${config.GUILD}`;
        return endpoint ? initialURL + endpoint : initialURL;
    },
    /**
     * Does a guild GET request to ensure the bot token is working correctly.
     *
     * @param {typeof DISCORD_CONFIG} config
     * @return {Promise<boolean>}
     */
    async isConfigValid(config: typeof DISCORD_CONFIG): Promise<boolean> {
        const url = InternalFunctions.formatApiRequest(config, '/preview');
        const request = await axios.get(url, { headers: { Authorization: `Bot ${config.BOT_TOKEN}` } }).catch((err) => {
            return undefined;
        });

        if (!request || !request.data) {
            alt.logWarning(`Discord Roles | Configuration is incorrect, or bot is not present in Discord Server`);
            return false;
        }

        isValid = true;
        return true;
    },
    /**
     * Obtains user roles through a discord identifier.
     *
     * @param {string} discordIdentifier
     * @return {(Promise<Array<string> | undefined>)}
     */
    async getUserRoles(discordIdentifier: string): Promise<Array<string> | undefined> {
        const url = InternalFunctions.formatApiRequest(DISCORD_CONFIG, `/members/${discordIdentifier}`);
        const request = await axios
            .get(url, { headers: { Authorization: `Bot ${DISCORD_CONFIG.BOT_TOKEN}` } })
            .catch((err) => {
                return undefined;
            });

        if (!request || !request.data) {
            alt.logWarning(`Discord Roles | Could not fetch member in Discord Guild. ID: ${discordIdentifier}`);
            return undefined;
        }

        const member = request.data as DiscordMember;
        return member.roles;
    },
    /**
     * Simply kicks the user on login if they are not allow listed.
     *
     * @param {alt.Player} player
     * @return {void}
     */
    async isAllowListed(player: alt.Player): Promise<boolean> {
        if (!player.accountData) {
            player.kick('Ensure you are in the Discord Guild to join.');
            return false;
        }

        const userRoles = await InternalFunctions.getUserRoles(player.accountData.discord);
        if (!userRoles) {
            player.kick('Ensure you are in the official Discord Server and have a allow list role.');
            return false;
        }

        const rolesMatched = userRoles.filter((e) => DISCORD_CONFIG.ALLOW_ROLES.indexOf(e) !== -1);
        if (rolesMatched.length <= 0) {
            player.kick('Ensure you are in the official Discord Server and have a allow list role.');
            return false;
        }

        return true;
    },
};

const RoleProviderConst = {
    /**
     * Initialize this plugin.
     */
    async init() {
        await InternalFunctions.isConfigValid(DISCORD_CONFIG);
        if (!isValid) {
            return;
        }

        Athena.events.player.on(ATHENA_EVENTS_PLAYER.FINISHED_LOGIN, InternalFunctions.isAllowListed);
    },
    /**
     * Get roles associated with a user who is logged in or a discord identifier.
     *
     * @param {alt.Player | string} player
     * @return {(Promise<Array<string> | undefined>)}
     */
    async getRoles(playerOrIdentifier: alt.Player | string): Promise<Array<string> | undefined> {
        const identifer =
            typeof playerOrIdentifier === 'string' ? playerOrIdentifier : playerOrIdentifier.accountData.discord;

        return await InternalFunctions.getUserRoles(identifer);
    },
};

export const DiscordRoleProvider = {
    ...RoleProviderConst,
};
