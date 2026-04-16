'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get('company'),
      name:    formData.get('name'),
      email:   formData.get('email'),
      program: formData.get('program'),
      message: formData.get('message'),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="cf-success">
        <span className="cf-success__line" aria-hidden="true" />
        <h2 className="cf-success__title">{t('successTitle')}</h2>
        <p className="cf-success__body">{t('successMessage')}</p>
        <style>{successStyle}</style>
      </div>
    );
  }

  const fields: Array<{
    name: string;
    label: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    element?: 'textarea' | 'select';
  }> = [
    { name: 'company', label: t('fields.company'),  required: true,  type: 'text',  placeholder: t('fields.companyPlaceholder') },
    { name: 'name',    label: t('fields.name'),     required: true,  type: 'text',  placeholder: t('fields.namePlaceholder') },
    { name: 'email',   label: t('fields.email'),    required: true,  type: 'email', placeholder: t('fields.emailPlaceholder') },
    { name: 'program', label: t('fields.program'),  required: false, element: 'select' },
    { name: 'message', label: t('message'),         required: true,  element: 'textarea', placeholder: t('messagePlaceholder') },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="cf-form">
        <div className="cf-table">
          {fields.map((field) => (
            <div key={field.name} className="cf-row">
              {/* ラベル列 */}
              <div className="cf-row__label">
                <span className="cf-row__label-text">{field.label}</span>
                {field.required && (
                  <span className="cf-row__required">{t('required')}</span>
                )}
              </div>

              {/* 入力列 */}
              <div className="cf-row__field">
                {field.element === 'textarea' ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={6}
                    placeholder={field.placeholder}
                    className={`cf-input cf-textarea${focusedField === field.name ? ' cf-input--focus' : ''}`}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                ) : field.element === 'select' ? (
                  <select
                    name={field.name}
                    className={`cf-input cf-select${focusedField === field.name ? ' cf-input--focus' : ''}`}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">{t('fields.programPlaceholder')}</option>
                    <option value="corporate-gift">{t('programs.corporateGift')}</option>
                    <option value="cultural-space">{t('programs.culturalSpace')}</option>
                    <option value="hotel-branding">{t('programs.hotelBranding')}</option>
                    <option value="sake-masu">{t('programs.sakeMasu')}</option>
                    <option value="bespoke">{t('programs.bespoke')}</option>
                    <option value="undecided">{t('programs.undecided')}</option>
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={`cf-input${focusedField === field.name ? ' cf-input--focus' : ''}`}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {status === 'error' && (
          <p className="cf-error">{t('errorMessage')}</p>
        )}

        <div className="cf-footer">
          <p className="cf-note">{t('note')}</p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`cf-submit${status === 'submitting' ? ' cf-submit--busy' : ''}`}
          >
            {status === 'submitting' ? t('submitting') : t('submit')}
          </button>
        </div>
      </form>

      <style>{formStyle}</style>
    </>
  );
}

const formStyle = `
  /* ── Form wrapper ────────────────────────────────────── */
  .cf-form {
    width: 100%;
  }

  /* ── Table rows ──────────────────────────────────────── */
  .cf-table {
    border-top: 1px solid var(--color-line);
  }
  .cf-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--color-line);
    min-height: 72px;
  }

  /* ── Label column ────────────────────────────────────── */
  .cf-row__label {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 1.25rem 1.5rem 1.25rem 0;
    background: var(--color-off-white);
    border-right: 1px solid var(--color-line);
    flex-shrink: 0;
  }
  .cf-row__label-text {
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 1.0625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink-light);
    padding-left: 1.5rem;
  }
  .cf-row__required {
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 0.8125rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-white);
    background: var(--color-accent);
    padding: 0.2em 0.5em;
    border-radius: 2px;
    line-height: 1.5;
    white-space: nowrap;
  }

  /* ── Field column ────────────────────────────────────── */
  .cf-row__field {
    display: flex;
    align-items: stretch;
    padding: 1rem 0 1rem 1.5rem;
    background: var(--color-white);
  }

  /* ── Input base ──────────────────────────────────────── */
  .cf-input {
    width: 100%;
    background: transparent;
    border: 1px solid var(--color-line);
    border-radius: 3px;
    padding: 0.75rem 1rem;
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 400;
    font-size: 1.0625rem;
    color: var(--color-ink);
    outline: none;
    transition: border-color 0.2s ease;
    -webkit-appearance: none;
    letter-spacing: 0.03em;
  }
  .cf-input::placeholder {
    color: var(--color-line-dark);
    font-size: 0.8125rem;
  }
  .cf-input:focus,
  .cf-input--focus {
    border-color: var(--color-ink);
  }
  .cf-textarea {
    resize: vertical;
    min-height: 140px;
    align-self: stretch;
    line-height: 1.85;
  }
  .cf-select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%234A4740' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  /* ── Footer ──────────────────────────────────────────── */
  .cf-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.75rem;
    padding-top: 2.5rem;
  }
  .cf-note {
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 1.0625rem;
    letter-spacing: 0.06em;
    color: var(--color-ink-light);
    line-height: 1.8;
    margin: 0;
  }

  /* ── Submit button ───────────────────────────────────── */
  .cf-submit {
    background: var(--color-ink);
    border: 1px solid var(--color-ink);
    color: var(--color-white);
    padding: 0.875rem 2.5rem;
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 1.0625rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      border-color 0.25s ease;
  }
  .cf-submit:hover:not(:disabled) {
    background: transparent;
    color: var(--color-ink);
  }
  .cf-submit--busy {
    opacity: 0.5;
    cursor: wait;
  }
  .cf-error {
    font-family: var(--font-jost), Jost, sans-serif;
    font-size: 1.0625rem;
    letter-spacing: 0.05em;
    color: #8B4513;
    margin: 1.5rem 0 0;
  }

  /* ── Responsive ──────────────────────────────────────── */
  @media (max-width: 640px) {
    .cf-row {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .cf-row__label {
      padding: 0.875rem 1rem;
      border-right: none;
      border-bottom: 1px solid var(--color-line);
    }
    .cf-row__label-text {
      padding-left: 0;
    }
    .cf-row__field {
      padding: 0.875rem 0;
    }
  }
`;

const successStyle = `
  .cf-success {
    text-align: center;
    padding: 5rem 0;
  }
  .cf-success__line {
    display: block;
    width: 32px;
    height: 1px;
    background: var(--color-accent);
    margin: 0 auto 3rem;
  }
  .cf-success__title {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 400;
    font-size: 1.75rem;
    color: var(--color-ink);
    margin: 0 0 1.25rem;
    letter-spacing: 0.05em;
  }
  .cf-success__body {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 400;
    font-size: 1.0625rem;
    color: var(--color-ink-light);
    line-height: 2;
    letter-spacing: 0.04em;
    white-space: pre-line;
    margin: 0;
  }
`;
