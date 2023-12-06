import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

function withOpacityValue(variable: any) {
  return `rgb(var(${variable}))`
}

function toWith(d: string) {
  const num = Number(d)
  if (Number.isInteger(num)) {
    if (num === 0) return 0
    return `${d / 4}rem`
  } else if (['px', 'rem', 'vh', 'vw'].some(x => d.endsWith(x))) {
    return d
  }
}
export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  theme: {
    colors: {
      primary: '#4DB87F',
      danger: '#FF4D4F',
      color: withOpacityValue('--color-default') // '#000000D9' // 默认文字颜色rgba(0,0,0,.85); 其他色值可用 text-theme/60, text-theme/50等,
    },
    // 基于figma官网尺寸修改，对应字号默认行高，建议保留
    fontSize: {
      '12px': ['12px', '17px'],
      '13px': ['12px', '18px'],
      '14px': ['14px', '20px'],
      '15px': ['15px', '21px'],
      '16px': ['16px', '22px'],
      '17px': ['17px', '24px'],
      '18px': ['18px', '25px'],
      '20px': ['20px', '28px'],
      '22px': ['22px', '31px'],
      '23px': ['23px', '32px'],
      '24px': ['24px', '34px'],
      '26px': ['26px', '36px'],
      '28px': ['28px', '40px']
    }
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between'
  },
  rules: [
    [
      /^size-(.*)$/,
      ([, d]) => {
        if (Number(d)) return { width: `${d / 4}rem`, height: `${d / 4}rem` }
        else if (['px', 'rem', 'vh', 'vw'].some(x => d.endsWith(x))) return { width: d, height: d }
      }
    ],
    // p-2-3-4-5 => padding: 0.5rem 0.75rem 1rem 1.25rem
    [
      /^p-(\d+)(?:-(\d+)(?:-(\d+)(?:-(\d+))?)?)?$/,
      ([, t, r, b, l]) => {
        // 如果只有一个数字，就返回null
        if (r || b || l) {
          // 用函数返回对应的CSS属性和值
          // 如果没有指定右、下、左的值，就用上的值代替
          r = r || t
          b = b || t
          l = l || r
          return {
            padding: `${toWith(t)} ${toWith(r)} ${toWith(b)} ${toWith(l)}`
          }
        }
      }
    ],
    // m-2-3-4-5 => margin: 0.5rem 0.75rem 1rem 1.25rem
    [
      /^m-(.*)$/,
      ([, d]) => {
        const arr = d.split('-')
        if (arr.length === 4) {
          return {
            margin: `${toWith(arr[0])} ${toWith(arr[1])} ${toWith(arr[2])} ${toWith(arr[3])}`
          }
        } else if (arr.length === 3) {
          return {
            margin: `${toWith(arr[0])} ${toWith(arr[1])} ${toWith(arr[2])}`
          }
        } else if (arr.length === 2) {
          return {
            margin: `${toWith(arr[0])} ${toWith(arr[1])}`
          }
        }
      }
    ]
  ]
})
