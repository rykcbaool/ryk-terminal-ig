import { Bot } from 'mineflayer';
import { CommandHandler } from '../types';
export declare class KitCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "kit";
    constructor(bot: Bot);
    execute(args: string[]): Promise<void>;
}
