import { Bot } from 'mineflayer';
import { UserInterface } from './UserInterface';
declare module 'mineflayer' {
    interface Bot {
        terminal: UserInterface;
    }
}
export declare function plugin(bot: Bot): void;
