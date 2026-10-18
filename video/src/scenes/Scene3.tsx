import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { PaperBackground, TriangleStrip, useEnter, useLayout } from '../components/common';
import { strings } from '../i18n';
import { color, font } from '../theme';
import type { SceneProps } from './types';

/**
 * Cena 3: a história. "Inédito" e a frase potiguar entram em sequência com a fala.
 * Os créditos não ficam aqui: aparecem pequenos na cena final.
 */
export const Scene3: React.FC<SceneProps> = ({ lang }) => {
  const { vertical, content } = useLayout();
  const t = strings[lang].story;
  const pill = useEnter(6, 13);
  const l1 = useEnter(30, 15);
  const l2 = useEnter(58, 15);
  const fade = (e: number) => interpolate(e, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
  const rise = (e: number) => `translateY(${interpolate(e, [0, 1], [46, 0])}px)`;
  return (
    <AbsoluteFill>
      <PaperBackground />
      <TriangleStrip edge="top" progress={1} />
      {vertical ? <TriangleStrip edge="bottom" progress={1} /> : null}
      <AbsoluteFill
        style={{
          top: content.top,
          bottom: content.bottom,
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          gap: vertical ? 56 : 30,
          padding: vertical ? '0 80px' : '40px 90px 0',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: font.texto,
            fontWeight: 800,
            fontSize: vertical ? 54 : 40,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: color.amarelo,
            color: color.tinta,
            padding: vertical ? '14px 44px' : '10px 34px',
            borderRadius: 999,
            opacity: fade(pill),
            transform: `scale(${interpolate(pill, [0, 1], [0.7, 1])}) rotate(-3deg)`,
          }}
        >
          {t.pill}
        </div>
        <div
          style={{
            fontFamily: font.pincel,
            fontSize: vertical ? 150 : 100,
            lineHeight: 1,
            color: color.azul,
            opacity: fade(l1),
            transform: rise(l1),
            textWrap: 'balance',
          }}
        >
          {t.line1}
        </div>
        <div
          style={{
            fontFamily: font.pincel,
            fontSize: vertical ? 96 : 66,
            lineHeight: 1.05,
            color: color.tinta,
            opacity: fade(l2),
            transform: rise(l2),
            textWrap: 'balance',
          }}
        >
          {t.line2}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
