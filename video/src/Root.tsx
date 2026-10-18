import React from 'react';
import { CalculateMetadataFunction, Composition } from 'remotion';
import { loadFonts } from './fonts';
import type { Lang } from './i18n';
import { Promo, PromoProps } from './Promo';
import { FPS } from './theme';
import { loadCaptions, loadDurations, sceneFrames, sceneSeconds } from './timing';

loadFonts();

/** Duração derivada de public/audio/durations.json; sem ele, 34 s do roteiro. */
const calculateMetadata: CalculateMetadataFunction<PromoProps> = async ({ props }) => {
  const durations = await loadDurations();
  const scenes = sceneFrames(sceneSeconds(props.lang, durations));
  const last = scenes[scenes.length - 1];
  return {
    durationInFrames: last.from + last.duration,
    props: { ...props, scenes, hasAudio: durations !== null, cues: await loadCaptions(props.lang) },
  };
};

const formats = [
  { id: '9x16', width: 1080, height: 1920 },
  { id: '1x1', width: 1080, height: 1080 },
];
const langs: Lang[] = ['pt', 'es'];

export const RemotionRoot: React.FC = () => (
  <>
    {formats.flatMap((f) =>
      langs.map((lang) => (
        <Composition
          key={`${lang}-${f.id}`}
          id={`Promo-${lang}-${f.id}`}
          component={Promo}
          fps={FPS}
          width={f.width}
          height={f.height}
          durationInFrames={34 * FPS}
          defaultProps={{ lang, scenes: sceneFrames(sceneSeconds(lang, null)), hasAudio: false, cues: [] }}
          calculateMetadata={calculateMetadata}
        />
      )),
    )}
  </>
);
