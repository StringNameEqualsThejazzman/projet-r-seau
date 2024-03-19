require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./self_modules/routes/routes');
const routerSecure = require('./self_modules/routes/routesSecure');
const authorize = require('./self_modules/middlewares/authorize');
const corsOptions = require('./self_modules/middlewares/cors');
const cookieParser = require('cookie-parser'); 
const logger = require('./self_modules/logger');
const morgan = require('morgan');

const app = express();

const customFormat = ':date[iso] :method :url :status :response-time ms - :res[content-length]';
app.use(morgan(customFormat));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"1.1MB"}));
app.use(express.static('public'));
app.use(cookieParser()); 
app.use(cors(corsOptions))
let d = Date(Date.now());
a = d.toString()

app.use((req, res, next) => {
    logger.info(`[DATE_TIME] ${a} [REQUEST]: ${req.method} [URL] : ${req.url} [TOKEN] : ${req.headers.token}`);
    next();
});

app.use('/', router);
app.use(authorize);
app.use('/', routerSecure);

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.info(`[SERVER] Listening on http://localhost:${port}`); 
})