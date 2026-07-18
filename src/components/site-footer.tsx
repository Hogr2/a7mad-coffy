import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 grain">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full border border-brass/60 flex items-center justify-center text-brass font-display">ض</span>
            <div>
              <div className="font-display text-xl">الضوء · محمصة قهوة مختصة</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">Light & Steam · Est. 2021 · Baghdad</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            نحمص القهوة بضوء خفيف ونقدمها ببخار صادق. من المزرعة إلى فنجانك، بلا اختصار.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] text-brass mb-4">التنقل</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brass">الرئيسية</Link></li>
            <li><Link to="/menu" className="hover:text-brass">المشرب</Link></li>
            <li><Link to="/shop" className="hover:text-brass">المتجر</Link></li>
            <li><Link to="/contact" className="hover:text-brass">تواصل</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-brass mb-4">زرنا</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-1 text-brass shrink-0" /> شارع المتنبي، بغداد</li>
            <li className="flex items-start gap-2"><Phone className="w-3.5 h-3.5 mt-1 text-brass shrink-0" /><span dir="ltr">+964 770 000 0000</span></li>
            <li className="flex items-start gap-2"><Instagram className="w-3.5 h-3.5 mt-1 text-brass shrink-0" /> @aldawcoffee</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
          <span className="tracking-normal">© ٢٠٢٥ الضوء</span>
          <span>Roasted slowly · Served with steam</span>
        </div>
      </div>
    </footer>
  );
}
