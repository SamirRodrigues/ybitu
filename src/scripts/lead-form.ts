interface Messages {
  sending: string;
  submit: string;
  errors: {
    required: string;
    email: string;
    phone: string;
    role: string;
    consent: string;
    network: string;
    unconfigured: string;
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Telefone: só dígitos, espaço, +, parênteses, ponto e hífen, com 8 a 15 dígitos (cobre números do Brasil e do exterior). */
function validPhone(value: string): boolean {
  if (!/^[+()\d\s.-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '').length;
  return digits >= 8 && digits <= 15;
}

function init(form: HTMLFormElement) {
  const messages = JSON.parse(form.dataset.messages ?? '{}') as Messages;
  const endpoint = form.dataset.endpoint ?? '';
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const success = form.parentElement?.querySelector<HTMLElement>('[data-success]') ?? null;

  const errorFor = (name: string) => form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  const control = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;

  function setError(name: string, message: string) {
    const el = errorFor(name);
    if (el) el.textContent = message;
    control(name).setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validate(): string | null {
    let firstInvalid: string | null = null;
    const check = (name: string, ok: boolean, message: string) => {
      setError(name, ok ? '' : message);
      if (!ok && !firstInvalid) firstInvalid = name;
    };
    const value = (name: string) => (control(name) as HTMLInputElement).value.trim();

    check('name', value('name').length > 0, messages.errors.required);
    check('email', value('email').length > 0 && EMAIL.test(value('email')), value('email') ? messages.errors.email : messages.errors.required);
    check('phone', validPhone(value('phone')), value('phone') ? messages.errors.phone : messages.errors.required);
    check('role', value('role').length > 0, messages.errors.role);
    check('consent', (control('consent') as HTMLInputElement).checked, messages.errors.consent);
    return firstInvalid;
  }

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name && errorFor(target.name)?.textContent) setError(target.name, '');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';

    const firstInvalid = validate();
    if (firstInvalid) {
      control(firstInvalid).focus();
      return;
    }

    const data = new FormData(form);

    // Campo-isca: pessoas não o veem. Se veio preenchido, finge sucesso e descarta.
    if (String(data.get('website') ?? '').length > 0) {
      showSuccess();
      return;
    }

    if (!endpoint) {
      status.textContent = messages.errors.unconfigured;
      return;
    }

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      role: String(data.get('role') ?? ''),
      city: String(data.get('city') ?? '').trim(),
      consent: true,
      lang: form.dataset.lang ?? '',
      page: location.pathname,
    };

    submit.disabled = true;
    submit.textContent = messages.sending;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      // text/plain evita a requisição de pré-verificação (CORS) que o Apps Script não responde.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = (await response.json()) as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error('rejected');
      showSuccess();
    } catch {
      status.textContent = messages.errors.network;
      submit.disabled = false;
      submit.textContent = messages.submit;
    } finally {
      window.clearTimeout(timeout);
    }
  });

  function showSuccess() {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
  }
}

document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach(init);
