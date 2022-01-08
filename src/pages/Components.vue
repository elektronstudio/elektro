<script setup lang="ts">
import { ETitle, EButton, ENavigation, ENavButton, EContent } from "../lib";
</script>

<template>
  <ETitle size="lg">Components</ETitle>

  <br />
  <pre>ETitle</pre>
  <ETitle size="lg">Title lg</ETitle>
  <ETitle size="md">Title md</ETitle>
  <ETitle size="sm">Title sm</ETitle>

  <br />
  <pre>EContent</pre>
  <EContent>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>
      <a href="https://elektron.art" target="_blank">eˉlektron</a> on
      transdistsiplinaarne etendustkunsti platvorm, mis liidab kaasaegse kunsti,
      teaduse ja tehnoloogia otsingulisi tegevusi.<br />Ootamatud kunstivormid,
      lavastused, tekstid, taskuhääling, eksperimendid.
    </p>
    <p>
      <b>e‾lektron</b> on moodustatud MIMprojecti ja Kanuti Gildi SAALi
      koostöös. Rahaline toetaja on Eesti kultuuriministeerium.
    </p>
    <p>
      <i>eˉlektron</i> is a halfway virtual, halfway physical platform that
      connects exploratory activities of performing arts and science.<br />Unexpected
      art forms, performances, texts, podcast, experiments.
    </p>
    <p>
      e‾lektron is realised in cooperation with MIMproject and Kanuti Gildi
      SAAL. Financial supporter is Estonian Ministry of Culture.
    </p>
    <p>Kes on eˉlektron? / Who is eˉlektron?</p>

    <ul>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
    </ul>
    <ol>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
    </ol>
  </EContent>

  <br />
  <pre>EButton</pre>
  <div style="display: flex; align-items: flex-start; gap: var(--gap-4)">
    <EButton size="lg">Button lg</EButton>
    <EButton size="md">Button md as a element</EButton>
    <EButton size="sm" el="a">Button sm as a element</EButton>
  </div>

  <br />
  <pre>ENavigation</pre>
  <ENavigation />

  <br />
  <pre>ENavButton</pre>
  <ENavButton>About us</ENavButton>
</template>
