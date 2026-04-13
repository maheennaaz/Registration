import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/KodFlix/NavBar';
import HeroBanner from '../components/KodFlix/HeroBanner';
import MovieRow from '../components/KodFlix/MovieRow';
import netflixReference from '../assets/netflix-reference.png';
import {
  backdropUrl,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrending,
} from '../services/tmdb';

function titleOf(item) {
  return (
    item?.title ||
    item?.name ||
    item?.original_title ||
    item?.original_name ||
    'Untitled'
  );
}

function isGoodFeatured(item) {
  if (!item) return false;
  const t = titleOf(item);
  if (!t || t === 'Untitled') return false;
  if (item.media_type === 'person') return false;
  return true;
}

function yearOf(item) {
  const d = item?.release_date || item?.first_air_date;
  return d ? String(d).slice(0, 4) : null;
}

function ratingOf(item) {
  const v = typeof item?.vote_average === 'number' ? item.vote_average : null;
  return v ? `${v.toFixed(1)} ★` : null;
}

export default function KodFlixHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const [t, p, r, n] = await Promise.all([
          fetchTrending(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchNowPlayingMovies(),
        ]);

        if (cancelled) return;

        setTrending(t?.results || []);
        setPopular(p?.results || []);
        setTopRated(r?.results || []);
        setNowPlaying(n?.results || []);
      } catch (e) {
        if (cancelled) return;
        const message =
          e?.response?.data?.status_message ||
          e?.message ||
          'Failed to fetch movies from TMDB.';
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => {
    const pools = [trending, nowPlaying, popular, topRated]
      .filter((x) => Array.isArray(x))
      .flat()
      .filter(isGoodFeatured);
    if (pools.length === 0) return null;
    return pools[Math.floor(Math.random() * pools.length)];
  }, [trending, nowPlaying, popular, topRated]);

  const featuredMeta = useMemo(() => {
    if (!featured) return null;
    const bits = [yearOf(featured), ratingOf(featured)];
    return bits.filter(Boolean).join(' • ');
  }, [featured]);

  const featuredBackdrop = featured ? backdropUrl(featured.backdrop_path, 'w1280') : null;
  const fallbackBackdrop = netflixReference;
  const heroTitle = error ? 'KodFlix' : featured ? titleOf(featured) : 'KodFlix';
  const heroOverview = error
    ? 'TMDB is not connected in this deployment. Set the VITE_TMDB_API_KEY environment variable on Vercel and redeploy.'
    : featured?.overview;

  return (
    <div className="kf-app">
      <NavBar />
      <main className="kf-main">
        <HeroBanner
          title={heroTitle}
          overview={heroOverview}
          meta={featuredMeta}
          backdrop={featuredBackdrop}
          fallbackBackdrop={fallbackBackdrop}
        />

        {error ? (
          <div className="kf-toast kf-toast--error" role="alert">
            <div className="kf-toast__title">TMDB fetch failed</div>
            <div className="kf-toast__body">{error}</div>
            <div className="kf-toast__body" style={{ marginTop: 6 }}>
              On Vercel, add <strong>VITE_TMDB_API_KEY</strong> in Project Settings → Environment Variables, then redeploy.
            </div>
          </div>
        ) : null}

        <div className="kf-container kf-status">
          {loading ? (
            <div className="kf-status__panel">Fetching movies from TMDB…</div>
          ) : null}
          {error ? (
            <div className="kf-status__panel kf-status__panel--error">
              {error}
            </div>
          ) : null}
        </div>

        {!error ? (
          <>
            <MovieRow id="trending" title="Trending Now" items={trending} cardVariant="posterLarge" />
            <MovieRow id="popular" title="Popular Movies" items={popular} />
            <MovieRow id="toprated" title="Top Rated" items={topRated} />
            <MovieRow id="nowplaying" title="Now Playing" items={nowPlaying} />
          </>
        ) : null}
      </main>
    </div>
  );
}
