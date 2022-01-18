<script setup lang="ts">
import ETitle from "../../components/ETitle.vue";
import ArtNav from "../../components/ArtNav.vue";
import EContent from "../../components/EContent.vue";
import EBox from "../../components/EBox.vue";
import EDetailsList from "../../components/EDetailsList.vue";
import EEventInstance from "../../components/EEventInstance.vue";
import EPressItems from "../../components/EPressItems.vue";

const data = {
  title: "Hundid",
  producer: "Taavet Jansen",
  description:
    "<p>Lavastus “Hundid” on jätk Liis Varese ja Taavet Janseni koostööle “Kõik loeb/ The Reader”, mille soe vastuvõtt on julgustanud neid digitaalse formaadiga edasi töötama. See on küsimus intiimse ja vahetu kogemuse loomise võimalusest etendajaga samas ruumis viibimata.</p>",
  gallery: [
    "https://lh3.googleusercontent.com/cSKqVW2BtwWwHLSLTyACjPi8xbzaCroPndAPPzkwX1tY1A8KuUmImvqnFH7FxOoeVvKU5ZC8NzYqTE_C23xziWvSkclCqUPrzlmAWGfY_YsVKgqLpN-ireTOlk32XvcY7A",
  ],
  details: [
    {
      detail: "Etenduse pikkus",
      value: "~50min",
    },
    {
      detail: "Lavastaja",
      value: "Taavet Jansen",
    },
    {
      detail: "Koreograaf",
      value: "Liis Vares",
    },
    {
      detail: "Dramaturg",
      value: "Tõnis Parksepp",
    },
    {
      detail: "Videokunstnik",
      value: "Alis Mäesalu",
    },
    {
      detail: "Valguskunstnik",
      value: "Fredi Karu",
    },
    {
      detail: "Heli",
      value: "Liisa Hirch, Hendrik Kaljujärv",
    },
    {
      detail: "Näitlejad",
      value: "Marion Tammet ja Anne Türnpu",
    },
    {
      detail: "Stilist",
      value: "Alissa Šnaider",
    },
    {
      detail: "Tänud",
      value:
        "Ahti Lill, Kätlin Sumberg, EKA doktorikool, TÜ Viljandi Kultuuriakadeemia, Peeter Jalakas, Raivo Kelomees, Jürgen Volmer, Anni Parksepp",
    },

    {
      detail: "Produtsent",
      value: "eˉlektron",
    },
    {
      detail: "Toetajad",
      value: "Eesti Kultuurkapital",
    },
  ],
  eventInstances: [
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
  press: [
    {
      title: "Kuidas ma festivalil käisin",
      link: "https://neti.ee",
      description: "Urmas Lüüs – Sirp 17.04.2020",
    },
    {
      title: "Tähendusloome tagurpidikäik",
      link: "https://neti.ee",
      description: "Kiwa – Sirp 17.04.2020",
    },
  ],

  content: `<p>
Autorid tõdevad, et online-arengute ja digitaalsete lahenduste kõrval on võimaluste rohkus, vale-informatsiooni vohamine ja praegu ühiskonnas lokkav võimetus eristada olulist ebaolulisest, loonud meie ümber digitaalse võsa, mis eksitavad ka kogenumaid teelt.
Reaalsus ehk tegelikkus onzkontseptsioon, millest me kümne küünega kinni hoiame ja tahame, et meil oleks kuhugi virtuaalsusest tagasi pöörduda. Pidev hirm ilma jääda (FOMO: fear of missing out) sunnib meid aga ahmima kõike kättesaadavat ja seeläbi tegelikkust muutma. “Hundid” ongi lugu, mis juhtub, kui kohtame seal võsas tundmatut. Proovile pannakse mitte ainult meie turvatunne, maailmapilt ja hoiakud, vaid ka arusaam reaalsusest.
“Hundid” on eestikeelne originaallooming, mille taustaks on Hollandi kirjaniku Willem Frederik Hermansi lühijutt “Hoitud maja”. Ammutades sellest tekstist inspiratsiooni, on sündinud “Huntide” kontseptsioon. See on lugu, mis toimub virtuaalsel Eestimaal, kus ükskõik kes võib kohata võsas tundmatut ja viia meid rännakule, mis mitte ainult ei sea kahtluse alla tema maailma, vaid esitab küsimusi meie enda tegelikkuse kohta. Seda kogemust on oodatud jagama kõik, kel on ligipääs internetile. Digitaalsel teatril pole füüsilisi piire ja elektron.art keskkonnas oleme suhtlemise, kommenteerimise, vaatamise ja kaasa mõtlemisega kõik sisuloojad.
Kuigi virtuaalne ruum pakub kunstnikele võimalusi, mida füüsiline ruum piiraks, nõuab see oskusi, mida ühe valdkonna profiililt ei leia. “Hundid” on digitaalteatri hübriidvorm, mille loomises osalevad nii teatri-, filmi- kui ka kujutavad kunstnikud. Lisaks Taavet Jansenile ja Liis Varesele, on koostöösse kaasatud dramaturgina kirjandusteadlane Tõnis Parksepp, näitlejad Marion Tammet ja Anne Türnpu, visuaalse lahenduse loojad Alis Mäesalu, Neeme Külm ja Fredi Karu. Helikujunduse autoriteks on Liisa Hirch ja Hendrik Kaljujärv.
,Hundid’’ esmaettekanne on 18. novembril. Jälgi meid ka Instagramis: taavet_juudas_iskariot, liisvares, mariontammet ja elektron.art.
Kõik “Hundid” on kordumatud. Ühe piletiga pääsed kõikidele etendustele, olenemata makstavast piletihinnast. Piletiostuga toetad eˉlektroni uuenduslikke tegevusi.
“Hundid” on mõeldud vaatamiseks arvutist. Kasuta veebibrauseriks Firefox-i või Google Chrome-i. Vajad head internetiühendust ning soovitame kasutada kõrvaklappe.</p>`,
};

const {
  title,
  producer,
  description,
  gallery,
  press,
  content,
  eventInstances,
  details,
} = data;
</script>

<template>
  <ArtNav />
  <article class="Page SingleProduction">
    <header>
      <ETitle el="h1" size="lg">{{ title }}</ETitle>
      <h4>{{ producer }}</h4>
      <EContent class="Description" size="lg" :content="description" />
    </header>
    <!-- Gallery block -->
    <main>
      <EBox class="MainContent">
        <EDetailsList :details="details" />
        <EContent :content="content" />
      </EBox>
      <EBox class="SideContent" el="aside">
        <template v-if="eventInstances">
          <ETitle el="h3" size="lg">Etendused</ETitle>
          <EEventInstance
            v-for="event in eventInstances"
            layout="vertical"
            :start-time="event.startTime"
            :end-time="event.endTime"
            :ticket-url="event.ticketUrl"
          />
        </template>
        <template v-if="press">
          <ETitle el="h3" size="lg">Press</ETitle>
          <EPressItems :items="press" />
        </template>
      </EBox>
    </main>
  </article>
</template>

<style scoped>
.Page.SingleProduction header,
.Page.SingleProduction main {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: var(--gap-5);
  color: var(--gray-300);
}

.Page.SingleProduction header {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}
.Page.SingleProduction main {
  grid-template-areas:
    "main"
    "side";
}

.Page.SingleProduction header h1 {
  grid-area: title;
}

.Page.SingleProduction header h4 {
  grid-area: subtitle;
  align-self: end;
}

.Page.SingleProduction header .Description {
  grid-area: description;
}

.MainContent {
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
}
.SideContent {
  grid-area: side;
  align-self: start;
}
.SideContent h3 {
  margin-bottom: var(--m-6);
}
.SideContent h3:not(:first-child) {
  margin-top: var(--m-8);
}

/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(4, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title description description description"
      "subtitle description description description";
  }

  .Page.SingleProduction main {
    grid-template-areas: "main main main main" "side side side side";
  }
  .MainContent {
    grid-template-columns: 2fr 3fr;
  }
}
@media only screen and (min-width: 1240px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(8, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title title description description description description . ."
      "subtitle subtitle description description description description . .";
  }
  .Page.SingleProduction main {
    grid-template-areas: "main main main main main side side side";
  }
}
</style>
