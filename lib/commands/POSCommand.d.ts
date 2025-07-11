import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class POSCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "coords";
    constructor(bot: Bot);
    execute(): CommandExecution | null;
}
