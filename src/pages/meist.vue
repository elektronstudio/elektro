<script setup lang="ts">
import ArtNav from "../components/ArtNav.vue";
import ETitle from "../components/ETitle.vue";
import EAboutPageCard from "../components/EAboutPageCard.vue";
import ETeamCard from "../components/ETeamCard.vue";

type Data = {
  blocks: {
    title: string;
    items: {
      layout: "column-1" | "column-1-3" | "column-2-4" | "column-4-4";
      color?: "accent" | "gray";
      title?: string;
      content?: string;
      columns: {
        title?: string;
        content?: string;
      }[];
    }[];
  }[];
  people: {
    name: string;
    thumbnail?: string;
    content?: string;
  }[];
};

const data = {
  blocks: [
    {
      title: "Platform",
      items: [
        {
          layout: "column-1",
          title: "Streaming-theatre",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Development",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Interaction",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Research",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
      ],
    },
    {
      title: "Skills",
      items: [
        {
          layout: "column-1",
          title: "Production",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Network",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Design",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Coding",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
      ],
    },
    {
      title: "Rights",
      items: [
        {
          layout: "column-1",
          title: "Audience",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1",
          title: "Artists",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-1-3",
          color: "gray",
          columns: [
            {
              title: "eˉlektron",
            },
            {
              content:
                "<h1>Our responsibility</h1><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.<p>",
            },
          ],
        },
      ],
    },
    {
      title: "Concept / Approach",
      items: [
        {
          layout: "column-1",
          color: "accent",
          title: "Manifest",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
        },
        {
          layout: "column-2-4",
          columns: [
            {
              title: "eˉlektron",
            },
            {
              content:
                "<h1>Our responsibility</h1><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.<p>",
            },
          ],
        },
      ],
    },
    {
      title: "Full width 50-50 columns layout",
      items: [
        {
          layout: "column-4-4",
          columns: [
            {
              title: "eˉlektron",
            },
            {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
            },
          ],
        },
      ],
    },
  ],
  people: [
    {
      name: "Hendrik Kaljujärv",
      thumbnail:
        "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
    },
    {
      name: "Maike Lond",
      thumbnail:
        "https://lh4.googleusercontent.com/ef5PQ6ntI_2LMeudEAx8wqZE2D4HfccyItfRO3llMmkSiz7NX4FXJ8MfOMg1yyrS6yKjfDOYhTrhX03rN5pSlauAAO4hbIXmkCnF05PiEP68KoIS5fuews3mo-hEHUoLNg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
    },
    {
      name: "Kaie Olmre",
      thumbnail:
        "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
    },
    {
      name: "Kristjan Jansen",
      thumbnail:
        "https://lh4.googleusercontent.com/ef5PQ6ntI_2LMeudEAx8wqZE2D4HfccyItfRO3llMmkSiz7NX4FXJ8MfOMg1yyrS6yKjfDOYhTrhX03rN5pSlauAAO4hbIXmkCnF05PiEP68KoIS5fuews3mo-hEHUoLNg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur.",
    },
  ],
} as Data;
</script>

<template>
  <ArtNav />
  <main class="Page About">
    <section v-for="block in data.blocks">
      <ETitle el="h2" size="lg">{{ block.title }}</ETitle>
      <EAboutPageCard
        v-for="card in block.items"
        :layout="card.layout"
        :title="card.title"
        :color="card.color"
        :content="card.content"
        :columns="card.columns"
      />
    </section>
    <section>
      <ETitle el="h2" size="lg">Team</ETitle>
      <ETeamCard
        v-for="card in data.people"
        :name="card.name"
        :thumbnail="card.thumbnail"
        :content="card.content"
      />
    </section>
  </main>
</template>

<style scoped>
/* @TODO: Figure out page class naming conventions */
.Page.About {
  padding: var(--p-5);
}
.Page.About > section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--gap-5);
  margin-bottom: var(--m-12);
}
.Page.About > section h2 {
  grid-column: 1 / -1;
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .Page.About > section {
    grid-template-columns: repeat(4, 1fr);
  }
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .Page.About > section {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
