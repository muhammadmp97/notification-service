import { promises as fs } from 'fs'

const render = async (channel, template, data) => {
  let text = await fs.readFile(`./src/templates/${channel}/${template}.template`, 'utf8')

  // Supporting loops
  text = text.replace(/@foreach\((\S+) as (\S+)\)([\n]*)(.*)([\n]*)@endforeach\(\)/g, function (str, itterable, element, beforeContent, content, afterContent) {
    let output = ''
    let index = 0
    for (let el of data[itterable]) {
      output += content.replaceAll(element, `${itterable}[${index}]`) + afterContent
      index++
    }

    return output
  })

  text = text.replace(/{{ ([A-z0-9._-]+) }}/g, function (str, match) {
    return eval(`data.${match}`)
  })

  return text
}

export default render
