const express = require('./node_modules/express');
const graphqlHTTP = require('./node_modules/express-graphql/dist');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('../config.json');

const connectionString = `mongodb+srv://rishikarri:${config.rishikarri}@graphql-tutorial-2ubrf.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(connectionString, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});