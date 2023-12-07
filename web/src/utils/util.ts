import { useUserStore } from '@/store/user'

export function hex2Rgb(color: string) {
  color = color.replace('#', '')
  const result: any = color.match(/../g)
  for (let i = 0; i < 3; i++) {
    result[i] = parseInt(result[i], 16)
  }
  return result
}

export function rgb2Hex(r: number, g: number, b: number) {
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = '0' + hexs[i]
    }
  }
  const result = '#' + hexs.join('')
  return result
}

export function lighten(color: string, level: number) {
  const rgb = hex2Rgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  }
  const result = rgb2Hex(rgb[0], rgb[1], rgb[2])
  return result
}

export function darken(color: string, level: number) {
  const rgb = hex2Rgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level))
  }
  const result = rgb2Hex(rgb[0], rgb[1], rgb[2])
  return result
}

export const changeTheme = (value: string) => {
  const el = document.documentElement
  el.style.setProperty(`--el-color-primary`, value)
  for (let i = 1; i <= 9; i++) {
    el.style.setProperty(`--el-color-primary-light-${i}`, lighten(value, i / 10))
    el.style.setProperty(`--el-color-primary-dark-${i}`, darken(value, i / 10))
  }
  localStorage.setItem('themeColor', value)
  const store = useUserStore()
  store.setThemeColor(value)
}
