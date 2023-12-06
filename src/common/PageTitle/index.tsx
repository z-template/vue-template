export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => (
      <div class="bg-white px-5 py-4">
        <h3 class="text-22px font-500 leading-28px">{props.title}</h3>
        {props.description && <div class="mt-2 text-color/60">{props.description}</div>}
      </div>
    )
  }
})
