import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

const navItems = [
  { to: '/works', label: '制作実績' },
  { to: '/services', label: 'できること' },
  { to: '/about', label: '私たちについて' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="nav-contact">お問い合わせ <ArrowUpRight size={15} /></Link>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
          <span>{menuOpen ? '閉じる' : 'メニュー'}</span>
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="モバイルナビゲーション">
          <Link to="/" onClick={closeMenu}>ホーム</Link>
          {navItems.map((item) => <Link key={item.to} to={item.to} onClick={closeMenu}>{item.label}</Link>)}
          <Link to="/contact" onClick={closeMenu}>お問い合わせ <ArrowUpRight size={15} /></Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Logo className="logo--footer" />
            <p>アイデアを、ちょうどいいWebに。</p>
          </div>
          <div className="footer-nav-group">
            <div className="footer-nav-col">
              <strong>CONTENTS</strong>
              <Link to="/works">制作実績</Link>
              <Link to="/services">できること</Link>
              <Link to="/about">私たちについて</Link>
              <Link to="/contact">お問い合わせ</Link>
            </div>
            <div className="footer-nav-col">
              <strong>ORGANIZATION</strong>
              <span>運営元：ryopc org</span>
              <a href="https://ryopc.org" target="_blank" rel="noreferrer">ryopc org 公式サイト <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ryopc pages</span>
          <span>Operated by ryopc org</span>
        </div>
      </div>
    </footer>
  );
}
