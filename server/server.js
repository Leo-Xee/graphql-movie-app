import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

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
  }
`;

const resolvers = {
  Query: {
    allMovies() {
      return fetch("https://yts-proxy.now.sh/list_movies.json")
        .then((res) => res.json())
        .then((json) => json.data.movies);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
