import { promises as fs } from 'fs'

const render = async (channel, template, data) => {
  let text = await fs.readFile(`./src/templates/${channel}/${template}.template`, 'utf8')

  return text.replace(/{{ ([A-z0-9_-]+) }}/g, function (str, match) {
    return data[match]
  })
}

export default render
