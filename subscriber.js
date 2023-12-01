import { promises as fs } from 'fs'
import redis from './src/clients/redis.js'
import test from './src/clients/channels/test.js'
import telegram from './src/clients/channels/telegram.js'

redis.subscribe('notifications', async (message) => {
  message = JSON.parse(message)

  switch (message.channel) {
    case 'test':
      test(message)
      break;
    case 'telegram':
      let text = await fs.readFile(`./src/templates/telegram/${message.template}.template`, 'utf8')
      text = text.replace(/{{ ([A-z0-9_-]+) }}/g, function (str, match) {
        return message.data[match]
      })
      telegram(message.receiver.telegram_id, text)
  }
})
