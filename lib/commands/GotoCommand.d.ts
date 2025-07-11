import { Bot } from 'mineflayer';
import { CommandHandler, CommandExecution } from '../Commands';
export declare class GotoCommand implements CommandHandler {
    private readonly bot;
    readonly cmdName: string;
    constructor(bot: Bot);
    execute(args: string[], pid: number): CommandExecution | null;
    private printUsage;
    private warnNan;
    private parsePos;
    private parseXZ;
    private parseY;
}
