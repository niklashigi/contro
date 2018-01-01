/**
 * A map of all the supported key values (property names) and their respective
 * aliases (property values)  that can be used with the `Keyboard` class. The
 * first alias for each key value will be used as a label.
 */
export const keyMap: { [value: string]: string[] } = {
  ' ': ['Space', 'Spacebar', 'Space Bar'],
  'AltGraph': ['Alet Gr'],
  'ArrowDown': ['Down'],
  'ArrowLeft': ['Left'],
  'ArrowRight': ['Right'],
  'ArrowUp': ['Up'],
  'Backspace': ['Backspace'],
  'Control': ['Ctrl', 'Ctl'],
  'Delete': ['Delete', 'Del'],
  'Enter': ['Enter', 'Return'],
  'Escape': ['Escape', 'Esc'],
  'Insert': ['Insert', 'Ins'],
  'PageDown': ['Page Down', 'PgDown'],
  'PageUp': ['Page Up', 'PgUp'],
  'Tab': ['Tab'],
}

export function findKeyValue(keyString: string): string {
  if (keyString.length === 1) return keyString
  for (const keyValue in keyMap) {
    for (const key of keyMap[keyValue]) {
      if (keyString.toLowerCase() === key.toLowerCase()) {
        return keyValue
      }
    }
  }
  return keyString
}

export function getKeyLabel(key: string): string {
  return key in keyMap ? keyMap[key][0] : (key.length === 1 ? key.toUpperCase() : key)
}
