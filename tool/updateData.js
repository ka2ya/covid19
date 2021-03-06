const fs = require('fs')
const moment = require('moment-timezone')
const getCSV = require('./getCSV.js')
const data = {} // Final product

moment.tz.setDefault('Asia/Tokyo')

// Generate /data/data.json.
const attrCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv'
const attrPromise = new Promise(resolve => {
  getCSV(attrCSVUrl).then(res => {
    res.forEach(e => {
      const arr = e['リリース日'].split('/')
      e['リリース日'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'
      delete e['']
    }) // Format each date

    const patients = {} // patients section
    patients.data = res
    patients.date = moment().format('YYYY\\/MM\\/DD HH:mm') // Update date

    data.patients = patients
    resolve()
  })
})

const countCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1767213847&single=true&output=csv'
const countPromise = new Promise(resolve => {
  getCSV(countCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const patientsSummary = {}
    patientsSummary.data = res
    patientsSummary.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.patients_summary = patientsSummary
    resolve()
  })
})

const counsultsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=274992458&single=true&output=csv'
const consultsPromise = new Promise(resolve => {
  getCSV(counsultsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const consults = {}
    consults.data = res
    consults.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.consults = consults
    resolve()
  })
})

const testsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1665332061&single=true&output=csv'
const testsPromise = new Promise(resolve => {
  getCSV(testsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const tests = {}
    tests.data = res
    tests.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.tests = tests
    resolve()
  })
})
const querentsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=469162705&single=true&output=csv'
const querentsPromise = new Promise(resolve => {
  getCSV(querentsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['本庁'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'

      const filelds = [
        '大津保健所',
        '草津保健所',
        '甲賀保健所',
        '東近江保健所',
        '彦根保健所',
        '長浜保健所',
        '高島保健所',
        '本庁'
      ]
      let sum = 0
      filelds.forEach(f => {
        e[f] = Number(e[f]) // 型を変えておかないと+演算子が連結と解釈される
        sum += e[f]
      })

      e['小計'] = sum
    })

    const querents = {}
    querents.data = res
    const earlierDate = Math.min(
      new Date(),
      new Date(res[res.length - 1]['日付'])
    )
    querents.date = moment(earlierDate).format('YYYY\\/MM\\/DD HH:mm')
    data.querents = querents
    resolve()
  })
})

const othersUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=735284232&single=true&output=csv'

const othersPromise = new Promise(resolve => {
  getCSV(othersUrl).then(res => {
    const line = {}

    res.forEach(item => {
      switch (item.type) {
        case 'line_friends':
          line.value = item.value
          break
        case 'line_friends_date':
          line.date = item.value
          break
      }
    })
    data.lineFriends = line
    resolve()
  })
})

Promise.all([
  countPromise,
  attrPromise,
  consultsPromise,
  testsPromise,
  querentsPromise,
  othersPromise
]).then(() => {
  data.lastUpdate = moment().format('YYYY\\/MM\\/DD HH:mm')
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2))
})

// Generate /data/news.json.
const news = {}
const newsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=444294091&single=true&output=csv'
new Promise(resolve => {
  getCSV(newsCSVUrl).then(res => {
    news.newsItems = res
    resolve()
  })
}).then(() => {
  fs.writeFileSync('./data/news.json', JSON.stringify(news, null, 2))
})
