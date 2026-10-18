import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Marker, PaperBackground, useEnter, useLayout } from '../components/common';
import { strings } from '../i18n';
import { color, font, SITE } from '../theme';
import type { SceneProps } from './types';

/** Cena 5: fundo tijolo, "Reserve o seu" e o endereço, que pulsa uma vez. Entra com cortina circular. */
export const Scene5: React.FC<SceneProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { vertical, content } = useLayout();
  const t = strings[lang];
  const wipe = interpolate(frame, [0, 14], [0, 150], { extrapolateRight: 'clamp' });
  const cta = useEnter(8, 14);
  const url = useEnter(18, 14);
  // Pulso único do endereço (só interpolate sobre o frame).
  const pulse = interpolate(frame, [40, 50, 62], [1, 1.1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fade = (e: number) => interpolate(e, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
  const markers = [color.amarelo, color.laranja, color.amarelo, color.laranja, color.amarelo];
  return (
    <AbsoluteFill style={{ clipPath: `circle(${wipe}% at 50% 50%)` }}>
      <PaperBackground tint={color.tijolo} textureOpacity={0.55} />
      <AbsoluteFill
        style={{
          top: content.top,
          bottom: content.bottom,
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          gap: vertical ? 50 : 34,
          color: color.branco,
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 22, opacity: fade(cta) }}>
          {markers.map((m, i) => (
            <Marker key={i} size={vertical ? 46 : 38} fill={m} />
          ))}
        </div>
        <div
          style={{
            fontFamily: font.pincel,
            fontSize: vertical ? 170 : 140,
            lineHeight: 1,
            opacity: fade(cta),
            transform: `translateY(${interpolate(cta, [0, 1], [40, 0])}px)`,
          }}
        >
          {t.cta}
        </div>
        <div
          style={{
            fontFamily: font.texto,
            fontWeight: 800,
            fontSize: vertical ? 78 : 70,
            letterSpacing: '0.01em',
            opacity: fade(url),
            transform: `scale(${pulse * interpolate(url, [0, 1], [0.85, 1])})`,
            borderBottom: `8px solid ${color.amarelo}`,
            paddingBottom: 6,
          }}
        >
          {SITE}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
