importScripts('workbox-sw.prod.v2.0.2-rc1-2.0.2-rc1.0.js')

const workboxSW = new WorkboxSW()
workboxSW.precache([])

workboxSW.precache(['https://fonts.googleapis.com/css?family=Open+Sans'])
