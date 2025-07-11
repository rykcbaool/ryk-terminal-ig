"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPosCommand = void 0;
class GetPosCommand {
    constructor(bot) {
        this.cmdName = 'get_pos';
        this.bot = bot;
    }
    execute(args, number) {
        if (args.length === 0) {
            const pos = this.bot.entity.position;
            const x = String(Math.floor(pos.x));
            const y = String(Math.floor(pos.y));
            const z = String(Math.floor(pos.z));
            this.bot.terminal.log('Pos: ' + x + ', ' + y + ', ' + z);
        }
        else {
            this.bot.terminal.log('Usage: get_pos');
        }
        return null;
    }
}
exports.GetPosCommand = GetPosCommand;
