import type { Directive } from 'vue';

const clickOutside = <Directive>{
  mounted(element, binding) {
    const { value } = binding;

    element.clickOutside = function (event: Event) {
      if (element != event.target && !element.contains(event.target) && !event.composedPath().includes(element)) {
        value(event);
      }
    };

    document.body.addEventListener('click', element.clickOutside, { capture: true, passive: true });
  },
  unmounted(element) {
    document.body.removeEventListener('click', element.clickOutside);
  },
};

export { clickOutside };
