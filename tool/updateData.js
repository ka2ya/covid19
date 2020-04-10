const fs = require('fs')
const moment = require('moment')
const getCSV = require('./getCSV.js')
require('dotenv').config()
const data = {} // Final product

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
    })

    const patients = {} // patients section
    patients.data = res
    patients.date = moment().format('YYYY\\/MM\\/DD HH:mm')

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

      e['小計'] = Number(e['小計'])
    })

    const patientsSummary = {} // patients section
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

      e['小計'] = Number(e['小計'])
    })

    const consults = {} // patients section
    consults.data = res
    consults.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.consults = consults
    resolve()
  })
})

Promise.all([countPromise, attrPromise, consultsPromise]).then(() => {
  fs.writeFileSync('./data/data.json', JSON.stringify(data))
})

const news = {}
new Promise(resolve => {
  getCSV('NEWS').then(res => {
    news.newsItems = res
    resolve()
  })
}).then(() => {
  fs.writeFileSync('./data/news.json', JSON.stringify(news))
})
