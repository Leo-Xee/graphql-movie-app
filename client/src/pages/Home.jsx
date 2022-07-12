import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import * as S from "./Home.style";

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

function Home() {
  const { data, loading } = useQuery(GET_MOVIES);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Movie App</S.Title>
      </S.Header>
      {loading && <S.Loading>Loading...</S.Loading>}
      <S.MoviesGrid>
        {data?.allMovies?.map((movie) => (
          <S.PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <S.PosterBg background={movie.medium_cover_image} />
            </Link>
          </S.PosterContainer>
        ))}
      </S.MoviesGrid>
    </S.Container>
  );
}

export default Home;
