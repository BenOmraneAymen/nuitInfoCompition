const bodyParser = require('body-parser')
const app = require('express')();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/question', require('./routes/questionRoute'));
app.use('/quizz', require('./routes/quizzRoute'));
app.use('/tip', require('./routes/tipRoute'));
app.use("/article", require("./routes/articleRoute"));
app.use("/comment", require("./routes/commentRoute"));
app.use("/like", require("./routes/likeRoute"));
app.use("/user", require("./routes/userRoute"));

module.exports = app;


