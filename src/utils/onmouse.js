
const copy = {
  mounted (el, { value }) {
    console.log(el);
  },
  beforeUpdate (el, {
    value
  }) {
    el.$value = value;
  },
  unmounted (el) {
    el.removeEventListener("click", el.handler);
  }
};

export default copy;