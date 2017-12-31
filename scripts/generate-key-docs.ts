import * as fs from 'fs-extra'
import * as path from 'path'
import { keyMap } from '../src/values/keys'

/**
 * Generates a table documenting the valid keyboard key values, aliases and
 * the respective labels based on the key value specified in the `keyMap`.
 */
async function generateKeyDocs() {

  const filePath = path.join(__dirname, '../docs/keys.md')
  const fileContent = await fs.readFile(filePath, 'utf-8')

  const tableLines: string[] = []
  for (const keyValue in keyMap) {
    const keyAliases = keyMap[keyValue]
    const keyLabel = keyAliases[0]
    tableLines.push([
      `\`${keyValue}\``,
      `<kbd>${keyLabel}</kbd>`,
      `${keyAliases.map(keyAlias => `\`${keyAlias}\``).join(' , ')}`,
    ].join('|'))
  }

  const newFileContent = fileContent.replace(
    /(---\|---\|---\n)([\s\S]*)(\n\n)/gm,
    `$1${tableLines.join('\n')}$3`,
  )
  await fs.writeFile(filePath, newFileContent)

}

generateKeyDocs()
