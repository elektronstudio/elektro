<template>
  <RouterLink to="/" active-class="font-bold">Index</RouterLink>
  &nbsp;
  <RouterLink to="/css" active-class="font-bold">CSS approaches</RouterLink>
  &nbsp;
  <RouterLink to="/test" active-class="font-bold">Test</RouterLink>
  <p class="h-8" />
  <router-view />
</template>

<style>
body {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 32px;
  box-sizing: border-box;
}
</style>
