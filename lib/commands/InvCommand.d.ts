import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class InvCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "inv";
    constructor(bot: Bot);
    execute(): CommandExecution | null;
}
