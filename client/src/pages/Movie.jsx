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
      isLiked @client
    }
  }
`;

function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  return (
    <S.Container>
      <S.Column>
        <S.Title>{loading ? "Loading..." : `${data.movie?.title}`}</S.Title>
        <S.Subtitle>⭐️ {data?.movie?.rating}</S.Subtitle>
        <button onClick={onClick}>
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </S.Column>
      <S.Image bg={data?.movie?.medium_cover_image} />
    </S.Container>
  );
}

export default Movie;
