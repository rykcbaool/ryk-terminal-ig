import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class HpCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "health";
    constructor(bot: Bot);
    execute(): CommandExecution | null;
}
