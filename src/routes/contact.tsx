import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Instagram, Mail, Check } from "lucide-react";
import cafe from "@/assets/cafe.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل · الضوء" },
      { name: "description", content: "زرنا في شارع المتنبي ببغداد، أو راسلنا بشأن الجملة، التدريب، أو مناسبات القهوة." },
      { property: "og:image", content: cafe },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "زيارة", message: "" });

  return (
    <>
      <header className="relative h-[45vh] min-h-[320px] overflow-hidden grain">
        <img src={cafe} alt="داخل مقهى الضوء" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="relative h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 09 · <span className="tracking-normal">تواصل</span></div>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl">قل مرحبا</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">للحجز، الجملة، التدريب، أو مجرد فنجان ودردشة. نحن هنا.</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20 grid lg:grid-cols-12 gap-14">
        <aside className="lg:col-span-5 space-y-10">
          <Block icon={<MapPin className="w-4 h-4" />} label="العنوان" lines={["شارع المتنبي، بغداد", "مقابل مقهى الشابندر"]} />
          <Block icon={<Phone className="w-4 h-4" />} label="الهاتف" lines={["+964 770 000 0000"]} dir="ltr" />
          <Block icon={<Mail className="w-4 h-4" />} label="البريد" lines={["hello@aldaw.coffee"]} dir="ltr" />
          <Block icon={<Instagram className="w-4 h-4" />} label="إنستغرام" lines={["@aldawcoffee"]} dir="ltr" />

          <div>
            <div className="font-mono text-[10px] uppercase text-brass mb-3">الدوام</div>
            <ul className="text-sm space-y-1.5">
              <li className="flex justify-between border-b border-border/60 pb-1.5"><span>السبت – الخميس</span><span className="font-mono">٧ص – ١١م</span></li>
              <li className="flex justify-between"><span>الجمعة</span><span className="font-mono">٢ظ – ١٢م</span></li>
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-7">
          {sent ? (
            <div className="border border-brass/40 rounded-sm p-10 text-center">
              <div className="w-12 h-12 rounded-full border border-brass flex items-center justify-center mx-auto text-brass"><Check className="w-5 h-5" /></div>
              <h2 className="mt-6 font-display text-3xl">وصلت رسالتك</h2>
              <p className="mt-3 text-muted-foreground">نرد خلال يوم عمل واحد.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="border border-border rounded-sm p-8 sm:p-10 bg-card grain space-y-5"
            >
              <h2 className="font-display text-3xl mb-2">اكتب لنا</h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="الاسم" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="البريد الإلكتروني" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required dir="ltr" type="email" />
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">الموضوع</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["زيارة", "طلب جملة", "تدريب", "مناسبة"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setForm({ ...form, subject: s })}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition ${
                        form.subject === s ? "border-brass bg-brass text-primary-foreground" : "border-border hover:border-brass/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">الرسالة</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="mt-1.5 w-full bg-transparent border border-border rounded-sm px-3 py-2.5 text-sm focus:border-brass focus:outline-none resize-none"
                />
              </label>

              <button type="submit" className="w-full rounded-sm bg-brass hover:bg-brass-soft text-primary-foreground py-3.5 text-sm font-medium transition">
                إرسال
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}

function Block({ icon, label, lines, dir }: { icon: React.ReactNode; label: string; lines: string[]; dir?: "ltr" | "rtl" }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-brass mb-2">
        {icon}
        <span className="font-mono text-[10px] uppercase">{label}</span>
      </div>
      <div dir={dir} className="font-display text-2xl leading-snug">
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required, dir, type = "text" }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; dir?: "ltr" | "rtl"; type?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        dir={dir}
        className="mt-1.5 w-full bg-transparent border border-border rounded-sm px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
      />
    </label>
  );
}
