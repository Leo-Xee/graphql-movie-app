import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

function Movie() {
  const { id } = useParams();
  console.log("id", typeof id, id);
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  if (loading) return <h1>Fetching...</h1>;

  return <div>{data.movie.title}</div>;
}

export default Movie;
