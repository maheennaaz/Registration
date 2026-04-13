import React from 'react';
import { posterUrl } from '../../services/tmdb';

function getTitle(item) {
  return item?.title || item?.name || item?.original_title || item?.original_name || 'Untitled';
}

export default function MovieCard({ item, variant = 'poster' }) {
  const title = getTitle(item);
  const poster = posterUrl(item?.poster_path, variant === 'posterLarge' ? 'w500' : 'w342');

  return (
    <button className={`kf-card kf-card--${variant}`} type="button" title={title}>
      <div className="kf-card__media">
        {poster ? (
          <img className="kf-card__img" src={poster} alt={title} loading="lazy" />
        ) : (
          <div className="kf-card__fallback" aria-label={title} />
        )}
      </div>
      <div className="kf-card__label" aria-hidden="true">
        {title}
      </div>
    </button>
  );
}

