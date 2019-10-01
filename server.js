const express       = require('express')
const app           = express()
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const path          = require('path')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({"extended":true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('www'));

app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/www', 'index.html'));
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 4200);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});