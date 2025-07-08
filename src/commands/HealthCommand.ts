import { Bot } from 'mineflayer'
import { CommandHandler, CommandExecution } from '../Commands'

export class HealthCommand implements CommandHandler {
  private readonly bot: Bot
  readonly cmdName = 'health'

  constructor(bot: Bot) {
    this.bot = bot
  }

  execute(args: string[]): CommandExecution | null {
    const health = this.bot.health
    this.bot.terminal?.log(`Health: ${health} hearts`)
    return null
  }
}
