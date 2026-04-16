'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', program: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ company: '', name: '', email: '', phone: '', program: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="cf-success">
        <div className="cf-success__icon">✓</div>
        <h2 className="cf-success__title">{t('successTitle')}</h2>
        <p className="cf-success__body">{t('successMessage')}</p>
        <Link href={isJa ? '/' : '/en'} className="cf-success__link">
          {isJa ? '← トップページに戻る' : '← Back to home'}
        </Link>
        <style>{successCSS}</style>
      </div>
    );
  }

  return (
    <>
      {/* Description card */}
      <div className="cf-card cf-desc">
        <p className="cf-desc__text">
          {isJa
            ? 'プログラムに関するご質問・ご相談は、以下のフォームよりお問い合わせください。内容を確認の上、2営業日以内にご連絡いたします。'
            : 'For enquiries about our programmes, please use the form below. We will respond within two business days.'}
        </p>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="cf-card">
          <div className="cf-fields">

            {/* 会社名・組織名 */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{t('fields.company')}</span>
                <span className="cf-badge">{t('required')}</span>
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="cf-input"
                placeholder={t('fields.companyPlaceholder')}
              />
            </div>

            {/* お名前 */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{t('fields.name')}</span>
                <span className="cf-badge">{t('required')}</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="cf-input"
                placeholder={t('fields.namePlaceholder')}
              />
            </div>

            {/* メールアドレス */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{t('fields.email')}</span>
                <span className="cf-badge">{t('required')}</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="cf-input"
                placeholder={t('fields.emailPlaceholder')}
              />
            </div>

            {/* 電話番号 */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{isJa ? '電話番号' : 'Phone'}</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="cf-input"
                placeholder={isJa ? '090-XXXX-XXXX' : '+81 90-XXXX-XXXX'}
              />
            </div>

            {/* プログラム */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{t('fields.program')}</span>
              </label>
              <select
                value={form.program}
                onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                className="cf-input cf-select"
              >
                <option value="">{t('fields.programPlaceholder')}</option>
                <option value="corporate-gift">{t('programs.corporateGift')}</option>
                <option value="cultural-space">{t('programs.culturalSpace')}</option>
                <option value="hotel-branding">{t('programs.hotelBranding')}</option>
                <option value="sake-masu">{t('programs.sakeMasu')}</option>
                <option value="bespoke">{t('programs.bespoke')}</option>
                <option value="undecided">{t('programs.undecided')}</option>
              </select>
            </div>

            {/* お問い合わせ内容 */}
            <div className="cf-field">
              <label className="cf-label">
                <span className="cf-label__text">{t('message')}</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={6}
                className="cf-input cf-textarea"
                placeholder={t('messagePlaceholder')}
              />
            </div>

          </div>
        </div>

        {/* Privacy card */}
        <div className="cf-card cf-privacy">
          <p className="cf-privacy__text">
            {isJa
              ? <>当社（合同会社FOMUS）は、お客様より取得する個人情報を、お問い合わせへの回答目的でのみ利用いたします。</>
              : <>FOMUS LLC uses personal information collected through this form solely for the purpose of responding to your enquiry.</>}
          </p>
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="cf-error">
            {isJa ? '送信に失敗しました。時間をおいて再度お試しください。' : 'Submission failed. Please try again later.'}
          </div>
        )}

        {/* Submit */}
        <div className="cf-submit-wrap">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="cf-submit"
          >
            {status === 'submitting'
              ? (isJa ? '送信中...' : 'Sending...')
              : (isJa ? '送信する' : 'Submit')}
          </button>
        </div>
      </form>

      <style>{formCSS}</style>
    </>
  );
}

const formCSS = `
  /* ── Card base ───────────────────────────── */
  .cf-card {
    background: var(--color-white);
    border: 1px solid var(--color-line);
    padding: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: 1.25rem;
  }

  /* ── Description card ────────────────────── */
  .cf-desc__text {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 300;
    font-size: clamp(0.875rem, 1.1vw, 0.9375rem);
    line-height: 2;
    color: var(--color-ink-light);
    margin: 0;
  }

  /* ── Form fields ─────────────────────────── */
  .cf-fields {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .cf-field {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .cf-label {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .cf-label__text {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 400;
    font-size: 0.9375rem;
    color: var(--color-ink);
    letter-spacing: 0.04em;
  }

  .cf-badge {
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 0.6875rem;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: var(--color-white);
    background: var(--color-accent);
    padding: 0.15em 0.5em;
    border-radius: 2px;
    line-height: 1.6;
  }

  /* ── Input base ──────────────────────────── */
  .cf-input {
    width: 100%;
    background: var(--color-white);
    border: 1px solid var(--color-line);
    padding: 0.85rem 1rem;
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 300;
    font-size: 1rem;
    color: var(--color-ink);
    outline: none;
    transition: border-color 0.25s ease;
    -webkit-appearance: none;
    letter-spacing: 0.03em;
    min-height: 48px;
  }
  .cf-input::placeholder {
    color: var(--color-ink-mute);
    font-size: 0.8125rem;
    opacity: 0.6;
  }
  .cf-input:focus {
    border-color: var(--color-ink);
  }

  .cf-textarea {
    resize: vertical;
    min-height: 160px;
    line-height: 1.85;
  }

  .cf-select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%234A4740' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  /* ── Privacy card ────────────────────────── */
  .cf-privacy__text {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 300;
    font-size: 0.8125rem;
    line-height: 2;
    color: var(--color-ink-mute);
    margin: 0;
  }

  /* ── Error ───────────────────────────────── */
  .cf-error {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-size: 0.875rem;
    color: #8B4513;
    padding: 1rem 1.25rem;
    border: 1px solid #D4A574;
    background: #FDF8F4;
    margin-bottom: 1.25rem;
  }

  /* ── Submit ──────────────────────────────── */
  .cf-submit-wrap {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

  .cf-submit {
    background: var(--color-ink);
    border: 1px solid var(--color-ink);
    color: var(--color-white);
    padding: 1rem 3.5rem;
    font-family: var(--font-jost), Jost, sans-serif;
    font-weight: 400;
    font-size: 0.9375rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .cf-submit:hover:not(:disabled) {
    background: transparent;
    color: var(--color-ink);
  }
  .cf-submit:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

const successCSS = `
  .cf-success {
    text-align: center;
    padding: 4rem 0;
  }
  .cf-success__icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    opacity: 0.85;
  }
  .cf-success__title {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: var(--color-ink);
    margin: 0 0 1rem;
    letter-spacing: 0.05em;
  }
  .cf-success__body {
    font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
    font-weight: 300;
    font-size: 0.9375rem;
    color: var(--color-ink-light);
    line-height: 2;
    letter-spacing: 0.04em;
    margin: 0 0 2rem;
  }
  .cf-success__link {
    font-family: var(--font-jost), Jost, sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.15em;
    color: var(--color-accent);
    text-decoration: none;
  }
  .cf-success__link:hover { text-decoration: underline; }
`;
