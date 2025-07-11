"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncCommand = void 0;
class AsyncCommand {
    constructor(bot) {
        this.cmdName = 'async';
        this.bot = bot;
    }
    execute(args, number) {
        if (args.length === 0) {
            this.bot.terminal.log('Usage: async <command> [..args]');
        }
        else {
            const cmd = args.join(' ');
            this.bot.terminal.commandBuffer.runAsyncCommand(cmd);
        }
        return null;
    }
}
exports.AsyncCommand = AsyncCommand;
