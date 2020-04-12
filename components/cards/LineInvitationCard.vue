<template>
  <v-col cols="12" md="6" class="DataCard">
    <simple-number-card
      :title="
        $t(
          'LINE公式アカウント「新型コロナ対策パーソナルサポート（行政）」友達数'
        )
      "
      :title-id="'line-invitation'"
      :number="lineFriends"
      :unit="$t('人')"
      :date="'1900/01/01'"
    >
      <p>
        <a href="https://lin.ee/9YlwvHu">
          <img
            :style="{ border: '0', height: '36px' }"
            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
            :alt="$t('LINEの友だち追加')"
          />
        </a>
      </p>
      <p>
        <a href="https://www.pref.shiga.lg.jp/ippan/kurashi/ict/310749.html">{{
          $t('LINE公式アカウントについて')
        }}</a>
      </p>
    </simple-number-card>
  </v-col>
</template>

<i18n>{}</i18n>

<style lang="scss" scoped></style>

<script>
import Data from '@/data/data.json'
import SimpleNumberCard from '@/components/SimpleNumberCard.vue'

export default {
  components: {
    SimpleNumberCard
  },
  data() {
    const data = {
      // NOTE: This is mock
      lineFriends: Data.lineFriends || 100000
    }
    return data
  }
}
</script>
