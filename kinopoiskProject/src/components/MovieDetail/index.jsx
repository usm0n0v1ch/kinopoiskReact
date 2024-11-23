

import styles from './style.module.css'



export default function MovieDetail({movie, onClose}) {
    
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.titleAndClose}>
                    <h2>Детали фильма</h2>
                    <button className={styles.closeBtn} onClick={onClose}>x</button>
                </div>
                <div key={movie.id} className={styles.movie}>
                        <div>
                            <img src={movie.poster?.previewUrl}
                            alt={movie.name||movie.alternativeName||'Нет названия'}
                            className={styles.movieImage}
                            />
                            <h4>{movie.name||movie.alternativeName||'Нет названия'}</h4>
                            <div>Рейтинг: {movie.rating.imdb}</div>
                            <div>Год: {movie.year}</div>
                            <div>Жанр: {movie.genres.map((genre)=> genre.name).join(', ')}</div>
                        </div>
                       <div>
                            
                            <div>Описание: {movie.shortDescription}</div>
                       </div>
                        
                        
                    </div>
            </div>
        </div>
        
    )
}