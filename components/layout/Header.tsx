'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isEn = locale === 'en';
  const base = isEn ? '/en' : '';

  const contactHref        = `${base}/contact`;
  const programsHref       = `${base}/services`;
  const craftHref          = `${base}/craft`;
  const sustainabilityHref = `${base}/sustainability`;
  const founderHref        = `${base}/founder`;
  // Subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const navLinkStyle = (href: string): React.CSSProperties => ({
    fontFamily: 'var(--font-jost), Jost, sans-serif',
    fontWeight: 400,
    letterSpacing: '0.15em',
    fontSize: '0.6875rem',
    textTransform: 'uppercase' as const,
    color: isActive(href) ? 'var(--color-ink)' : 'var(--color-ink-mute)',
    transition: 'color 0.25s ease',
    position: 'relative' as const,
  });

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'var(--color-white)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-line)' : 'transparent'}`,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          boxShadow: scrolled ? '0 1px 0 var(--color-line)' : 'none',
        }}
      >
        <div
          className="container-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Logo */}
          <Link
            href={isEn ? '/en' : '/'}
            style={{
              fontFamily: 'var(--font-jost), Jost, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.28em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              flexShrink: 0,
            }}
          >
            THE FOMUS
          </Link>

          {/* Desktop nav */}
          <nav
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}
          >
            {[
              { href: programsHref,       key: 'programs'      },
              { href: craftHref,          key: 'craft'         },
              { href: sustainabilityHref, key: 'sustainability' },
              { href: founderHref,        key: 'founder'       },
            ].map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                style={navLinkStyle(href)}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isActive(href) ? 'var(--color-ink)' : 'var(--color-ink-mute)'; }}
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}

            {/* Vertical divider */}
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '1px',
                height: '14px',
                backgroundColor: 'var(--color-line)',
              }}
            />

            <Link
              href={contactHref}
              style={{
                fontFamily: 'var(--font-noto-serif-jp), var(--font-jost), sans-serif',
                fontWeight: 400,
                letterSpacing: '0.12em',
                fontSize: '0.75rem',
                color: 'var(--color-accent)',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-mid)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
            >
              {t('enquire')}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1px',
                  backgroundColor: 'var(--color-ink)',
                  transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s ease',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                    menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' :
                    'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderTop: '1px solid var(--color-line)',
              padding: '2rem 1.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {[
              { href: programsHref,       label: t('programs'),       cta: false },
              { href: craftHref,          label: t('craft'),          cta: false },
              { href: sustainabilityHref, label: t('sustainability'), cta: false },
              { href: founderHref,        label: t('founder'),        cta: false },
              { href: contactHref,        label: t('enquire'),        cta: true  },
            ].map(({ href, label, cta }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: cta
                    ? 'var(--font-noto-serif-jp), var(--font-jost), sans-serif'
                    : 'var(--font-jost), sans-serif',
                  fontWeight: 400,
                  fontSize: cta ? '0.8125rem' : '0.6875rem',
                  letterSpacing: cta ? '0.12em' : '0.22em',
                  textTransform: cta ? 'none' : 'uppercase' as const,
                  color: cta ? 'var(--color-accent)' : 'var(--color-ink)',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--color-line)',
                  display: 'block',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
