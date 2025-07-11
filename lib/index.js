"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const UserInterface_1 = require("./UserInterface");
const mineflayer_pathfinder_1 = require("mineflayer-pathfinder");
function plugin(bot) {
    bot.terminal = new UserInterface_1.UserInterface(bot);
    setTimeout(() => {
        if (bot.pathfinder == null)
            bot.loadPlugin(mineflayer_pathfinder_1.pathfinder);
    });
}
exports.plugin = plugin;
