import { createFileRoute } from "@tanstack/react-router";
import { menu } from "@/lib/products";
import pour from "@/assets/pour.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "المشرب · الضّوء" },
      { name: "description", content: "قائمة مشروبات القهوة، طرق التحضير اليدوي، والمخبوزات اليومية في مقهى الضّوء ببغداد." },
      { property: "og:image", content: pour },
    ],
  }),
  component: MenuPage,
});

function Section({ title, num, items }: { title: string; num: string; items: { name: string; ar: string; price: number }[] }) {
  return (
    <section className="py-14 border-b border-border/60 last:border-0">
      <div className="flex items-baseline gap-4 mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">{num}</span>
        <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-x-14 gap-y-6">
        {items.map((it) => (
          <li key={it.name} className="group">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-xl text-foreground group-hover:text-brass transition-colors">{it.name}</span>
              <span className="flex-1 border-b border-dotted border-border mb-1.5" />
              <span className="font-mono text-brass">{(it.price * 1000).toLocaleString("ar-EG")}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{it.ar}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MenuPage() {
  return (
    <>
      <header className="relative h-[45vh] min-h-[340px] overflow-hidden grain">
        <img src={pour} alt="صبّ اللاتيه" className="absolute inset-0 h-full w-full object-cover" width={1280} height={1600} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="relative h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 06 · المشرب</div>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl">القائمة</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">مشروبات إسبريسو، تحضيرات يدوية، ومخبوزات نصنعها كل صباح. الأسعار بالدينار العراقي.</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 sm:px-10 py-10">
        <Section num="٠١ / إسبريسو" title="على البار" items={menu.espresso} />
        <Section num="٠٢ / تحضير يدوي" title="ببطء وضوء" items={menu.brew} />
        <Section num="٠٣ / مخبوزات" title="من الفرن" items={menu.food} />
      </div>
    </>
  );
}
