import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CoverTilt, PaperBackground, PriceTag, TriangleStrip, useEnter, useLayout } from '../components/common';
import { strings } from '../i18n';
import { color, font } from '../theme';
import type { SceneProps } from './types';

/** Cena 4: etiqueta tijolo "Pré-venda / R$ 55,00" cai sobre a capa; abaixo, "Poucas unidades". */
export const Scene4: React.FC<SceneProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, content } = useLayout();
  const t = strings[lang];
  const cover = useEnter(0, 16);
  const head = useEnter(4, 15);
  const drop = spring({ frame: frame - 16, fps, config: { damping: 9, mass: 0.9 } });
  const few = useEnter(44, 13);
  const size = vertical ? 640 : 470;
  const fade = (e: number) => interpolate(e, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  const heading = (
    <div
      style={{
        fontFamily: font.pincel,
        fontSize: vertical ? 120 : 84,
        color: color.tinta,
        lineHeight: 1,
        opacity: fade(head),
        textAlign: vertical ? 'center' : 'left',
      }}
    >
      {t.presaleOpen}
    </div>
  );
  const badge = (
    <div
      style={{
        alignSelf: vertical ? 'center' : 'flex-start',
        background: color.amarelo,
        color: color.tinta,
        fontFamily: font.texto,
        fontWeight: 800,
        fontSize: vertical ? 56 : 42,
        padding: vertical ? '14px 40px' : '10px 28px',
        borderRadius: 999,
        opacity: fade(few),
        transform: `scale(${interpolate(few, [0, 1], [0.7, 1])})`,
        boxShadow: '0 6px 14px rgba(74, 40, 20, 0.2)',
      }}
    >
      {t.fewUnits}
    </div>
  );
  const tag = (
    <PriceTag
      label={t.tagLabel}
      scale={vertical ? 1.1 : 0.85}
      style={{
        position: 'absolute',
        left: -size * 0.08,
        bottom: -size * 0.06,
        transformOrigin: 'left bottom',
        opacity: interpolate(drop, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' }),
        transform: `translateY(${interpolate(drop, [0, 1], [-size * 0.9, 0])}px) rotate(${interpolate(
          drop,
          [0, 1],
          [8, 0],
        )}deg)`,
      }}
    />
  );

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
          gap: vertical ? 60 : 56,
          padding: vertical ? '30px 60px 0' : '60px 50px 0 80px',
        }}
      >
        {vertical ? heading : null}
        <CoverTilt size={size} enter={cover} rotate={3}>
          {tag}
        </CoverTilt>
        {vertical ? (
          badge
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 380 }}>
            {heading}
            {badge}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
