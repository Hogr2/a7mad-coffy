import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import bag from "@/assets/bag.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "المتجر · الضّوء" },
      { name: "description", content: "حبوب قهوة مختصة من إثيوبيا وكولومبيا وبنما، محمّصة يدوياً في بغداد. طلبك يخرج طازجاً خلال ٤٨ ساعة." },
      { property: "og:image", content: bag },
    ],
  }),
  component: ShopPage,
});

const roasts = ["الكل", "فاتحة", "متوسطة", "داكنة"] as const;

function ShopPage() {
  const [filter, setFilter] = useState<(typeof roasts)[number]>("الكل");
  const list = filter === "الكل" ? products : products.filter((p) => p.roast === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-24">
      <header className="mb-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 07 · المتجر</div>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl">حبوبٌ للبيت</h1>
        <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
          كل كيسٍ يخرج من المحمصة خلال ٤٨ ساعة من طلبك. اطحن قبل التحضير مباشرة،
          واحفظ الكيس بعيداً عن الشمس.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-border/60 pb-6">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground me-2">تحميص:</span>
        {roasts.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-4 py-1.5 text-sm rounded-sm border transition ${
              filter === r
                ? "border-brass bg-brass text-primary-foreground"
                : "border-border text-muted-foreground hover:border-brass/60 hover:text-brass"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
        {list.map((p, i) => (
          <Link
            to="/shop/$id"
            params={{ id: p.id }}
            key={p.id}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary grain">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 start-4 font-mono text-[10px] uppercase tracking-widest text-brass-bright">
                #{String(i + 1).padStart(2, "0")} · {p.roast}
              </div>
              <div className="absolute bottom-4 end-4 font-mono text-[10px] uppercase tracking-widest text-cream/80">
                {p.weight}
              </div>
            </div>
            <div className="pt-5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-2xl group-hover:text-brass transition-colors">{p.name}</h3>
                <div className="text-xs text-muted-foreground mt-1 truncate">{p.origin}</div>
                <div className="text-xs text-muted-foreground/80 mt-2 line-clamp-1">{p.notes.join(" · ")}</div>
              </div>
              <div className="text-end shrink-0">
                <div className="font-display text-xl text-brass">{(p.price * 1000).toLocaleString("ar-EG")}</div>
                <div className="font-mono text-[9px] uppercase text-muted-foreground">د.ع</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
