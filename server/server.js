import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const BASE_URL = "https://yts-proxy.now.sh/";

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    rating: Float
    description_intro: String
    language: String
    medium_cover_image: String
    genres: [String]
  }
  type Query {
    allMovies: [Movie]
    movie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    allMovies() {
      return fetch(`${BASE_URL}/list_movies.json`)
        .then((res) => res.json())
        .then((json) => json.data.movies);
    },
    movie(_, { id }) {
      console.log("id", id);
      return fetch(`${BASE_URL}/movie_details.json?movie_id=${id}`)
        .then((res) => res.json())
        .then((json) => json.data.movie);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
