<template>
  <div class="EBreadBoard">
    <slot />

    <div class="testGrid">
      <span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>

<style scoped>
.EBreadBoard {
  --pin-size: 1px;
  position: fixed;
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
    repeating-linear-gradient(var(--gray-300), var(--gray-300));
}

.testGrid {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  display: none;
}

.testGrid span {
  display: block;
  height: 100%;
  width: 1px;
  background-color: rgba(255, 0, 0, 0.4);
  z-index: 100;
}
.testGrid span:nth-child(even) {
  margin-left: calc(5vw - 1px);
}
</style>
