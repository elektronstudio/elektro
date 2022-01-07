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
      Aenean eu <i>leo quam.</i> Pellentesque <b>ornare sem</b> lacinia quam
      venenatis vestibulum. <em>Morbi leo risus</em>, porta ac consectetur ac,
      vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi
      leo risus, porta ac consectetur ac, vestibulum at eros. Donec ullamcorper
      nulla non metus auctor fringilla. Aenean eu leo quam. Pellentesque ornare
      sem lacinia quam venenatis vestibulum. Vestibulum id ligula porta felis
      euismod semper. Curabitur blandit tempus porttitor. Fusce dapibus, tellus
      ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
      justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.
    </p>
    <p>
      Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce
      dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
      fermentum massa justo sit amet risus. Nulla vitae elit libero, a pharetra
      augue. Donec ullamcorper nulla non metus auctor fringilla. Nullam quis
      risus eget urna mollis ornare vel eu leo. Nullam quis risus eget urna
      mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis
      interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris
      condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur
      blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque
      nisl consectetur et.
    </p>
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
