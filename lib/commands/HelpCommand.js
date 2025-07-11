"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
class HelpCommand {
    constructor(bot) {
        this.cmdName = 'help';
        this.bot = bot;
    }
    execute(args) {
        const commands = ['help', 'say', 'quit', 'kit', 'coords', 'inv', 'health'];
        this.bot.terminal.log(`Available commands: ${commands.join(', ')}`);
        return null;
    }
}
exports.HelpCommand = HelpCommand;
