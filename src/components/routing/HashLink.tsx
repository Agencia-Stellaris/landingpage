import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Target like "/#servicios", "/#contacto", or "#in-page-anchor". */
  to: string;
}

/**
 * Anchor that works from any route. Three cases:
 *   1. `to="#anchor"` — same-page; always scrolls via Lenis on the current route.
 *   2. `to="/#hash"` from `/` — scrolls via Lenis.
 *   3. `to="/#hash"` from a sub-route — navigates to `/#hash`; HomePage's
 *      hash-scroll effect handles the scroll on mount.
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
      // Hash-only `to` (e.g. "#contacto") is implicitly same-page.
      const isSamePath =
        hashIndex === 0 || pathname === (to.slice(0, hashIndex) || "/");

      if (isSamePath) {
        const el = document.querySelector(hash);
        if (el && lenis) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: 0 });
          onClick?.(e);
          return;
        }
        // Same path but element not yet in DOM (or Lenis not ready). Use
        // `replace` to avoid pushing a duplicate history entry.
        e.preventDefault();
        navigate(to, { replace: true });
        onClick?.(e);
        return;
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
