import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// data
import db from './_db.js'

// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(_, { id }) {
      return db.games.find(game => game.id === id)
    },
    authors() {
      return db.authors
    },
    author(_, { id }) {
      return db.authors.find(author => author.id === id)
    },
    reviews() {
      return db.reviews
    },
    review(_, { id }) {
      return db.reviews.find(review => review.id === id)
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(review => review.game_id === parent.id)
    },
  Author: {
      reviews(parent) {
        return db.reviews.filter(review => review.author_id === parent.id)
      }
    },
  Review: {
      game(parent) {
        return db.games.find(game => game.id === parent.game_id)
      },
      author(parent) {
        return db.authors.find(author => author.id === parent.author_id)
      }
    },
  },
   Mutation: {
     deleteGame(_, { id }) {
       const gameIndex = db.games.findIndex(game => game.id === id)  //return the index of the game
       if (gameIndex === -1) throw new Error('Game not found')
      const deletedGames = db.games.splice(gameIndex, 1)
       return deletedGames[0]
    },
    deleteReview(_, { id }) {
      const reviewIndex = db.reviews.findIndex(review => review.id === id)
      if (reviewIndex === -1) throw new Error('Review not found')
      const deletedReviews = db.reviews.splice(reviewIndex, 1)
      return deletedReviews[0]
    },
    deleteAuthor(_, { id }) {
      const authorIndex = db.authors.findIndex(author => author.id === id)
      if (authorIndex === -1) throw new Error('Author not found')
      const deletedAuthors = db.authors.splice(authorIndex, 1)
      return deletedAuthors[0]
    },
    createGame(_, { title, platform }) {
      const newGame = {
        id: String(db.games.length + 1),
        title,
        platform,
      }
      db.games.push(newGame)
      return newGame
    },
    createReview(_, { rating, content }) {
      const newReview = {
        id: String(db.reviews.length + 1),
        rating,
        content,
      }
      db.reviews.push(newReview)
      return newReview
    },
    createAuthor(_, { name, verified }) {
      const newAuthor = {
        id: String(db.authors.length + 1),
        name,
        verified,
      }
      db.authors.push(newAuthor)
      return newAuthor
    },/*
    updateGame(_, { id, edits }) {
      const gameIndex = db.games.findIndex(game => game.id === id)
      if (gameIndex === -1) throw new Error('Game not found')
      const game = db.games[gameIndex]
      const updatedGame = { ...game, ...edits }
      db.games[gameIndex] = updatedGame
      return updatedGame
    }*/
    //i want to use the map method  and spread operator as my return type 
     updatedGame(_, { id, edits }) {
      db.games=db.games.map(game => {
        if (game.id === id) {
          return { ...game, ...edits }
        }
        return game
      })
     return db.games.find(game => game.id === id)
  },

}
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)