// Carrega o player do YouTube (domínio sem cookies) só depois do clique.
document.querySelectorAll<HTMLButtonElement>('[data-load-video]').forEach((button) => {
  button.addEventListener('click', () => {
    const frame = button.parentElement!;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.loadVideo!)}?autoplay=1&rel=0`;
    iframe.title = button.dataset.title ?? '';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.replaceChildren(iframe);
    iframe.focus();
  });
});
