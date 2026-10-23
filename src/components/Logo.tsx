import { Link, useLocation } from 'react-router-dom';

type LogoProps = { className?: string };

export default function Logo({ className = '' }: LogoProps) {
  const { pathname } = useLocation();
  return (
    <Link
      className={`logo ${className}`.trim()}
      to="/"
      aria-label="ryopc pages ホームへ"
      onClick={(event) => {
        if (pathname === '/') {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      <img src={`${import.meta.env.BASE_URL}images/ryopc-pages-logo.png`} alt="ryopc pages — アイデアを、ちょうどいいWebに。" />
    </Link>
  );
}
