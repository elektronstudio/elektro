<script setup lang="ts">
import ArtNav from "../components/ArtNav.vue";
import EScheduleEvent from "../components/EScheduleEvent.vue";
import EEventInstance from "../components/EEventInstance.vue";

const scheduleEvents = [
  {
    title: "Hundid",
    description:
      "<p>Lavastus “Hundid” on jätk Liis Varese ja Taavet Janseni koostööle “Kõik loeb/ The Reader”, mille soe vastuvõtt on julgustanud neid digitaalse formaadiga edasi töötama.</p>",
    events: [
      {
        start_at: "2022-06-01T19:00:00.000Z",
        end_at: "2022-06-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-07-01T19:00:00.000Z",
        end_at: "2022-07-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-09-01T19:00:00.000Z",
        end_at: "2022-09-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
    ],
  },
  {
    title: "Nature as magic",
    description:
      "<p>Lavastus “Hundid” on jätk Liis Varese ja Taavet Janseni koostööle “Kõik loeb/ The Reader”, mille soe vastuvõtt on julgustanud neid digitaalse formaadiga edasi töötama.</p>",
    events: [
      {
        start_at: "2022-06-01T19:00:00.000Z",
        end_at: "2022-06-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-07-01T19:00:00.000Z",
        end_at: "2022-07-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-09-01T19:00:00.000Z",
        end_at: "2022-09-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
    ],
  },
  {
    title: "Sinust saab tantsija!",
    description:
      "<p>Lavastus “Hundid” on jätk Liis Varese ja Taavet Janseni koostööle “Kõik loeb/ The Reader”, mille soe vastuvõtt on julgustanud neid digitaalse formaadiga edasi töötama.</p>",
    events: [
      {
        start_at: "2022-06-01T19:00:00.000Z",
        end_at: "2022-06-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-07-01T19:00:00.000Z",
        end_at: "2022-07-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
      {
        start_at: "2022-09-01T19:00:00.000Z",
        end_at: "2022-09-01T19:00:00.000Z",
        ticketUrl: "https://www.eventbrite.com/e/hundid-tickets-53907988984",
      },
    ],
  },
];
</script>

<template>
  <ArtNav />
  <main class="Page Projects">
    <EScheduleEvent
      v-for="event in scheduleEvents"
      :title="event.title"
      :description="event.description"
      :events="event.events"
    >
      <EEventInstance
        v-if="event.events"
        v-for="item in event.events"
        :start-at="item.start_at"
        :end-at="item.end_at"
        :ticket-url="item.ticketUrl"
      />
    </EScheduleEvent>
  </main>
</template>

<style scoped>
.Page.Projects {
  display: grid;
  grid-template-columns: 1fr;
  padding: var(--p-5);
}
.Page.Projects > section {
  margin-bottom: var(--m-12);
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .Page.Projects {
    grid-template-columns: repeat(8, 1fr);
  }
  .Page.Projects > section {
    grid-column: 4 / -1;
    margin-bottom: var(--m-24);
  }
}
</style>
