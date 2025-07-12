import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'

export class QuitCommand implements CommandHandler {
  private readonly bot: Bot
  readonly cmdName: string = 'quit'

  constructor(bot: Bot) {
    this.bot = bot
  }

  execute(args?: string[], number?: number): CommandExecution | null {
    if (args?.length) {
      this.bot.terminal.log('Usage: quit')
    } else {
      this.bot.quit()
    }
    return null
  }
}
