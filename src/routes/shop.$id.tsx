import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "قهوة"} · متجر الضّوء` },
      { name: "description", content: loaderData?.story ?? "قهوة مختصة من الضّوء." },
      { property: "og:image", content: loaderData?.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-brass">غير موجود</h1>
        <p className="mt-2 text-muted-foreground">هذه القهوة نفدت أو لم تصل بعد.</p>
        <Link to="/shop" className="mt-6 inline-block text-brass hover:underline">عودة للمتجر</Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

const grinds = ["حبّة كاملة", "إسبريسو", "في ٦٠", "فرنش برس", "تركية"];

function ProductPage() {
  const p = Route.useLoaderData();
  const params = Route.useParams();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [grind, setGrind] = useState(grinds[0]);
  const [added, setAdded] = useState(false);

  const others = products.filter((x) => x.id !== params.id).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brass mb-8">
          <ArrowLeft className="w-4 h-4 rotate-180" /> كل الحبوب
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 relative aspect-square lg:aspect-[5/6] overflow-hidden grain bg-secondary">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 vignette" />
            <div className="absolute top-6 start-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
              LOT #{String(products.indexOf(p) + 1).padStart(3, "0")}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">{p.origin}</div>
            <h1 className="mt-3 font-display text-6xl leading-none">{p.name}</h1>
            <div className="hairline my-8" />

            <p className="text-foreground/80 leading-relaxed">{p.story}</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                ["المعالجة", p.process],
                ["الارتفاع", p.altitude],
                ["التحميص", p.roast],
                ["الوزن", p.weight],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-border/60 pb-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="font-display text-lg mt-1">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">نكهات محسوسة</div>
              <div className="flex flex-wrap gap-2">
                {p.notes.map((n) => (
                  <span key={n} className="px-3 py-1 text-xs border border-brass/40 text-brass rounded-sm">{n}</span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">الطحن</div>
              <div className="flex flex-wrap gap-2">
                {grinds.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`px-3 py-1.5 text-xs rounded-sm border transition ${
                      grind === g ? "border-brass bg-brass text-primary-foreground" : "border-border hover:border-brass/60"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="hairline my-10" />

            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="font-display text-4xl text-brass">{(p.price * 1000 * qty).toLocaleString("ar-EG")}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">دينار عراقي</div>
              </div>
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary" aria-label="أنقص">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary" aria-label="زد">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                add(p.id, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1600);
              }}
              className="mt-6 w-full rounded-sm bg-brass hover:bg-brass-soft text-primary-foreground py-4 text-sm font-medium transition inline-flex items-center justify-center gap-2"
            >
              {added ? (<><Check className="w-4 h-4" /> أُضيف إلى السلة</>) : "أضف إلى السلة"}
            </button>
            <p className="mt-4 text-[11px] text-muted-foreground text-center font-mono uppercase tracking-widest">
              يخرج من المحمصة خلال ٤٨ ساعة · شحن مجاني فوق ٧٥٬٠٠٠ د.ع
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24 border-t border-border/60 mt-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl sm:text-4xl">قد تعجبك أيضاً</h2>
          <Link to="/shop" className="text-sm text-brass hover:underline">كل الحبوب</Link>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {others.map((o) => (
            <Link to="/shop/$id" params={{ id: o.id }} key={o.id} className="group block">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="pt-3">
                <div className="font-display text-lg sm:text-xl group-hover:text-brass transition-colors">{o.name}</div>
                <div className="text-[11px] text-muted-foreground">{o.origin}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
