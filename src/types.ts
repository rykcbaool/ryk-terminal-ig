import { Bot } from 'mineflayer'

export interface CommandContext {
  bot: Bot
  username: string
  args: string[]
}

export interface CommandHandler {
  cmdName: string
  execute: (context: CommandContext) => void | Promise<void>
}
