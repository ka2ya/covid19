<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new class="mb-4" :items="newsItems" />
    <v-row class="DataBlock">
      <confirmed-cases-number-card />
      <confirmed-cases-attributes-card />
      <consults-number-card />
      <tests-number-card />
      <querents-number-card />
      <line-invitation-card />
    </v-row>
  </div>
</template>

<i18n src="./index.i18n.json"></i18n>

<script>
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import Data from '@/data/data.json'

import News from '@/data/news.json'

import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
import ConsultsNumberCard from '@/components/cards/ConsultsNumberCard'
import TestsNumberCard from '@/components/cards/TestsNumberCard'
import QuerentsNumberCard from '@/components/cards/QuerentsNumberCard'
import LineInvitationCard from '@/components/cards/LineInvitationCard'

export default {
  components: {
    PageHeader,
    WhatsNew,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    ConsultsNumberCard,
    TestsNumberCard,
    QuerentsNumberCard,
    LineInvitationCard
  },
  data() {
    // 退院者グラフ
    // const dischargesGraph = formatGraph(Data.discharges_summary.data)
    // 死亡者数
    // #MEMO: 今後使う可能性あるので一時コメントアウト
    // const fatalitiesTable = formatTable(
    //   Data.patients.data.filter(patient => patient['備考'] === '死亡')
    // )
    const data = {
      Data,
      /* dischargesGraph, */
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('県内の最新感染動向'),
        date: Data.lastUpdate
      },
      newsItems: News.newsItems
    }
    return data
  },
  head() {
    return {
      title: this.$t('県内の最新感染動向')
    }
  }
}
</script>

<style lang="scss" scoped>
.MainPage {
  .DataBlock {
    margin: 20px -8px;
    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }
      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
