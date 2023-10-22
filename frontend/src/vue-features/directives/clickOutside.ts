import type { Directive } from 'vue';

const clickOutside = <Directive>{
  mounted(element, binding) {
    const { value } = binding;

    element.clickOutside = function(event: Event) {
      if (!element || element === event.target || event.composedPath().includes(element)) {
        return;
      }

      value(event);
    }

    window.addEventListener('click', element.clickOutside, { passive: true, capture: true });
  },
  unmounted(element) {
    window.removeEventListener('click', element.clickOutside);
  }
};

export { clickOutside };
