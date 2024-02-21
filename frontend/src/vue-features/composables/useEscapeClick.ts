export function useEscapeClick(callback: Function) {
  function keyDownEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      callback();
      removeEventEscape();
    }
  }

  function addEventEscape() {
    window.addEventListener('keydown', keyDownEscape);
  }

  function removeEventEscape() {
    window.removeEventListener('keydown', keyDownEscape);
  }

  return {
    addEventEscape,
    removeEventEscape,
  };
}
