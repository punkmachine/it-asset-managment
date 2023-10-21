<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  width: 100vw;
  height: 100vh;
}
</style>
