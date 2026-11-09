import React from 'react';

export function CockroachIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Antennae */}
      <path d="M29 14 C25 7, 19 6, 15 7" />
      <path d="M35 14 C39 7, 45 6, 49 7" />
      {/* Head & Pronotum */}
      <ellipse cx="32" cy="18" rx="5.5" ry="4.5" />
      {/* Body / Wings */}
      <path d="M25 22 C23 30, 24 44, 32 52 C40 44, 41 30, 39 22 Z" />
      {/* Center wing split line */}
      <line x1="32" y1="22" x2="32" y2="51" />
      {/* Neck line */}
      <path d="M26.5 22 Q32 24 37.5 22" />
      {/* Front legs */}
      <path d="M26 20 L18 16 L15 21" />
      <path d="M38 20 L46 16 L49 21" />
      {/* Middle legs */}
      <path d="M24 29 L15 28 L12 35" />
      <path d="M40 29 L49 28 L52 35" />
      {/* Back legs */}
      <path d="M25 38 L16 42 L14 51" />
      <path d="M39 38 L48 42 L50 51" />
    </svg>
  );
}

export function SpiderIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Pedipalps / Front */}
      <path d="M29 18 L26 12" />
      <path d="M35 18 L38 12" />
      {/* Cephalothorax */}
      <ellipse cx="32" cy="23" rx="4.5" ry="5" />
      {/* Abdomen */}
      <ellipse cx="32" cy="39" rx="7" ry="10" />
      {/* 4 Left Legs */}
      <path d="M28 21 L18 13 L13 19" />
      <path d="M27.5 24 L15 22 L10 30" />
      <path d="M27.5 27 L15 32 L12 42" />
      <path d="M28 30 L18 41 L16 52" />
      {/* 4 Right Legs */}
      <path d="M36 21 L46 13 L51 19" />
      <path d="M36.5 24 L49 22 L54 30" />
      <path d="M36.5 27 L49 32 L52 42" />
      <path d="M36 30 L46 41 L48 52" />
    </svg>
  );
}

export function RodentIcon({ className = "w-12 h-11" }) {
  return (
    <svg viewBox="0 0 72 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Mouse profile facing right */}
      <path d="M18 38 C17 24, 30 18, 41 24 C44 21, 49 21, 51 25 C55 26, 60 29, 62 32 C60 35, 55 36, 50 36 L52 42 L46 42 M40 38 C34 38, 28 39, 25 42 L18 42" />
      {/* Ear */}
      <path d="M44 24 C42 19, 48 17, 50 23" />
      {/* Eye */}
      <circle cx="54" cy="29" r="1.2" fill="currentColor" />
      {/* Long curved tail underneath */}
      <path d="M18 38 C10 39, 8 46, 17 48 C26 50, 36 49, 44 50" />
    </svg>
  );
}

export function MosquitoIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Proboscis & Antennae */}
      <line x1="32" y1="9" x2="32" y2="17" />
      <path d="M30 15 L25 11" />
      <path d="M34 15 L39 11" />
      {/* Head & Thorax */}
      <circle cx="32" cy="19" r="2.8" />
      <ellipse cx="32" cy="26" rx="4" ry="5.5" />
      {/* Elongated segmented abdomen */}
      <path d="M29.5 31.5 L32 51 L34.5 31.5 Z" />
      {/* Wings */}
      <path d="M28 24 C17 19, 10 22, 11 27 C12 31, 21 30, 29 28" />
      <path d="M36 24 C47 19, 54 22, 53 27 C52 31, 43 30, 35 28" />
      {/* Legs */}
      <path d="M29 22 L20 14 L15 18" />
      <path d="M35 22 L44 14 L49 18" />
      <path d="M28 28 L18 34 L14 42" />
      <path d="M36 28 L46 34 L50 42" />
      <path d="M30 33 L23 44 L21 53" />
      <path d="M34 33 L41 44 L43 53" />
    </svg>
  );
}
