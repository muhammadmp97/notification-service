import { createClient } from 'redis'
import 'dotenv/config'

const redis = await createClient({ socket: { host: process.env.REDIS_HOST } })
  .on('error', err => {
    console.error('Redis Client Error', err)
  })
  .connect()

export default redis
