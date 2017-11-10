export const colors = [
  '#2FEFEF', // 1.0
  '#48F0C0', // 0.9
  '#00EF47', // 0.8
  '#00F000', // 0.7
  '#8FEF2F', // 0.6
  '#EFEF00', // 0.5
  '#D77700', // 0.4
  '#F06000', // 0.3
  '#F04800', // 0.2
  '#D73000', // 0.1
  '#F00000', // 0.0
]

export const secToHex = systemSec => {
  return colors.reduce((memo, hex, index) => {
    // index=0, sec = 1.0
    // index=1, sec = 0.9
    // index=2, sec = 0.8
    const sec = 1 - (index/10)
    return systemSec > sec ? memo : hex
  }, '#000')
}
