import type { Directive } from 'vue';

const clickOutside = <Directive>{
  mounted(element, binding) {
    const { value } = binding;

    element.clickOutside = function(event: Event) {
      if (!(element == event.target || element.contains(event.target))) {
        value(event);
      }
    }

    window.addEventListener('click', element.clickOutside, { capture: true });
  },
  unmounted(element) {
    window.removeEventListener('click', element.clickOutside);
  }
};

export { clickOutside };
