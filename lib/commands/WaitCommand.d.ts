import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class WaitCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName: string;
    constructor(bot: Bot);
    execute(args: string[], pid: number): CommandExecution | null;
}
