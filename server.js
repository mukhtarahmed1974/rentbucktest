express = require('express'),
  bodyParser = require('body-parser');
cors = require('cors');

const calculatedExpenses = require('./expense-service');

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    'extended': false
  }),
)

app.use(cors())


app.post('/calculate-expense', (req, res) => {
  const expenseData = req.body;
  let expenseResult = calculatedExpenses(expenseData);
  res.status(200).json(expenseResult);
});


const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Connected to port ' + port)
});