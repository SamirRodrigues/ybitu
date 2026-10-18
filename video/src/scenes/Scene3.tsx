import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Credits, PaperBackground, TriangleStrip, useLayout } from '../components/common';
import { strings } from '../i18n';
import type { SceneProps } from './types';

/**
 * Cena 3: créditos em sequência, cada um com triângulo marcador, todos com o mesmo peso.
 * Os narradores são as pessoas cujas histórias inspiraram o livro (a voz deles não é usada).
 */
export const Scene3: React.FC<SceneProps> = ({ lang, duration }) => {
  const { vertical, content } = useLayout();
  const t = strings[lang];
  // Entradas acompanham a fala: texto, ilustrações, narradores.
  const starts = [4, Math.round(duration * 0.22), Math.round(duration * 0.36)];
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
          padding: vertical ? '0 70px' : '40px 90px 0',
        }}
      >
        <Credits
          items={t.credits}
          starts={starts}
          labelSize={vertical ? 40 : 30}
          nameSize={vertical ? 78 : 64}
          gap={vertical ? 64 : 34}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
