const express = require('express')
const app = express()
const port = 3000

const template = `
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
            }
            a {
                color: black;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div>
            <h1><a href="https://playoverwatch.com/en-us/news/patch-notes/pc/">NO</a></h1>
        </div>
    </body>
</html>
`

app.get('/', (req, res) => res.send(template))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
