"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitCommand = void 0;
const vec3_1 = require("vec3");
const mineflayer_pathfinder_1 = require("mineflayer-pathfinder");
const { GoalNear } = mineflayer_pathfinder_1.goals;
const kitChests = {
    pvp: { x: 106165, y: 64, z: -393410 },
    redstone: { x: 106171, y: 64, z: -393398 },
    exp: { x: 106169, y: 64, z: -393403 },
    totem: { x: 106169, y: 65, z: -393403 },
    refill: { x: 106167, y: 64, z: -393410 }
};
class KitCommand {
    constructor(bot) {
        this.cmdName = 'kit';
        this.bot = bot;
    }
    execute(args) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const kitNameArg = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (!kitNameArg || !(kitNameArg in kitChests)) {
                (_b = this.bot.terminal) === null || _b === void 0 ? void 0 : _b.log(`Invalid kit name. Available: ${Object.keys(kitChests).join(', ')}`);
                return;
            }
            const kitName = kitNameArg;
            const chestPos = kitChests[kitName];
            const goal = new GoalNear(chestPos.x, chestPos.y, chestPos.z, 1);
            try {
                const defaultMove = new mineflayer_pathfinder_1.Movements(this.bot);
                this.bot.pathfinder.setMovements(defaultMove);
                yield this.bot.pathfinder.goto(goal);
                const chestBlock = this.bot.blockAt(new vec3_1.Vec3(chestPos.x, chestPos.y, chestPos.z));
                if ((chestBlock == null) || chestBlock.name !== 'chest') {
                    (_c = this.bot.terminal) === null || _c === void 0 ? void 0 : _c.log('❌ Chest not found at location.');
                    return;
                }
                const chest = yield this.bot.openContainer(chestBlock);
                const items = chest.containerItems().filter(i => i.name.includes('shulker_box'));
                for (let i = 0; i < Math.min(1, items.length); i++) {
                    yield chest.withdraw(items[i].type, null, 1);
                }
                yield chest.close();
                this.bot.chat(`/msg ${this.bot.username} ✅ Kit "${kitName}" collected.`);
            }
            catch (err) {
                (_d = this.bot.terminal) === null || _d === void 0 ? void 0 : _d.log(`❌ Error getting kit: ${err instanceof Error ? err.message : String(err)}`);
            }
        });
    }
}
exports.KitCommand = KitCommand;
