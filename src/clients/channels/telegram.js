import 'dotenv/config'
import axios from 'axios'

const telegram = (chatId, text) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`

  const data = {
    chat_id: chatId,
    text: text,
    parse_mode: 'html'
  }

  axios.post(url, data)
    .then(res => {
      return true
    })
    .catch(err => {
      return false
    })
}

export default telegram
