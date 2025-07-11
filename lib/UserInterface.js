"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterface = void 0;
const blessed_1 = __importDefault(require("blessed"));
const Commands_1 = require("./Commands");
class UserInterface {
    constructor(bot) {
        this.tasks = [];
        this.processes = [];
        this.cmdReady = true;
        this.bot = bot;
        this.commandBuffer = new Commands_1.CommandBuffer(this.bot);
        console.log = m => this.info(m);
        console.warn = m => this.warn(m);
        console.error = m => this.error(m);
        this.bot.on('chat', (username, message) => this.chat(username, message));
        this.bot.on('end', () => {
            this.program.clear();
            this.program.disableMouse();
            this.program.showCursor();
            this.program.normalBuffer();
            process.exit(0);
        });
        this.program = blessed_1.default.program({
            title: 'Mineflayer Bot'
        });
        this.screen = blessed_1.default.screen({
            smartCSR: true,
            program: this.program,
            dockBorders: true,
            terminal: 'ansi',
            title: 'Kidra Terminal'
        });
        this.screen.on('mouse', () => { });
        this.screen.key(['C-c'], () => this.bot.quit());
        this.screen.key(['escape'], () => this.inputBox.focus());
        this.taskBox = blessed_1.default.box({
            top: 0,
            left: 0,
            height: 0,
            width: '100%',
            label: 'Active Tasks',
            border: 'line'
        });
        this.screen.append(this.taskBox);
        this.activeBox = blessed_1.default.box({
            top: 0,
            left: 0,
            height: 0,
            width: '100%',
            label: 'Active Processes',
            border: 'line'
        });
        this.screen.append(this.activeBox);
        this.logBox = blessed_1.default.box({
            height: '100%',
            width: '100%',
            label: 'Log',
            border: 'line',
            scrollable: true,
            alwaysScroll: true,
            scrollbar: {
                ch: '['
            },
            tags: true,
            mouse: true,
            content: '{blink}>{/blink}'
        });
        this.screen.append(this.logBox);
        const inputForm = blessed_1.default.form({
            bottom: 0,
            left: 0,
            width: '100%',
            height: 3
        });
        this.screen.append(inputForm);
        this.inputBox = blessed_1.default.textbox({
            width: '100%',
            height: '100%',
            cursor: 'line',
            cursorBlink: true,
            label: 'Command Input',
            border: 'line',
            inputOnFocus: true
        });
        this.inputBox.on('submit', () => {
            const cmd = this.inputBox.getValue().trim();
            this.inputBox.clearValue();
            this.inputBox.focus();
            this.screen.render();
            this.commandBuffer.queue(cmd);
        });
        inputForm.append(this.inputBox);
        this.resizeBoxes();
        this.inputBox.focus();
    }
    addTask(task) {
        this.tasks.push(task);
        this.taskBox.setContent(this.tasks.join('\n'));
        this.resizeBoxes();
        return this.tasks.length - 1;
    }
    getTask(index) {
        return this.tasks[index];
    }
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.taskBox.setContent(this.tasks.join('\n'));
        this.resizeBoxes();
    }
    addProcess(process) {
        this.processes.push(process);
        this.activeBox.setContent(this.processes.join('\n'));
        this.resizeBoxes();
        return this.processes.length - 1;
    }
    getProcess(index) {
        return this.processes[index];
    }
    removeProcess(index) {
        this.processes.splice(index, 1);
        this.activeBox.setContent(this.processes.join('\n'));
        this.resizeBoxes();
    }
    chat(username, message) {
        this.log('{white-fg}{bold}<' + username + '>{/bold} ' + message + '{/white-fg}');
    }
    info(message) {
        this.log('{green-fg}{bold}[INFO]{/bold} ' + String(message) + '{/green-fg}');
    }
    warn(message) {
        this.log('{yellow-fg}{bold}[WARN]{/bold} ' + String(message) + '{/yellow-fg}');
    }
    error(message) {
        this.log('{red-fg}{bold}[ERROR]{/bold} ' + String(message) + '{/red-fg}');
    }
    log(message) {
        if (this.cmdReady) {
            const lineCount = this.logBox.getLines().length;
            this.logBox.insertLine(lineCount - 1, message);
        }
        else {
            this.logBox.pushLine(message);
        }
        this.logBox.setScrollPerc(100.0);
        this.resizeBoxes();
    }
    enterCommand(message) {
        const cmdText = '{grey-fg}{bold}>{/bold} ' + message + '{/grey-fg}';
        if (this.cmdReady) {
            const lineCount = this.logBox.getLines().length;
            this.logBox.setLine(lineCount - 1, cmdText);
            this.logBox.setScrollPerc(100.0);
            this.resizeBoxes();
            this.cmdReady = false;
        }
        else {
            this.log(cmdText);
        }
    }
    finishCommand() {
        if (this.cmdReady)
            return;
        this.logBox.pushLine('{blink}>{/blink}');
        this.logBox.setScrollPerc(100.0);
        this.resizeBoxes();
        this.cmdReady = true;
    }
    resizeBoxes() {
        this.taskBox.height = Math.max(1, this.tasks.length) + 2;
        this.activeBox.height = Math.max(1, this.processes.length) + 2;
        this.activeBox.top = this.taskBox.height - 1;
        this.logBox.top = this.activeBox.top + this.activeBox.height - 1;
        this.logBox.height = '100%-' + (this.activeBox.top + this.activeBox.height - 1 + 2).toString();
        this.screen.render();
    }
}
exports.UserInterface = UserInterface;
