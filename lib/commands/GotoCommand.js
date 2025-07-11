"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GotoCommand = void 0;
const mineflayer_pathfinder_1 = require("mineflayer-pathfinder");
class GotoCommand {
    constructor(bot) {
        this.cmdName = 'goto';
        this.bot = bot;
    }
    execute(args, pid) {
        if (args.length === 0)
            return this.printUsage();
        switch (args[0].toLowerCase()) {
            case 'pos': return this.parsePos(args, pid);
            case 'xz': return this.parseXZ(args, pid);
            case 'y': return this.parseY(args, pid);
            default: return this.printUsage();
        }
    }
    printUsage() {
        this.bot.terminal.log('Usage: goto pos <x> <y> <z> <range>');
        this.bot.terminal.log('     : goto xz <x> <z> <range>');
        this.bot.terminal.log('     : goto y <y>');
        return null;
    }
    warnNan(arg) {
        this.bot.terminal.log('Error: \'' + arg + '\' is not a number!');
        return null;
    }
    parsePos(args, pid) {
        if (args.length !== 5)
            return this.printUsage();
        const x = parseInt(args[1]);
        const y = parseInt(args[2]);
        const z = parseInt(args[3]);
        const r = parseInt(args[4]);
        if (Number.isNaN(x))
            return this.warnNan(args[1]);
        if (Number.isNaN(y))
            return this.warnNan(args[2]);
        if (Number.isNaN(z))
            return this.warnNan(args[3]);
        if (Number.isNaN(r))
            return this.warnNan(args[4]);
        const goal = new mineflayer_pathfinder_1.goals.GoalNear(x, y, z, r);
        return new GotoExecution(this.bot, pid, goal);
    }
    parseXZ(args, pid) {
        if (args.length !== 4)
            return this.printUsage();
        const x = parseInt(args[1]);
        const z = parseInt(args[2]);
        const r = parseInt(args[3]);
        if (Number.isNaN(x))
            return this.warnNan(args[1]);
        if (Number.isNaN(z))
            return this.warnNan(args[2]);
        if (Number.isNaN(r))
            return this.warnNan(args[3]);
        const goal = new mineflayer_pathfinder_1.goals.GoalNearXZ(x, z, r);
        return new GotoExecution(this.bot, pid, goal);
    }
    parseY(args, pid) {
        if (args.length !== 2)
            return this.printUsage();
        const y = parseInt(args[1]);
        if (Number.isNaN(y))
            return this.warnNan(args[1]);
        const goal = new mineflayer_pathfinder_1.goals.GoalY(y);
        return new GotoExecution(this.bot, pid, goal);
    }
}
exports.GotoCommand = GotoCommand;
class TemporaryEvent {
    constructor(bot, event, callback) {
        this.bot = bot;
        this.event = event;
        this.callback = callback;
        this.bot.on(event, callback);
    }
    cleanup() {
        this.bot.removeListener(this.event, this.callback);
    }
}
class GotoExecution {
    constructor(bot, pid, goal) {
        this.events = [];
        this.running = true;
        this.bot = bot;
        this.goal = goal;
        this.pid = pid;
    }
    begin() {
        this.bot.pathfinder.setGoal(this.goal, false);
        this.events.push(new TemporaryEvent(this.bot, 'goal_reached', () => {
            this.running = false;
        }));
        this.events.push(new TemporaryEvent(this.bot, 'goal_updated', () => {
            if (this.running)
                this.error('goal changed unexpectedly');
        }));
        this.events.push(new TemporaryEvent(this.bot, 'path_stop', () => {
            if (this.running)
                this.error('path force stopped');
        }));
        this.events.push(new TemporaryEvent(this.bot, 'path_update', path => {
            if (!this.running)
                return;
            if (path.status === 'noPath')
                this.error('no path found');
            if (path.status === 'timeout')
                this.error('calculation timed out');
        }));
    }
    cancel() {
        this.running = false;
        this.bot.pathfinder.setGoal(null);
    }
    isRunning() {
        return this.running;
    }
    cleanup() {
        this.running = false;
        for (const event of this.events)
            event.cleanup();
    }
    error(message) {
        this.bot.terminal.warn('PID ' + String(this.pid) + ' failed; ' + message);
        this.running = false;
    }
}
