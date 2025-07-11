import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class HealthCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName = "health";
    constructor(bot: Bot);
    execute(args: string[], number: number): void | CommandExecution | Promise<void | CommandExecution | null> | null;
}
