import React, { useMemo, useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ id, title, items, cardVariant = 'poster' }) {
  const scrollerRef = useRef(null);

  const safeItems = useMemo(() => (Array.isArray(items) ? items.filter(Boolean) : []), [items]);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="kf-row" aria-label={title} id={id}>
      <div className="kf-container kf-row__header">
        <h2 className="kf-row__title">{title}</h2>
        <div className="kf-row__controls" aria-hidden="true">
          <button className="kf-row__btn" type="button" onClick={() => scrollBy(-1)}>
            ‹
          </button>
          <button className="kf-row__btn" type="button" onClick={() => scrollBy(1)}>
            ›
          </button>
        </div>
      </div>

      <div className="kf-row__rail">
        <div className="kf-row__scroller" ref={scrollerRef}>
          {safeItems.map((item) => (
            <MovieCard
              key={`${item.media_type || 'movie'}-${item.id}`}
              item={item}
              variant={cardVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

