const express = require('express')
const app = express()
const port = 3000


const buildTemplate = answer => {
    const answerText = answer ? 'yes' : 'no'

    return `
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

app.get('/', (_req, res) => {
    return res.send(buildTemplate(false))
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
