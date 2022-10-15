export interface DiscordMember {
    avatar: string | null;
    communication_disabled_until: null;
    flags: number;
    is_pending: boolean;
    joined_at: string;
    nick: string | null;
    pending: boolean;
    premium_since: string;
    roles: Array<string>;
    user: {
        id: string;
        username: string;
        avatar: string;
        avatar_decoration: null;
        discriminator: string;
        public_flags: number;
    };
    mute: boolean;
    deaf: boolean;
}
