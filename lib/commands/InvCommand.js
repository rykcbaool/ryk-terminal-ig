"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvCommand = void 0;
class InvCommand {
    constructor(bot) {
        this.cmdName = 'inv';
        this.bot = bot;
    }
    execute() {
        const items = this.bot.inventory.items().map(item => `${item.name} x${item.count}`);
        this.bot.terminal.log(`Inventory: ${items.join(', ') || 'Empty'}`);
        return null;
    }
}
exports.InvCommand = InvCommand;
