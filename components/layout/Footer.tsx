'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const base = locale === 'en' ? '/en' : '';
  const pathname = usePathname();
  const langSwitchHref = locale === 'en'
    ? pathname.replace(/^\/en/, '') || '/'
    : `/en${pathname}`;

  const navLinks = [
    { href: `${base}/sustainability`, label: tNav('sustainability') },
    { href: `${base}/founder`,        label: tNav('founder') },
    { href: `${base}/contact`,        label: tNav('enquire') },
  ];

  const programLinks = [
    { href: `${base}/programs/corporate-gift`, label: 'Corporate Gift' },
    { href: `${base}/programs/cultural-space`, label: 'Cultural Space' },
    { href: `${base}/programs/hotel-branding`, label: 'Hotel Branding' },
    { href: `${base}/programs/sake-masu`, label: 'Sake × Masu' },
    { href: `${base}/programs/bespoke`, label: 'Bespoke' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-line)',
        backgroundColor: 'var(--color-white)',
        marginTop: 'auto',
      }}
    >
      <div
        className="container-content"
        style={{
          paddingTop: '4rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Top row: brand + nav columns */}
        <div className="footer-grid">
          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              href={base || '/'}
              style={{
                fontFamily: 'var(--font-jost), Jost, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.25em',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                display: 'inline-block',
              }}
            >
              {t('brand')}
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-noto-serif-jp), sans-serif',
                fontWeight: 400,
                fontSize: '0.8125rem',
                color: 'var(--color-line-dark)',
                letterSpacing: '0.06em',
              }}
            >
              {t('tagline')}
            </span>
          </div>

          {/* Nav links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-jost), Jost, sans-serif',
                fontWeight: 400,
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-mute)',
                margin: '0 0 1.25rem',
              }}
            >
              Navigation
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-jost), Jost, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.6875rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-light)',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-light)'; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-jost), Jost, sans-serif',
                fontWeight: 400,
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-mute)',
                margin: '0 0 1.25rem',
              }}
            >
              Programs
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {programLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '0.875rem',
                      letterSpacing: '0.04em',
                      color: 'var(--color-ink-mute)',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-mute)'; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: '1px solid var(--color-line)',
            margin: '3rem 0 1.75rem',
          }}
        />

        {/* Copyright row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jost), Jost, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.05em',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              color: 'var(--color-line-dark)',
              margin: 0,
            }}
          >
            {t('copyright')}
          </p>

          {/* Language switcher */}
          <Link
            href={langSwitchHref}
            style={{
              fontFamily: 'var(--font-noto-serif-jp), var(--font-jost), sans-serif',
              fontWeight: 400,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--color-ink-mute)',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-mute)'; }}
          >
            {locale === 'en' ? '日本語' : 'English'}
          </Link>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-grid > *:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
