const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var books = [
    {name: 'Name of teh wind', genre: 'Fantasy', id: '1'},
    { name: 'Nsd wind', genre: 'Fantasy', id: '2' },
    { name: 'Naasdwind', genre: 'Fantasy', id: '3' }
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

// rootquery how we describe a user jumping into a graph and grabbing data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to get data from db / other source
                // fired when we receive a book query
                return _.find(books, { id: args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})