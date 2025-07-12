import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'



export class POSCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'coords'

    constructor(bot: Bot) {
        this.bot = bot
    }

    execute(args?: string[], number?: number): CommandExecution | null {
        const pos = this.bot.entity.position
        const coords = `X=${pos.x.toFixed(1)} Y=${pos.y.toFixed(1)} Z=${pos.z.toFixed(1)}`

        if (args?.[0] === 'test') {
            this.bot.terminal.log(`Bot position: ${coords}`)

        } else {
            this.bot.terminal.log(`Bot position: ${coords}`)
        }

        return null
    }
}