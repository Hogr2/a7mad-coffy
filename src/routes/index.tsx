import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import heroSteam from "@/assets/hero-steam.jpg";
import beans from "@/assets/beans.jpg";
import pour from "@/assets/pour.jpg";
import cafe from "@/assets/cafe.jpg";
import cherry from "@/assets/cherry.jpg";
import bag from "@/assets/bag.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الضّوء · محمصة قهوة مختصة في بغداد" },
      { name: "description", content: "من مرتفعات إثيوبيا وكولومبيا إلى محمصتنا في بغداد. حبوب مختصة، تحميص يدوي، وفنجان بلا اختصار." },
      { property: "og:image", content: heroSteam },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO ─ full-bleed cinematic still with steam and brass copy */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden grain">
        <img
          src={heroSteam}
          alt="بخار يتصاعد من فنجان قهوة"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/70 via-transparent to-background/30" />

        <div className="relative h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-16 sm:pb-24">
          <div className="max-w-2xl animate-reel-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brass" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 01 · فصل الضوء</span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1.05] text-foreground">
              نُحمّصها ببطء،<br />
              <span className="text-brass">ونُقدّمها ببخارٍ</span> صادق.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              محمصة قهوة مختصة في قلب بغداد. حبوبٌ مُنتقاة من مزارع صغيرة،
              تُحمّص كل صباح على دفعاتٍ لا تتجاوز عشرة كيلوغرامات.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-sm bg-brass px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-brass-soft transition-colors"
              >
                تصفّح الحبوب
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 rounded-sm border border-brass/60 px-7 py-3.5 text-sm text-brass hover:bg-brass/10 transition-colors"
              >
                قائمة المشرب
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* MARQUEE — origins */}
      <section className="border-y border-border/60 bg-secondary/30 overflow-hidden">
        <div className="py-5 flex items-center gap-16 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground animate-[flicker_6s_ease-in-out_infinite]">
          {["إثيوبيا · يرغاتشيف", "كولومبيا · هويلا", "بنما · بوكيتِه", "كينيا · نيري", "رواندا · موراغا", "بيرو · كاخاماركا"].concat(["إثيوبيا · يرغاتشيف", "كولومبيا · هويلا", "بنما · بوكيتِه"]).map((s, i) => (
            <span key={i} className="flex items-center gap-16">
              <span className="text-brass">◇</span> {s}
            </span>
          ))}
        </div>
      </section>

      {/* FILMSTRIP — the process, cinematic reel */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass mb-3">Reel 02</div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight">من الشجرة<br />إلى الفنجان.</h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-muted-foreground leading-relaxed">
            أربع لحظات نلتقطها كل يوم في المحمصة. ندعك تراها من قريب،
            لأن القهوة الجيّدة لا تخفي عملياتها.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {[
            { img: cherry, num: "٠١", title: "الحصاد", cap: "قِطاف يدوي في الموسم" },
            { img: beans, num: "٠٢", title: "الفرز", cap: "حبّة حبّة، ضوء طبيعي" },
            { img: pour, num: "٠٣", title: "التحميص", cap: "دفعة صغيرة، تحكّم دقيق" },
            { img: cafe, num: "٠٤", title: "التقديم", cap: "على بار المحمصة" },
          ].map((f) => (
            <figure key={f.num} className="relative aspect-[3/4] overflow-hidden rounded-sm group grain">
              <img src={f.img} alt={f.title} loading="lazy" className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="font-mono text-[10px] text-brass-bright tracking-[0.25em]">FRAME {f.num}</div>
                <div className="font-display text-xl sm:text-2xl mt-1 text-cream">{f.title}</div>
                <div className="text-[11px] text-cream/70 mt-1">{f.cap}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCT — asymmetric editorial spread */}
      <section className="relative bg-secondary/30 border-y border-border/60 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 relative aspect-[4/5] md:aspect-[5/6] overflow-hidden">
            <img src={bag} alt="حقيبة قهوة الضّوء" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 vignette" />
            <div className="absolute top-6 start-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brass-bright">Reel 03 · Featured</div>
          </div>
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass mb-4">حبّة الشهر</div>
            <h2 className="font-display text-5xl sm:text-6xl leading-none">سِدرة</h2>
            <div className="mt-3 text-muted-foreground">كولومبيا · هويلا · تخمير لاهوائي</div>
            <div className="hairline my-8" />
            <p className="text-foreground/80 leading-relaxed">
              دفعة محدودة من مزرعة إل بارايسو. أربعة أيامٍ من التخمير اللاهوائي
              أعطتها فراولة ناضجة وكاكاو دافئ. نُحمّصها متوسطةً لتبقى الحلاوة على السطح.
            </p>
            <ul className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[["ياسمين", "علوي"], ["فراولة", "أوسط"], ["كاكاو", "نهاية"]].map(([n, r]) => (
                <li key={n} className="border border-border rounded-sm p-3">
                  <div className="font-display text-lg">{n}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{r}</div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-6">
              <div>
                <div className="font-display text-3xl text-brass">٢٦٬٠٠٠ <span className="text-sm text-muted-foreground">د.ع</span></div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">٢٥٠ غرام</div>
              </div>
              <Link
                to="/shop/$id"
                params={{ id: "sidra" }}
                className="ms-auto inline-flex items-center gap-2 rounded-sm bg-brass px-6 py-3 text-sm text-primary-foreground hover:bg-brass-soft transition"
              >
                اقرأ القصة
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP GRID PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass mb-2">Reel 04 · المتجر</div>
            <h2 className="font-display text-4xl sm:text-5xl">حبوبٌ للبيت.</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm text-brass hover:gap-3 transition-all">
            كل الحبوب <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to="/shop/$id"
              params={{ id: p.id }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary grain">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 start-4 font-mono text-[10px] uppercase tracking-widest text-brass-bright">{p.roast}</div>
              </div>
              <div className="pt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl group-hover:text-brass transition-colors">{p.name}</h3>
                  <div className="text-xs text-muted-foreground mt-1">{p.origin}</div>
                </div>
                <div className="text-end shrink-0">
                  <div className="font-display text-lg text-brass">{(p.price * 1000).toLocaleString("ar-EG")}</div>
                  <div className="font-mono text-[9px] uppercase text-muted-foreground">د.ع</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VISIT — atmospheric interior */}
      <section className="relative overflow-hidden">
        <img src={cafe} alt="داخل مقهى الضّوء" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 vignette" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-32 sm:py-40 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 05 · Visit</div>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl">تعالَ عند الغروب.</h2>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            المصابيح النحاسية تبدأ بالإضاءة عند الخامسة والنصف. البخار يرتفع.
            الحديث يهدأ. هذه أفضل ساعة عندنا.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-brass">العنوان</div>
              <div className="mt-1">شارع المتنبي، بغداد</div>
            </div>
            <span className="hidden sm:inline text-brass">◇</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-brass">الدوام</div>
              <div className="mt-1">يومياً ٧ص – ١١م</div>
            </div>
          </div>
          <Link to="/contact" className="inline-flex mt-10 items-center gap-2 rounded-sm border border-brass px-7 py-3 text-sm text-brass hover:bg-brass hover:text-primary-foreground transition">
            كيف تصل إلينا
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
