import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { color, font, formatPrice, shadow } from '../theme';

/** Layout: vertical (9:16) ou quadrado (1:1), com área segura. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const safeTop = Math.round(height * (vertical ? 0.12 : 0.06));
  const safeBottom = Math.round(height * (vertical ? 0.12 : 0.05));
  const captionBox = vertical ? 200 : 170;
  return {
    width,
    height,
    vertical,
    safeTop,
    safeBottom,
    /** Área para o conteúdo da cena, acima das legendas. */
    content: { top: safeTop, bottom: safeBottom + captionBox },
  };
};

/** Entrada com mola (0 → 1) a partir de `delay` frames. */
export const useEnter = (delay = 0, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.8 } });
};

/** Papel de aquarela: cor do papel + textura em multiply, como o body do site. */
export const PaperBackground: React.FC<{ tint?: string; textureOpacity?: number }> = ({
  tint = color.papel,
  textureOpacity = 1,
}) => (
  <AbsoluteFill style={{ backgroundColor: tint }}>
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile('assets/papel.webp')})`,
        backgroundSize: '700px auto',
        mixBlendMode: 'multiply',
        opacity: textureOpacity,
      }}
    />
  </AbsoluteFill>
);

/** Faixa de triângulos que se revela (topo: de cima para baixo; base: de baixo para cima). */
export const TriangleStrip: React.FC<{
  edge: 'top' | 'bottom';
  progress: number;
  height?: number;
}> = ({ edge, progress, height }) => {
  const { width } = useVideoConfig();
  const p = Math.min(1, Math.max(0, progress));
  const src = staticFile(edge === 'top' ? 'assets/triangulos-topo.webp' : 'assets/triangulos-base.webp');
  const h = height ?? Math.round(width * (edge === 'top' ? 300 : 260) / 2000);
  const hidden = `${(1 - p) * 100}%`;
  return (
    <Img
      src={src}
      style={{
        position: 'absolute',
        left: 0,
        [edge]: 0,
        width,
        height: h,
        objectFit: 'cover',
        objectPosition: edge === 'top' ? 'center top' : 'center bottom',
        mixBlendMode: 'multiply',
        clipPath: edge === 'top' ? `inset(0 0 ${hidden} 0)` : `inset(${hidden} 0 0 0)`,
      }}
    />
  );
};

/** Capa inclinada com sombra. `enter` 0→1 controla a entrada. */
export const CoverTilt: React.FC<{
  size: number;
  enter: number;
  rotate?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ size, enter, rotate = -4, style, children }) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      transform: `translateY(${interpolate(enter, [0, 1], [size * 0.35, 0])}px) rotate(${interpolate(
        enter,
        [0, 1],
        [rotate - 10, rotate],
      )}deg) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
      opacity: interpolate(enter, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
      ...style,
    }}
  >
    <Img
      src={staticFile('assets/capa-640.webp')}
      style={{ width: size, height: size, borderRadius: 6, filter: shadow, display: 'block' }}
    />
    {children}
  </div>
);

/** Fita tijolo "Pré-venda / R$ 55,00", espelhando .price-tag do site (escala ×2,6). */
export const PriceTag: React.FC<{ label: string; scale?: number; style?: React.CSSProperties }> = ({
  label,
  scale = 1,
  style,
}) => {
  const k = 2.6 * scale;
  return (
    <div style={{ filter: 'drop-shadow(0 8px 10px rgba(74, 40, 20, 0.35))', ...style }}>
      <div
        style={{
          display: 'grid',
          gap: 4 * k,
          padding: `${9.6 * k}px ${25.6 * k}px ${11.2 * k}px ${16 * k}px`,
          background: color.tijolo,
          color: color.branco,
          clipPath: `polygon(0 0, 100% 0, calc(100% - ${14.4 * k}px) 50%, 100% 100%, 0 100%)`,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily: font.texto,
            fontWeight: 800,
            fontSize: 12.8 * k,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: font.pincel,
            fontSize: 40 * k,
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          {formatPrice()}
        </span>
      </div>
    </div>
  );
};

/** Triângulo marcador (como as faixas). */
export const Marker: React.FC<{ size: number; fill: string }> = ({ size, fill }) => (
  <div
    style={{
      width: size,
      height: size * 0.9,
      background: fill,
      clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
      flexShrink: 0,
    }}
  />
);

/**
 * Créditos: texto, ilustrações e narradores, todos com o mesmo peso.
 * `starts`: frame de entrada de cada item.
 */
export const Credits: React.FC<{
  items: readonly { label: string; names: readonly string[] }[];
  starts: number[];
  labelSize: number;
  nameSize: number;
  gap: number;
}> = ({ items, starts, labelSize, nameSize, gap }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const markers = [color.tijolo, color.laranja, color.azul];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.map((item, i) => {
        const e = spring({ frame: frame - starts[i], fps, config: { damping: 15 } });
        return (
          <div
            key={item.label}
            style={{
              display: 'flex',
              gap: labelSize * 0.8,
              alignItems: 'flex-start',
              opacity: interpolate(e, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateX(${interpolate(e, [0, 1], [-60, 0])}px)`,
            }}
          >
            <div style={{ paddingTop: labelSize * 0.25 }}>
              <Marker size={labelSize * 1.1} fill={markers[i % markers.length]} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: font.texto,
                  fontWeight: 800,
                  fontSize: labelSize,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: color.tintaSuave,
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </div>
              {item.names.map((n) => (
                <div
                  key={n}
                  style={{ fontFamily: font.pincel, fontSize: nameSize, color: color.tinta, lineHeight: 1.08, whiteSpace: 'nowrap' }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Cena com entrada suave (transição): fade + leve subida nos primeiros frames. */
export const SceneFade: React.FC<{ children: React.ReactNode; frames?: number; skip?: boolean }> = ({
  children,
  frames = 9,
  skip,
}) => {
  const frame = useCurrentFrame();
  const t = skip ? 1 : interpolate(frame, [0, frames], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: t, transform: `translateY(${(1 - t) * 24}px)` }}>{children}</AbsoluteFill>
  );
};
