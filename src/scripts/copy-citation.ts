// Copia a referência ABNT para a área de transferência. Se o navegador não permitir, seleciona o texto.
document.querySelectorAll<HTMLButtonElement>('[data-copy-citation]').forEach((button) => {
  const box = button.closest<HTMLElement>('[data-citation]')!;
  const status = box.querySelector<HTMLElement>('[data-copy-status]')!;
  let timer: number | undefined;

  const say = (message: string) => {
    status.textContent = message;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (status.textContent = ''), 4000);
  };

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.text ?? '');
      say(button.dataset.copied ?? '');
    } catch {
      const target = box.querySelector<HTMLElement>('[data-citation-text]')!;
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      say(button.dataset.failed ?? '');
    }
  });
});
