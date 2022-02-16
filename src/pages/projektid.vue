<script setup lang="ts">
import ArtNav from "../components/ArtNav.vue";
import ETitle from "../components/ETitle.vue";
import EAboutPageCard from "../components/EAboutPageCard.vue";
import ETeamCard from "../components/ETeamCard.vue";
import data from "../projectsData.json";
import ERelatedPageCard from "../components/ERelatedPageCard.vue";
import EImageCard from "../components/EImageCard.vue";

type Card = {
  id: number;
  __component:
    | "content.title"
    | "content.about-card"
    | "content.related-page"
    | "content.person-card"
    | "content.image-card";
  title: string;
  content: string;
  name?: string;
  layout?: "columns1" | "columns2" | "columns3" | "columns4";
  image?: any;
};

const cards = data.data.attributes.cards as Card[];
</script>

<template>
  <ArtNav />
  <main class="Page About">
    <template v-for="item in cards">
      <ETitle
        v-if="item.__component === 'content.title'"
        el="h2"
        size="lg"
        :title="item.title"
      />
      <EAboutPageCard
        v-else-if="item.__component === 'content.about-card'"
        :layout="item.layout"
        :title="item.title"
        :content="item.content"
      />
      <ERelatedPageCard
        v-else-if="item.__component === 'content.related-page'"
        :title="item.title"
        :content="item.content"
      />
      <ETeamCard
        v-else-if="item.__component === 'content.person-card'"
        :name="item.name"
        :content="item.content"
      />
      <EImageCard
        v-else-if="item.__component === 'content.image-card'"
        :sizes="Object.values(item.image.data.attributes.formats)"
        :alt="item.image.data.attributes.alternativeText"
      />
    </template>
  </main>
</template>

<style scoped>
/* @TODO: Figure out page class naming conventions */

.Page.About {
  display: flex;
  flex-direction: column;
  gap: var(--gap-5);
  margin-bottom: var(--m-12);
  padding: var(--p-5);
}
.Page.About > h2 {
  grid-column: 1 / -1;
  margin-top: var(--m-8);
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .Page.About {
    display: grid;
    grid-gap: var(--gap-5);
    grid-template-columns: repeat(2, 1fr);
  }
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .Page.About {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
