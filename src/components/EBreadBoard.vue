<template>
  <div class="EBreadBoard">
    <slot />
  </div>
</template>

<style scoped>
.EBreadBoard {
  --pin-size: 1px;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: repeating-linear-gradient(
      0.25turn,
      transparent var(--pin-size),
      var(--gray-700) var(--pin-size),
      var(--gray-700) calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) + var(--pin-size))
    ),
    repeating-linear-gradient(
      transparent var(--pin-size),
      var(--gray-700) var(--pin-size),
      var(--gray-700) calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) + var(--pin-size))
    ),
    repeating-linear-gradient(var(--gray-500), var(--gray-500));
}

@media only screen and (min-width: 900px) {
}
</style>
