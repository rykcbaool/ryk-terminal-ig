import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'


export class HpCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'health'

    constructor(bot: Bot) {
        this.bot = bot
    }

    execute(): CommandExecution | null {
        this.bot.terminal.log(`❤ Health: ${this.bot.health} | 🍗 Food: ${this.bot.food} | 🫧 Oxygen: ${this.bot.oxygenLevel}`)
        return null
    }
}
