import 'dotenv/config'
import telegram from './telegram.js'

const test = (message) => {
  telegram(process.env.TELEGRAM_TEST_ID, message.data.text)
}

export default test
