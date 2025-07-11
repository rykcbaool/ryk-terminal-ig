import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class HelpCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "help";
    constructor(bot: Bot);
    execute(args: string[]): CommandExecution | null;
}
