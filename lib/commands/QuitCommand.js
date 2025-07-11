"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuitCommand = void 0;
class QuitCommand {
    constructor(bot) {
        this.cmdName = 'quit';
        this.bot = bot;
    }
    execute(args, number) {
        if (args.length === 0) {
            this.bot.quit();
        }
        else {
            this.bot.terminal.log('Usage: quit');
        }
        return null;
    }
}
exports.QuitCommand = QuitCommand;
