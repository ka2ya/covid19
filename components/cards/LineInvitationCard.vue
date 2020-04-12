<template>
  <v-col cols="12" md="6" class="DataCard">
    <simple-number-card
      :title="
        $t(
          'LINE公式アカウント「新型コロナ対策パーソナルサポート（行政）」友達数'
        )
      "
      :title-id="'line-invitation'"
      :number="number"
      :unit="$t('人')"
      :date="date"
    >
      <p>
        {{
          $t(
            'LINEを通じてあなたの状態に合わせた新型コロナウイルスに関する情報をお知らせしています。'
          )
        }}
        <a href="https://www.pref.shiga.lg.jp/ippan/kurashi/ict/310749.html">{{
          $t('詳しくはこちら')
        }}</a>
      </p>
      <p :style="{ textAlign: 'center' }">
        <a href="https://lin.ee/9YlwvHu">
          <img
            :style="{ border: '0', height: '36px' }"
            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
            :alt="$t('LINEの友だち追加')"
          />
        </a>
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
      number: Data.lineFriends?.value || 123456,
      date: Data.lineFriends?.date || '20xx/yy/zz hh:mm'
    }
    return data
  }
}
</script>
