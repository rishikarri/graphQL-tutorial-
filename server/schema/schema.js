const graphql = require('../node_modules/graphql');
const _ = require('../node_modules/lodash/lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


var books = [
    { name: 'Name of teh wind', genre: 'Fantasy', id: '1', authorId: "1"},
    { name: 'Nsd wind', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'Naasdwind', genre: 'Fantasy', id: '3', authorId: '3' },
    { name: 'gyj wind', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'guy', genre: 'Fantasy', id: '5', authorId: '3' }
]

const authors = [
    { name: 'Patrick Rothfuss', age: 42, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 42, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent is the book we've queried
                // return _.find(authors, { id: parent.authorId })

            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

// rootquery how we describe a user jumping into a graph and grabbing data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                // fired when we receive a book query
                // return _.find(books, { id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                // fired when we receive a book query
                // return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})