import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { PaperBackground, TriangleStrip, useEnter, useLayout } from '../components/common';
import { strings } from '../i18n';
import { color, font } from '../theme';
import type { SceneProps } from './types';

/** Cena 1: papel, faixa de triângulos se revela de cima para baixo, "Ybitu". */
export const Scene1: React.FC<SceneProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { vertical, content } = useLayout();
  const t = strings[lang];
  const strip = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' });
  const base = interpolate(frame, [12, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word = useEnter(14, 12);
  return (
    <AbsoluteFill>
      <PaperBackground />
      <TriangleStrip edge="top" progress={strip} />
      {vertical ? <TriangleStrip edge="bottom" progress={base} /> : null}
      <AbsoluteFill
        style={{ top: content.top, bottom: content.bottom, height: 'auto', justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          style={{
            fontFamily: font.pincel,
            fontSize: vertical ? 300 : 240,
            color: color.azul,
            lineHeight: 1,
            opacity: interpolate(word, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(word, [0, 1], [0.8, 1])}) rotate(-3deg)`,
          }}
        >
          {t.title}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
