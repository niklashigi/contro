import { promises as fs } from 'fs'
import * as path from 'path'
import { buttonMap } from '../src/maps/gamepad'
import { keyMap } from '../src/maps/keyboard'

function generateMappingDocs() {
  generateKeyboardKeyDocs()
  generateGamepadButtonDocs()
}

/**
 * Generates a table documenting the valid keyboard key values, aliases and
 * the respective labels based on the key value specified in the `keyMap`.
 */
async function generateKeyboardKeyDocs() {

  const lines: string[] = []
  for (const keyValue in keyMap) {
    const keyAliases = keyMap[keyValue]
    const keyLabel = keyAliases[0]
    lines.push([
      `\`${keyValue}\``,
      `<kbd>${keyLabel}</kbd>`,
      `${keyAliases.map(keyAlias => `\`${keyAlias}\``).join(' , ')}`,
    ].join('|'))
  }

  saveLines('keyboard-keys.md', lines)

}

/**
 * Generates a table documenting the valid gamepad button numbers, aliases and
 * respective labels based on the button numbers specified in the `buttonMap`.
 */
async function generateGamepadButtonDocs() {

  const lines: string[] = []
  let buttonNumber = 0
  for (const buttonAliases of buttonMap) {
    const buttonLabel = buttonAliases[0]
    lines.push([
      `\`${buttonNumber}\``,
      `<kbd>${buttonLabel}</kbd>`,
      `${buttonAliases.map(buttonAlias => `\`${buttonAlias}\``).join(' , ')}`,
    ].join('|'))
    buttonNumber++
  }

  saveLines('gamepad-buttons.md', lines)

}

async function saveLines(file: string, lines: string[]) {

  const filePath = path.join(__dirname, '../docs', file)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const newFileContent = fileContent.replace(
    /(---\|---\|---\n)([\s\S]*)(\n\n)/gm,
    `$1${lines.join('\n')}$3`,
  )
  await fs.writeFile(filePath, newFileContent)

}

generateMappingDocs()
