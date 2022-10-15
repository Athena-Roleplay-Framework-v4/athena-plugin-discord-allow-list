import * as alt from 'alt-server';
import { PluginSystem } from '@AthenaServer/systems/plugins';
import { DiscordRoleProvider } from './src/roleProvider';

const PLUGIN_NAME = 'Athena Discord Roles';

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    DiscordRoleProvider.init();
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
