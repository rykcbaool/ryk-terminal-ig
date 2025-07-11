"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCommand = void 0;
class HealthCommand {
    constructor(bot) {
        this.cmdName = 'health';
        this.bot = bot;
    }
    execute(args, number) {
        var _a;
        const health = this.bot.health;
        (_a = this.bot.terminal) === null || _a === void 0 ? void 0 : _a.log(`Health: ${health} hearts`);
        return null;
    }
}
exports.HealthCommand = HealthCommand;
