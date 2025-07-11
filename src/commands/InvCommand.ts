import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'

export class InvCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'inv'

    constructor(bot: Bot) {
        this.bot = bot
    }

    execute(): CommandExecution | null {
        const items = this.bot.inventory.items().map(item => `${item.name} x${item.count}`)
        this.bot.terminal.log(`Inventory: ${items.join(', ') || 'Empty'}`)
        return null
    }
}
