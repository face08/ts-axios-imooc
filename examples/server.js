const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')
const cookieParser = require('cookie-parser')
const atob = require('atob')



const app = express()
const complier = webpack(WebpackConfig)

app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(complier))
// app.use(express.static(__dirname))
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))










const multipart = require('connect-multiparty')
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))








const router = express.Router()

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})


// router for examples simple
router.get('/simple/get', function(req, res) {
  res.json({
        msg: `hello world`
    })
})

// router for examples base
router.get('/base/get', function (req, res) {
  res.json(req.query)
})
router.post('/base/post', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

registerExtendRouter()

registerInterceptorRrouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})


function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  // ??????????????????????????????
  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'Alice',
        age: 18
      }
    })
  })
}


function registerInterceptorRrouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello ')
  })
}


function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}


function registerCancelRouter() {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}



function registerMoreRouter() {
  router.get('/more/get', (req, res) => {
    console.log(req.cookies)
    res.json(req.cookies)
  })

  router.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log('atob on server:', atob(credentials))
    const [username, password] = atob(credentials).split(':').map(item => item.trim())
    if (type === 'Basic' && username === 'chen' && password === '123456') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
  })

  router.get('/more/A', function (req, res) {
    res.end('A')
  })

  router.get('/more/B', function (req, res) {
    res.end('B')
  })
}