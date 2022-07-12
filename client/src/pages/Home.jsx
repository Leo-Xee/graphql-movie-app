import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(GET_MOVIES);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!!</h1>;

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {data.allMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
