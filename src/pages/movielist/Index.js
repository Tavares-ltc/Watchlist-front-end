import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./MoviesSection";
import { useInView } from "react-intersection-observer";
import { useQuery } from "../../hooks/useQuery";
import { MovieDetails } from "./MovieDetailsModal";
import useSearchMovie from "../../hooks/api/useSearch";
import { Background } from "../../components/Background";
import { AccountMenuModal } from "./AccountMenuModal";
import { PageLoading } from "../../components/PageLoading";
export default function MovielistPage({ moviesCategory }) {
  const [moviesCategoryType, setMoviesCategoryType] = useState(moviesCategory);


  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const { getMovies } = useMovies();
  const { searchMovies } = useSearchMovie();
  const [movies, setMovies] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);

  let query = useQuery();
  const [movieId, setMovieId] = useState(query.get("movieId"));
  const [searchQuery, setSearchQuery] = useState(query.get("term"));
  useEffect(() => {
    fechData(moviesCategoryType);
  }, [inView]);

  if (movies.length === 0) {
    return <PageLoading />;
  }
  return (
    <>
      <Background>
        <Header setIsAccountModalVisible={setIsAccountModalVisible} />
        <AccountMenuModal
          isAccountModalVisible={isAccountModalVisible}
          setIsAccountModalVisible={setIsAccountModalVisible}
        />
        <MovieDetails movieId={movieId} setMovieId={setMovieId} />
        <MoviesSection
          movies={movies}
          setMovieId={setMovieId}
          inView={ref}
          hasMorePages={hasMorePages}
        />
      </Background>
    </>
  );

  async function fechData(moviesCategory) {
    let promise;

    if (moviesCategory === "search") {
      promise = await searchMovies(currentPage, searchQuery);
    } else {
      promise = await getMovies(moviesCategory, currentPage);
    }
    if (promise.results.length === 0) return setHasMorePages(false);

    const newMovies = promise.results;
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
  }
}
