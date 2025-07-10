import { Bot } from 'mineflayer'
import { Vec3 } from 'vec3'
import { Movements, goals } from 'mineflayer-pathfinder'
const { GoalNear } = goals
import { CommandHandler } from '../types'


// code start here


const kitChests = {
    pvp: { x: 106165, y: 64, z: -393410 },
    redstone: { x: 106171, y: 64, z: -393398 },
    exp: { x: 106169, y: 64, z: -393403 },
    totem: { x: 106169, y: 65, z: -393403 },
    refill: { x: 106167, y: 64, z: -393410 },
} as const

type KitName = keyof typeof kitChests

export class KitCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'kit'

    constructor(bot: Bot) {
        this.bot = bot
    }


    // @ts-ignore
    async execute(args: string[]): Promise<void> {
        const kitNameArg = args[0]?.toLowerCase()

        // Type-safe check
        if (!kitNameArg || !(kitNameArg in kitChests)) {
            this.bot.terminal?.log(`Invalid kit name. Available: ${Object.keys(kitChests).join(', ')}`)
            return
        }

        // Safely cast the string to the correct key type
        const kitName = kitNameArg as KitName
        const chestPos = kitChests[kitName]
        const goal = new GoalNear(chestPos.x, chestPos.y, chestPos.z, 1)

        try {
            const defaultMove = new Movements(this.bot)
            this.bot.pathfinder.setMovements(defaultMove)
            await this.bot.pathfinder.goto(goal)

            const chestBlock = this.bot.blockAt(new Vec3(chestPos.x, chestPos.y, chestPos.z))
            if (!chestBlock || chestBlock.name !== 'chest') {
                this.bot.terminal?.log('❌ Chest not found at location.')
                return
            }

            const chest = await this.bot.openContainer(chestBlock)
            const items = chest.containerItems().filter(i => i.name.includes('shulker_box'))

            for (let i = 0; i < Math.min(1, items.length); i++) {
                await chest.withdraw(items[i].type, null, 1)
            }

            await chest.close()
            this.bot.chat(`/msg ${this.bot.username} ✅ Kit "${kitName}" collected.`)
        } catch (err) {
            this.bot.terminal?.log(`❌ Error getting kit: ${err instanceof Error ? err.message : String(err)}`)
        }
    }
}
