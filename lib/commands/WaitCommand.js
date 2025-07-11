"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitCommand = void 0;
class WaitCommand {
    constructor(bot) {
        this.cmdName = 'wait';
        this.bot = bot;
    }
    execute(args, pid) {
        if (args.length !== 1) {
            this.bot.terminal.log('Usage: wait <seconds>');
            return null;
        }
        const seconds = parseFloat(args[0]);
        if (Number.isNaN(seconds)) {
            this.bot.terminal.log('Error: \'' + args[0] + '\' is not a number!');
            return null;
        }
        return new WaitExecution(seconds, pid);
    }
}
exports.WaitCommand = WaitCommand;
class WaitExecution {
    constructor(waitTime, pid) {
        this.endTime = 0;
        this.waitTime = waitTime;
        this.pid = pid;
    }
    begin() {
        this.endTime = Date.now() + this.waitTime * 1000.0;
    }
    cancel() {
        this.endTime = 0;
    }
    isRunning() {
        return Date.now() < this.endTime;
    }
    cleanup() { }
}
