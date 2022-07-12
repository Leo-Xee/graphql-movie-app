import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

import * as S from "./Movie.style";

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLike @client
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

  return (
    <S.Container>
      <S.Column>
        <S.Title>{loading ? "Loading..." : `${data.movie?.title}`}</S.Title>
        <S.Subtitle>⭐️ {data?.movie?.rating}</S.Subtitle>
        <button>{data?.movie?.isLiked ? "Unlike" : "Like"}</button>
      </S.Column>
      <S.Image bg={data?.movie?.medium_cover_image} />
    </S.Container>
  );
}

export default Movie;
