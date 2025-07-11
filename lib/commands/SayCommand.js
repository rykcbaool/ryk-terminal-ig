"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayCommand = void 0;
class SayCommand {
    constructor(bot) {
        this.cmdName = 'say';
        this.bot = bot;
    }
    execute(args, number) {
        if (args.length === 1) {
            this.bot.chat(args[0]);
        }
        else {
            this.bot.terminal.log('Usage: say <message>');
        }
        return null;
    }
}
exports.SayCommand = SayCommand;
