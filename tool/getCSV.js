const request = require('request')

const getCSV = function(csvUrl) {
  const options = {
    csvUrl,
    method: 'GET',
    followAllRedirects: true // 3xxが返ってきたとき、リダイレクトする。
  }

  return new Promise(function(resolve) {
    request(options, function(_error, _response, body) {
      let obj = body
      obj = body.split('\r\n')
      const columns = obj[0].split(',')

      for (let i = 1; i < obj.length; i++) {
        const tmp = {}
        columns.forEach((e, index) => {
          tmp[e] = obj[i].split(',')[index]
        })

        obj[i] = tmp
      }
      obj.shift()

      resolve(obj)
    })
  })
}

module.exports = getCSV
