import redis from './src/clients/redis.js'
import render from './src/template-renderer.js'
import test from './src/clients/channels/test.js'
import telegram from './src/clients/channels/telegram.js'

redis.subscribe('notifications', async (message) => {
  message = JSON.parse(message)

  switch (message.channel) {
    case 'test':
      test(message)
      break
    case 'telegram':
      telegram(message.receiver.telegram_id, await render(message.channel, message.template, message.data))
      break
  }
})
