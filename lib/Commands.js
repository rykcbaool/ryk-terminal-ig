"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuffer = exports.Command = void 0;
const AsyncCommand_1 = require("./commands/AsyncCommand");
const SayCommand_1 = require("./commands/SayCommand");
const WaitCommand_1 = require("./commands/WaitCommand");
const GotoCommand_1 = require("./commands/GotoCommand");
const QuitCommand_1 = require("./commands/QuitCommand");
const GetPosCommand_1 = require("./commands/GetPosCommand");
const POSCommand_1 = require("./commands/POSCommand");
const HelpCommand_1 = require("./commands/HelpCommand");
const InvCommand_1 = require("./commands/InvCommand");
const HpCommand_1 = require("./commands/HpCommand");
class Command {
    constructor(name, args) {
        this.name = name.toLowerCase();
        this.args = args;
    }
    toString() {
        return [this.name, ...this.args].join(' ');
    }
}
exports.Command = Command;
class CommandBuffer {
    constructor(bot) {
        this.buffer = [];
        this.handlers = [];
        this.activeCmd = null;
        this.asyncCmds = [];
        this.pidIncrement = 0;
        this.bot = bot;
        this.bot.on('physicsTick', () => this.update());
        this.addHandler(new SayCommand_1.SayCommand(bot));
        this.addHandler(new WaitCommand_1.WaitCommand(bot));
        this.addHandler(new AsyncCommand_1.AsyncCommand(bot));
        this.addHandler(new GotoCommand_1.GotoCommand(bot));
        this.addHandler(new QuitCommand_1.QuitCommand(bot));
        this.addHandler(new GetPosCommand_1.GetPosCommand(bot));
        this.addHandler(new POSCommand_1.POSCommand(bot));
        this.addHandler(new HelpCommand_1.HelpCommand(bot));
        this.addHandler(new HpCommand_1.HpCommand(bot));
        this.addHandler(new InvCommand_1.InvCommand(bot));
    }
    queue(cmd) {
        const parsedCmd = parseCommand(cmd);
        this.buffer.push(parsedCmd);
    }
    addHandler(cmdHandler) {
        this.handlers.push(cmdHandler);
    }
    getHandler(cmdName) {
        cmdName = cmdName.toLowerCase();
        for (const handler of this.handlers) {
            if (handler.cmdName === cmdName) {
                return handler;
            }
        }
        return null;
    }
    runAsyncCommand(cmd) {
        const parsedCmd = parseCommand(cmd);
        const handler = this.getHandler(parsedCmd.name);
        if (handler == null) {
            this.bot.terminal.log('Unknown command: ' + parsedCmd.name);
            return;
        }
        const exec = handler.execute(parsedCmd.args, this.pidIncrement++);
        if (exec == null)
            return;
        if ('begin' in exec) {
            exec.begin();
        }
        this.asyncCmds.push(exec);
        if ('pid' in exec) {
            this.bot.terminal.log('Started Async Process. PID: ' + exec.pid.toString());
        }
        if ('pid' in exec) {
            this.bot.terminal.addProcess('PID ' + exec.pid.toString() + ' : ' + parsedCmd.toString());
        }
    }
    finishAsyncCommand(exec) {
        exec.cleanup();
        const index = this.asyncCmds.indexOf(exec);
        this.asyncCmds.splice(index, 1);
        this.bot.terminal.removeProcess(index);
        this.bot.terminal.log('Finished Async Process. PID ' + exec.pid.toString());
    }
    update() {
        for (let i = this.asyncCmds.length - 1; i >= 0; i--) {
            if (this.asyncCmds[i].isRunning())
                continue;
            this.finishAsyncCommand(this.asyncCmds[i]);
        }
        if (this.activeCmd == null) {
            this.triggerNextCmd();
            return;
        }
        if (!'isRunning' in this.activeCmd && this.activeCmd.isRunning()) {
            if ('cleanup' in this.activeCmd) {
                this.activeCmd.cleanup();
            }
            this.activeCmd = null;
        }
    }
    triggerNextCmd() {
        const next = this.buffer.shift();
        if (next == null) {
            this.bot.terminal.finishCommand();
            return;
        }
        this.bot.terminal.enterCommand(next.toString());
        const handler = this.getHandler(next.name);
        if (handler == null) {
            this.bot.terminal.log('Unknown command: ' + next.name);
            return;
        }
        this.activeCmd = handler.execute(this.parsedCmd.args, this.pidIncrement++);
        if (this.activeCmd != null) {
            if ('begin' in this.activeCmd) {
                this.activeCmd.begin();
            }
        }
    }
}
exports.CommandBuffer = CommandBuffer;
function parseCommand(cmd) {
    const args = cmd.split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const name = args.splice(0, 1)[0];
    return new Command(name, args);
}
