const fs = require('fs')
const moment = require('moment')
const getCSV = require('./getCSV.js')
require('dotenv').config()
const data = {} // Final product

// Generate /data/data.json.

const attrPromise = new Promise(resolve => {
  getCSV('POSITIVE_ATTRIBUTE').then(res => {
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

const countPromise = new Promise(resolve => {
  getCSV('POSITIVE_COUNT').then(res => {
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

const consultsPromise = new Promise(resolve => {
  getCSV('CONSULTS').then(res => {
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

const testsPromise = new Promise(resolve => {
  getCSV('TESTS').then(res => {
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

    data.consults = tests
    resolve()
  })
})

const querentsPromise = new Promise(resolve => {
  getCSV('QUERENTS').then(res => {
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
    querents.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.querents = querents
    resolve()
  })
})

Promise.all([
  countPromise,
  attrPromise,
  consultsPromise,
  testsPromise,
  querentsPromise
]).then(() => {
  fs.writeFileSync('./data/data.json', JSON.stringify(data))
})

// Generate /data/news.json.
const news = {}
new Promise(resolve => {
  getCSV('NEWS').then(res => {
    news.newsItems = res
    resolve()
  })
}).then(() => {
  fs.writeFileSync('./data/news.json', JSON.stringify(news))
})
