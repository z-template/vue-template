import { Badge } from 'vant'

export default defineComponent({
  props: {
    dot: Boolean,
    content: [Number, String],
    size: {
      type: String,
      default: '14px'
    },
    color: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: Event) => {
      emit('click', event)
    }

    function addUnit(value: string | number): string | undefined {
      if (typeof value === 'number') return `${value}px`

      return value
    }

    return () => {
      const { name, color, size, dot, content, fill } = props
      const curSize = addUnit(size)
      return (
        <Badge dot={dot} content={content} class="van-icon" onClick={handleClick}>
          <svg
            style={{ width: curSize, height: curSize, color, fill: fill ? '' : 'currentColor' }}
            class={`svg-icon ${fill}`}
          >
            <use xlinkHref={`#icon-${name}`} />
          </svg>
        </Badge>
      )
    }
  }
})
