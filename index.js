import 'dotenv/config'
import express from 'express'
import redis from './src/clients/redis.js'

const app = express()

app.get('/test', async (req, res) => {
  const result = await redis.publish('notifications', JSON.stringify({
    channel: 'test',
    data: {
      text: 'This is a test message!'
    }
  }))

  res.send(result ? 'You should receive a message...' : 'Something went wrong!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 3000}`)
})
