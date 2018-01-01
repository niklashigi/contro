/**
 * A map of all the supported button numbers (array indices) and their
 * respective aliases (the strings in the arrays) that can be used with the
 * `Gamepad` class. The first alias for each button will be used as a label.
 */
export const buttonMap = [
  ['A'],
  ['B'],
  ['X'],
  ['Y'],
  ['Left Bumper', 'LB'],
  ['Right Bumper', 'RB'],
  ['Left Trigger', 'LT'],
  ['Right Trigger', 'RT'],
  ['Back', 'View'],
  ['Start'],
  ['Left Stick'],
  ['Right Stick'],
  ['Up', 'DpadUp'],
  ['Down', 'DpadDown'],
  ['Left', 'DpadLeft'],
  ['Right', 'DpadRight'],
  ['Home', 'Guide', 'Xbox'],
]

export function findButtonNumber(button: string | number): number {
  if (typeof button === 'number') return button
  let buttonNumber = 0
  for (const buttonAliases of buttonMap) {
    for (const buttonAlias of buttonAliases) {
      if (button.toLowerCase() === buttonAlias.toLowerCase()) {
        return buttonNumber
      }
    }
    buttonNumber++
  }
}

export function getButtonLabel(button: number): string {
  return buttonMap[button][0]
}
