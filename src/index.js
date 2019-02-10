const request = require('request-promise-native')
const htmlSoup = require('html-soup')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const MILLIS = 1000
const SECONDS = 60
const MINUTES = 60
const cache = {
    lastUpdate: null,
    lastResponse: null,
    expiration: 1 * MINUTES * SECONDS * MILLIS,
}

const buildTemplate = answer => {
    const answerText = answer ? 'yes' : 'no'

    return `
<!--
Made with love (and in good fun) by @icbat.
Source code at https://github.com/icbat/hasreaperbeennerfed.com
PRs welcome!
-->

<html>
    <head>
        <style type="text/css">
            body, div {
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
                margin: 0;
            }
            h1 {
                text-align: center;
                font-size: 120pt;
                vertical-align:middle;
                margin: 0;
                width: 100%;
                font-family: arial;
                text-transform: uppercase;
            }
            a {
                color: black;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div>
            <h1><a href="https://playoverwatch.com/en-us/news/patch-notes/pc/">${answerText}</a></h1>
        </div>
    </body>
</html>
`
}

const getAnswer = async () => {
    const response = await request({uri: 'https://playoverwatch.com/en-us/news/patch-notes/pc/'})
    const dom = htmlSoup.parse(response)
    const patches = Array.from(htmlSoup.select(dom, 'div.patch-notes-patch'))

    const latestPatch = patches[0]

    const theReaperBuffPatch = 'patch-54255'
    if (theReaperBuffPatch === latestPatch.attributes.id) {
        return false
    }

    // This assumes that the next patch Reaper is mentioned in will fix him
    return findReapy(latestPatch)
}

const findReapy = node => {
    const callouts = Array.from(htmlSoup.select(node, '.IcoHeading-text'))

    const heroesChanged = callouts
        .map(callout => callout.children)
        .map(children => children[0])
        .map(child => child.text  || '')
        .map(name => name.toUpperCase())

    return heroesChanged.includes('REAPER')
}

app.get('/', async (_req, res) => {
    let answer
    let difference
    if (cache.lastUpdate) {
        difference = new Date().getTime() - cache.lastUpdate.getTime()
    }
    if (!cache.lastUpdate || difference > cache.expiration) {
        answer = await getAnswer()
        cache.lastResponse = answer
        cache.lastUpdate = new Date()
    } else {
        answer = cache.lastResponse
    }

    return res.send(buildTemplate(answer))
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
