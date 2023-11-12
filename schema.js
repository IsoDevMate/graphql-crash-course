export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
    Author: Author!
    Review: Review!
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!

  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    deleteGame(id: ID!): Game
    deleteReview(id: ID!): Reviewid
    deleteAuthor(id: ID!): Author
    createGame(game:AddGameInput!): Game
    createReview(rating: Int!, content: String!): Review
    createAuthor(name: String!, verified: Boolean!): Author
    updateGame(id: ID!, edits: UpdateGameInput!): Game
  }
input AddGameInput {
    title: String!
    platform: [String!]!
  }

input UpdateGameInput {
    title: String
    platform: [String!]
  }
`