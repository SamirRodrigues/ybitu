import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Captions } from './components/Captions';
import { SceneFade } from './components/common';
import type { Lang } from './i18n';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import type { SceneProps } from './scenes/types';
import type { Cue } from './timing';

export type PromoProps = {
  lang: Lang;
  scenes: { from: number; duration: number }[];
  hasAudio: boolean;
  cues: Cue[];
};

const SCENES: React.FC<SceneProps>[] = [Scene1, Scene2, Scene3, Scene4, Scene5];

export const Promo: React.FC<PromoProps> = ({ lang, scenes, hasAudio, cues }) => (
  <AbsoluteFill style={{ backgroundColor: '#f1f1ee' }}>
    {scenes.map((s, i) => {
      const Scene = SCENES[i];
      return (
        <Sequence key={i} from={s.from} durationInFrames={s.duration} name={`Cena ${i + 1}`}>
          {/* Cena 1 começa direto; a 5 tem a própria cortina circular. */}
          <SceneFade skip={i === 0 || i === 4}>
            <Scene lang={lang} duration={s.duration} />
          </SceneFade>
          {hasAudio ? <Audio src={staticFile(`audio/${lang}/cena${i + 1}.wav`)} /> : null}
        </Sequence>
      );
    })}
    <Captions cues={cues} />
  </AbsoluteFill>
);
