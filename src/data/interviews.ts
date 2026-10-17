import type { Bilingual } from '../i18n';

export interface InterviewItem {
  id: string;
  kind: 'video' | 'audio';
  title: Bilingual;
  /** Quem narra. Preencha quando a gravação for publicada. */
  narrator?: Bilingual;
  summary: Bilingual;
  /**
   * Fonte da gravação. Deixe `media` vazio enquanto a edição não termina: o site mostra o espaço reservado.
   *  - { type: 'youtube', id: 'ID_DO_VIDEO' }  → player do YouTube (modo sem cookies, carrega só no clique)
   *  - { type: 'file', src: '/media/arquivo.mp4' } → arquivo hospedado no próprio site (coloque em public/media/)
   */
  media?: { type: 'youtube'; id: string } | { type: 'file'; src: string; poster?: string; captions?: string; captionsLang?: string };
  /** Link da transcrição (acessibilidade). Opcional. */
  transcriptUrl?: string;
}

export const interviews: InterviewItem[] = [
  {
    id: 'video-1',
    kind: 'video',
    title: { pt: 'Entrevista em vídeo 1', es: 'Entrevista en video 1' },
    summary: {
      pt: 'O nome de quem narra e um resumo da conversa serão publicados junto com a gravação.',
      es: 'El nombre de quien narra y un resumen de la conversación se publicarán junto con la grabación.',
    },
  },
  {
    id: 'video-2',
    kind: 'video',
    title: { pt: 'Entrevista em vídeo 2', es: 'Entrevista en video 2' },
    summary: {
      pt: 'O nome de quem narra e um resumo da conversa serão publicados junto com a gravação.',
      es: 'El nombre de quien narra y un resumen de la conversación se publicarán junto con la grabación.',
    },
  },
  {
    id: 'audio-1',
    kind: 'audio',
    title: { pt: 'Entrevista em áudio', es: 'Entrevista en audio' },
    summary: {
      pt: 'O nome de quem narra e um resumo da conversa serão publicados junto com a gravação.',
      es: 'El nombre de quien narra y un resumen de la conversación se publicarán junto con la grabación.',
    },
  },
];
