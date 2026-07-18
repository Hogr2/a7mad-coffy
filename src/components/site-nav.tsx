import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/menu", label: "المشرب" },
  { to: "/shop", label: "المتجر" },
  { to: "/contact", label: "تواصل" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full border border-brass/60 flex items-center justify-center text-brass font-display text-sm animate-flicker">ض</span>
          <span className="font-display text-lg tracking-wide">الضّوء</span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase text-muted-foreground tracking-[0.2em] ms-1">Light & Steam</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-brass transition-colors relative"
              activeProps={{ className: "text-brass" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="السلة"
          >
            <ShoppingBag className="w-4 h-4 text-brass" />
            {count > 0 && (
              <span className="absolute -top-0.5 -start-0.5 min-w-4 h-4 px-1 rounded-full bg-brass text-primary-foreground text-[10px] font-mono flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-lg font-display text-foreground/90 hover:text-brass"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
