import { useState, useEffect } from 'react';
import styles from './style.module.css';
import Details from '../../UI/Details';
import MovieDetail from '../MovieDetail';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_TOKEN = 'X7V94BT-WAHMN47-QN1RQ7K-CKHNABG';
  const API_URL = 'https://api.kinopoisk.dev/v1.4/movie';

  const fetchMovies = (query = '', page = 1) => {
    const url = query
      ? `${API_URL}/search?query=${encodeURIComponent(query)}&limit=5&page=${page}`
      : `${API_URL}?year=2023&rating.imdb=8-10&limit=5&page=${page}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.docs || []);
        setTotalPages(data.pages || 1);
      });
  };

  useEffect(() => {
    fetchMovies(searchQuery, currentPage); 
  }, [searchQuery, currentPage]); 

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
    fetchMovies(searchQuery, 1); 
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1); 
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1); 
    }
  };

  return (
    <div className={styles.container}>
      <h1>Поиск</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Поиск фильма"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Искать</button>
      </form>

      <h2>Список фильмов</h2>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movie}>
            <img
              src={movie.poster?.previewUrl}
              alt={movie.name || movie.alternativeName || 'Нет названия'}
              className={styles.movieImage}
            />
            <h4>{movie.name || movie.alternativeName || 'Нет названия'}</h4>
            <div>Рейтинг: {movie.rating.imdb}</div>
            <Details onClick={() => openModal(movie)} />
          </div>
        ))}
      </div>
      {isModalOpen && <MovieDetail movie={selectedMovie} onClose={closeModal} />}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Пред
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          След
        </button>
      </div>
    </div>
  );
}
