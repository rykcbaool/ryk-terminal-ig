"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HpCommand = void 0;
class HpCommand {
    constructor(bot) {
        this.cmdName = 'health';
        this.bot = bot;
    }
    execute() {
        this.bot.terminal.log(`❤ Health: ${this.bot.health} | 🍗 Food: ${this.bot.food} | 🫧 Oxygen: ${this.bot.oxygenLevel}`);
        return null;
    }
}
exports.HpCommand = HpCommand;
