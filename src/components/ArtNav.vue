<!-- @TODO: temporary component, remove this -->
<script setup lang="ts">
import { ref } from "vue";
import ELogo from "./ELogo.vue";
import ENav from "./ENav.vue";
import ELiveButton from "./ELiveButton.vue";

const navItems = [
  {
    name: "Lavastused",
    path: "/lavastused",
  },
  {
    name: "Projektid",
    path: "/projektid",
  },
  {
    name: "Kava",
    path: "/kava",
  },
  {
    name: "Meist",
    path: "/meist",
  },
  {
    name: "ENG",
    path: "/en",
  },
];

const navState = ref(false);
</script>

<template>
  <header class="ArtNav">
    <div class="topBar">
      <RouterLink to="/" class="homeButton">
        <ELogo el="span" />
      </RouterLink>
    </div>
    <ENav :class="{ navActive: navState }" :nav-items="navItems" />
    <ELiveButton />
    <!-- @TODO: Add proper icon you html hacker :) -->
    <button class="toggleNav" @click="navState = !navState">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
</template>

<style scoped>
.ArtNav {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--h-9);
  border: var(--border-DEFAULT) solid var(--gray-500);
  background-color: var(--bg);
}
.homeButton {
  display: inline-block;
  color: var(--gray-300);
  padding: var(--p-1) var(--p-3);
}
.toggleNav {
  display: grid;
  row-gap: 4px;
  width: var(--w-7);
  margin: var(--p-1) var(--p-3);
}
.toggleNav span {
  width: 100%;
  height: 2px;
  background-color: var(--gray-300);
}
/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .ENav.navActive {
    display: flex;
  }
}
@media only screen and (max-width: 999px) {
  .ENav {
    display: none;
  }
  .ENav.navActive {
    display: grid;
    position: fixed;
    top: var(--h-9);
    width: 100%;
    margin-top: calc(var(--border-DEFAULT) * -1);
    z-index: 100;
  }
}
@media only screen and (min-width: 600px) {
  .homeButton {
    min-width: 8rem;
  }
}
@media only screen and (min-width: 1000px) {
  .ArtNav {
    display: flex;
  }
  .ENav {
    flex-grow: 1;
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
  .homeButton {
    min-width: 10rem;
  }
  .toggleNav {
    display: none;
  }
}
</style>
