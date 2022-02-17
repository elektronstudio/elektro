<script setup lang="ts">
import ETitle from "../../components/ETitle.vue";
import EProductionCard from "../../components/EProductionCard.vue";
import ArtNav from "../../components/ArtNav.vue";

const projects = {
  active: [
    {
      title: "Hundid",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
      events: [
        {
          start_at: "2022-06-01T19:00:00.000Z",
          end_at: "2022-06-01T19:00:00.000Z",
        },
      ],
    },
    {
      title: "Projekt 2",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh4.googleusercontent.com/ef5PQ6ntI_2LMeudEAx8wqZE2D4HfccyItfRO3llMmkSiz7NX4FXJ8MfOMg1yyrS6yKjfDOYhTrhX03rN5pSlauAAO4hbIXmkCnF05PiEP68KoIS5fuews3mo-hEHUoLNg",
      events: [
        {
          start_at: "2022-06-01T19:00:00.000Z",
          end_at: "2022-06-01T19:00:00.000Z",
        },
      ],
    },
  ],
  archived: [
    {
      title: "Hundid",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
      events: [
        {
          start_at: "2022-06-01T19:00:00.000Z",
          end_at: "2022-06-01T19:00:00.000Z",
        },
      ],
    },
    {
      title: "Projekt 2",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh4.googleusercontent.com/ef5PQ6ntI_2LMeudEAx8wqZE2D4HfccyItfRO3llMmkSiz7NX4FXJ8MfOMg1yyrS6yKjfDOYhTrhX03rN5pSlauAAO4hbIXmkCnF05PiEP68KoIS5fuews3mo-hEHUoLNg",
    },
    {
      title: "Hundid",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
      events: [
        {
          start_at: "2022-06-01T19:00:00.000Z",
          end_at: "2022-06-01T19:00:00.000Z",
        },
      ],
    },
    {
      title: "Projekt 2",
      author: "Taavet Jansen",
      thumbnail:
        "https://lh4.googleusercontent.com/ef5PQ6ntI_2LMeudEAx8wqZE2D4HfccyItfRO3llMmkSiz7NX4FXJ8MfOMg1yyrS6yKjfDOYhTrhX03rN5pSlauAAO4hbIXmkCnF05PiEP68KoIS5fuews3mo-hEHUoLNg",
      events: [
        {
          start_at: "2022-06-01T19:00:00.000Z",
          end_at: "2022-06-01T19:00:00.000Z",
        },
      ],
    },
  ],
};
</script>

<template>
  <ArtNav />
  <main class="Page Projects">
    <section>
      <ETitle el="h2" size="lg">Aktiivsed</ETitle>
      <EProductionCard
        v-for="project in projects.active"
        :title="project.title"
        :author="project.author"
        :thumbnail="project.thumbnail"
        :next-event="{
          startAt: project.events[0].start_at,
          endAt: project.events[0].end_at,
        }"
      />
    </section>
    <section>
      <ETitle el="h2" size="lg">Arhiiv</ETitle>
      <EProductionCard
        v-for="project in projects.archived"
        :title="project.title"
        :author="project.author"
        :thumbnail="project.thumbnail"
        :next-event="
          project.events && project.events[0]
            ? {
                startAt: project.events[0].start_at,
                endAt: project.events[0].end_at,
              }
            : undefined
        "
      />
    </section>
  </main>
</template>

<style scoped>
.Page.Projects {
  display: grid;
  padding: var(--p-5);
}
.Page.Projects section {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  margin-bottom: var(--m-10);
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .Page.Projects section {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 1240px) {
  .Page.Projects section {
    grid-template-columns: repeat(3, 1fr);
  }
}
.Page.Projects section h2 {
  grid-column: 1 / -1;
}
</style>
