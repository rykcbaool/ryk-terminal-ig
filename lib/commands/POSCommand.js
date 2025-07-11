"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSCommand = void 0;
class POSCommand {
    constructor(bot) {
        this.cmdName = 'coords';
        this.bot = bot;
    }
    execute() {
        const pos = this.bot.entity.position;
        this.bot.terminal.log(`Bot position: X=${pos.x.toFixed(1)} Y=${pos.y.toFixed(1)} Z=${pos.z.toFixed(1)}`);
        return null;
    }
}
exports.POSCommand = POSCommand;
