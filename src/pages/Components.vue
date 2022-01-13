<script setup lang="ts">
import {
  ETitle,
  EButton,
  ENav,
  ENavButton,
  EContent,
  EProjectCard,
  EScheduleEvent,
  EEventInstance,
  EBoxWrapper,
} from "../lib";
const navItems = [
  {
    name: "eˉlektron",
    path: "/",
  },
  {
    name: "Lavastused",
    path: "/lavastused",
  },
];

const projects = [
  {
    title: "Hundid",
    author: "Taavet Jansen",
    thumbnail:
      "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
    events: [
      {
        startTime: "2022-06-01T19:00:00.000Z",
        endTime: "2022-06-01T19:00:00.000Z",
      },
    ],
  },
];

const scheduleEvents = [
  {
    title: "Hundid",
    description:
      "<p>Lavastus “Hundid” on jätk Liis Varese ja Taavet Janseni koostööle “Kõik loeb/ The Reader”, mille soe vastuvõtt on julgustanud neid digitaalse formaadiga edasi töötama.</p>",
    events: [
      {
        startTime: "2022-06-01T19:00:00.000Z",
        endTime: "2022-06-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        startTime: "2022-07-01T19:00:00.000Z",
        endTime: "2022-07-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        startTime: "2022-09-01T19:00:00.000Z",
        endTime: "2022-09-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
    ],
  },
];
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
    <p><small>Kes on eˉlektron? / Who is eˉlektron?</small></p>
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
    <blockquote>
      Marshall Stay is a multi-disciplinary performance-maker from Australia.
      Shortly after graduating from the Western Australian Academy of Performing
      Arts in 2018, he co-created and directed a number of award-nominated
      theatre pieces, as well as continuing his practice as a freelance
      photographer and videographer within the artistic community.
    </blockquote>
  </EContent>

  <br />
  <pre>EButton</pre>
  <div style="display: flex; align-items: flex-start; gap: var(--gap-4)">
    <EButton size="lg">Button lg</EButton>
    <EButton size="md">Button md as a element</EButton>
    <EButton size="sm" color="accent">Button sm accent colored</EButton>
    <EButton size="xs" color="accent">Button xs accent colored</EButton>
    <EButton size="xs" color="gray">Button xs gray colored</EButton>
  </div>

  <br />
  <pre>ENav</pre>
  <ENav :navItems="navItems" />

  <br />
  <pre>ENavButton</pre>
  <ENavButton>About us</ENavButton>

  <br />
  <pre>EProjectCard</pre>
  <EProjectCard
    v-for="project in projects"
    :title="project.title"
    :author="project.author"
    :thumbnail="project.thumbnail"
    :events="project.events"
  />

  <br />
  <pre>EScheduleEvent</pre>
  <EScheduleEvent
    v-for="event in scheduleEvents"
    :title="event.title"
    :description="event.description"
    :events="event.events"
  />

  <br />
  <pre>EEventInstance</pre>
  <EEventInstance
    v-for="eventInstance in scheduleEvents[0].events"
    :startTime="eventInstance.startTime"
    :endTime="eventInstance.endTime"
    :ticketUrl="eventInstance.ticketUrl"
    layout="vertical"
  />

  <br />
  <pre>EBoxWrapper</pre>
  <EBoxWrapper>
    <EEventInstance
      v-for="eventInstance in scheduleEvents[0].events"
      :startTime="eventInstance.startTime"
      :endTime="eventInstance.endTime"
      :ticketUrl="eventInstance.ticketUrl"
      layout="vertical"
    />
  </EBoxWrapper>
</template>
