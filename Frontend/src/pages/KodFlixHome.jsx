import React from 'react';

export default function KodFlixHome() {
  return (
    <div className="kf-app">
      <main className="kf-main">
        <div className="kf-container" style={{ paddingTop: 64 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: 0.2 }}>
            KodFlix
          </h1>
          <p style={{ color: 'var(--kf-muted)', marginTop: 8, maxWidth: 720 }}>
            Loading movies…
          </p>
        </div>
      </main>
    </div>
  );
}

