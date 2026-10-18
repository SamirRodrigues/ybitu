import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font } from '../theme';
import type { Cue } from '../timing';
import { useLayout } from './common';

/** Legenda queimada, em tempo absoluto do vídeo, dentro da área segura inferior. */
export const Captions: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, safeBottom, width } = useLayout();
  const ms = (frame / fps) * 1000;
  const cue = cues.find((c) => ms >= c.startMs && ms < c.endMs);
  if (!cue) return null;
  const inFrames = ((ms - cue.startMs) / 1000) * fps;
  const opacity = interpolate(inFrames, [0, 4], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: safeBottom }}>
      <div
        style={{
          maxWidth: width * 0.88,
          padding: vertical ? '14px 30px' : '12px 26px',
          borderRadius: 18,
          background: 'rgba(241, 241, 238, 0.95)',
          boxShadow: '0 6px 18px rgba(74, 40, 20, 0.25)',
          color: color.tinta,
          fontFamily: font.texto,
          fontWeight: 700,
          fontSize: vertical ? 48 : 44,
          lineHeight: 1.25,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          opacity,
        }}
      >
        {cue.text}
      </div>
    </AbsoluteFill>
  );
};
