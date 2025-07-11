import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'



export class POSCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'coords'

    constructor(bot: Bot) {
        this.bot = bot
    }

    execute(): CommandExecution | null {
        const pos = this.bot.entity.position
        this.bot.terminal.log(`Bot position: X=${pos.x.toFixed(1)} Y=${pos.y.toFixed(1)} Z=${pos.z.toFixed(1)}`)
        return null
    }
}