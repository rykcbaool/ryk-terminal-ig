import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class AsyncCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName: string;
    constructor(bot: Bot);
    execute(args: string[], number: number): void | CommandExecution | Promise<void | CommandExecution | null> | null;
}
