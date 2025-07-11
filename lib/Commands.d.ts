import { Bot } from 'mineflayer';
export interface CommandExecution {
    pid: number;
    begin: () => void;
    cancel: () => void;
    isRunning: () => boolean;
    cleanup: () => void;
}
export type ExecuteFunction = ((args: string[]) => CommandExecution | null) | ((ctx: CommandContext) => CommandExecution | null) | ((args: string[]) => void | Promise<void>) | ((ctx: CommandContext) => void | Promise<void>);
export interface CommandContext {
    bot: Bot;
    username: string;
    args: string[];
}
export interface CommandHandler {
    cmdName: string;
    execute: (args: string[], number: number) => void | CommandExecution | Promise<void | CommandExecution | null> | null;
}
export declare class Command {
    readonly name: string;
    readonly args: string[];
    constructor(name: string, args: string[]);
    toString(): string;
}
export declare class CommandBuffer {
    private readonly bot;
    private readonly buffer;
    private readonly handlers;
    private activeCmd;
    private readonly asyncCmds;
    private pidIncrement;
    private readonly parsedCmd;
    constructor(bot: Bot);
    queue(cmd: string): void;
    addHandler(cmdHandler: CommandHandler): void;
    getHandler(cmdName: string): CommandHandler | null;
    runAsyncCommand(cmd: string): void;
    private finishAsyncCommand;
    private update;
    private triggerNextCmd;
}
