import React from 'react';

export default function HeroBanner({
  title,
  overview,
  backdrop,
  fallbackBackdrop,
  meta,
}) {
  const bg = backdrop || fallbackBackdrop;

  return (
    <section className="kf-hero" aria-label="Featured">
      <div
        className="kf-hero__bg"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
        }}
      />
      <div className="kf-hero__shade" />
      <div className="kf-hero__content kf-container">
        <div className="kf-hero__left">
          <div className="kf-hero__badge">#1 in KodFlix Today</div>
          <h1 className="kf-hero__title">{title || 'Featured'}</h1>
          {meta ? <div className="kf-hero__meta">{meta}</div> : null}
          <p className="kf-hero__overview">
            {overview || 'Discover something new to watch.'}
          </p>
          <div className="kf-hero__actions">
            <button className="kf-btn kf-btn--primary" type="button">
              Play
            </button>
            <button className="kf-btn kf-btn--ghost" type="button">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

