import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { CoverTilt, PaperBackground, TriangleStrip, useEnter, useLayout } from '../components/common';
import { strings } from '../i18n';
import { color, font } from '../theme';
import type { SceneProps } from './types';

/** Cena 2: a capa entra inclinada com sombra; título em Caveat Brush. */
export const Scene2: React.FC<SceneProps> = ({ lang }) => {
  const { vertical, content } = useLayout();
  const t = strings[lang];
  const cover = useEnter(0, 13);
  const title = useEnter(16, 15);
  const titleStyle: React.CSSProperties = {
    opacity: interpolate(title, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(title, [0, 1], [40, 0])}px)`,
    color: color.tinta,
    textAlign: vertical ? 'center' : 'left',
  };
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
          flexDirection: vertical ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: vertical ? 70 : 50,
          padding: vertical ? '40px 80px 0' : '50px 60px 0',
        }}
      >
        <CoverTilt size={vertical ? 760 : 500} enter={cover} rotate={-4} />
        <div style={{ ...titleStyle, maxWidth: vertical ? 900 : 420 }}>
          <div style={{ fontFamily: font.pincel, fontSize: vertical ? 150 : 120, color: color.azul, lineHeight: 0.95 }}>
            {t.title}
          </div>
          <div style={{ fontFamily: font.pincel, fontSize: vertical ? 78 : 60, lineHeight: 1.05 }}>{t.subtitle}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
