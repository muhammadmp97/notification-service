import redis from './src/clients/redis.js'
import test from './src/clients/channels/test.js'

redis.subscribe('notifications', (message) => {
  message = JSON.parse(message)

  switch (message.channel) {
    case 'test':
      test(message)
      break;
  }
})
