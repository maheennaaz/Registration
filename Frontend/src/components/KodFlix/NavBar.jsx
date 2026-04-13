import React, { useEffect, useState } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`kf-nav ${scrolled ? 'kf-nav--scrolled' : ''}`}>
      <div className="kf-nav__inner kf-container">
        <div className="kf-logo" aria-label="KodFlix">
          <span className="kf-logo__mark">K</span>
          <span className="kf-logo__text">odFlix</span>
        </div>

        <nav className="kf-nav__links" aria-label="Primary">
          <a className="kf-nav__link" href="#trending">
            Trending
          </a>
          <a className="kf-nav__link" href="#popular">
            Popular
          </a>
          <a className="kf-nav__link" href="#toprated">
            Top Rated
          </a>
        </nav>

        <div className="kf-nav__right">
          <div className="kf-search" role="search">
            <span className="kf-search__icon" aria-hidden="true">
              ⌕
            </span>
            <span className="kf-search__hint">Search</span>
          </div>
        </div>
      </div>
    </header>
  );
}

