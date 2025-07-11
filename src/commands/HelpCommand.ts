import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'

export class HelpCommand implements CommandHandler {
    private readonly bot: Bot
    readonly cmdName = 'help'

    constructor(bot: Bot) {
        this.bot = bot
    }

    execute(args: string[]): CommandExecution | null {
        const commands = ['help', 'say', 'quit', 'kit', 'coords', 'inv', 'health']
        this.bot.terminal.log(`Available commands: ${commands.join(', ')}`)
        return null
    }
}
