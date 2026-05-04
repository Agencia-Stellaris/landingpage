import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Target like "/#servicios" or "/#contacto". */
  to: string;
}

/**
 * Anchor that works from any route. If the user is already on `/`, it scrolls
 * to the hash via Lenis. Otherwise it navigates to `/#hash` and HomePage's
 * hash-scroll effect handles the scroll on mount.
 */
export function HashLink({ to, onClick, children, ...rest }: HashLinkProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const hashIndex = to.indexOf("#");
      if (hashIndex === -1) return;
      const hash = to.slice(hashIndex);
      const targetPath = to.slice(0, hashIndex) || "/";

      if (pathname === targetPath) {
        const el = document.querySelector(hash);
        if (el && lenis) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: 0 });
          onClick?.(e);
          return;
        }
      }

      e.preventDefault();
      navigate(to);
      onClick?.(e);
    },
    [to, pathname, navigate, lenis, onClick],
  );

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
