import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "السلة · الضّوء" },
      { name: "description", content: "راجع طلبك وأتمّ الشراء." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "بغداد", address: "" });

  const rows = items.map((i) => ({ item: i, product: getProduct(i.id)! })).filter((r) => r.product);
  const subtotal = rows.reduce((s, r) => s + r.product.price * 1000 * r.item.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 75000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-full border border-brass flex items-center justify-center mx-auto text-brass">
          <Check className="w-6 h-6" />
        </div>
        <h1 className="mt-8 font-display text-4xl">استلمنا طلبك</h1>
        <p className="mt-4 text-muted-foreground">شكراً {form.name || "لك"}. سيتصل بك أحدنا خلال ساعتين لتأكيد التوصيل. البخار في انتظارك.</p>
        <Link to="/" className="mt-10 inline-flex rounded-sm border border-brass px-6 py-3 text-sm text-brass hover:bg-brass hover:text-primary-foreground transition">
          إلى الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass">Reel 08</div>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl">السلّة</h1>

      {rows.length === 0 ? (
        <div className="mt-16 text-center py-20 border border-dashed border-border rounded-sm">
          <p className="text-muted-foreground">سلّتك فارغة الآن.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-sm bg-brass text-primary-foreground px-6 py-3 text-sm hover:bg-brass-soft">
            تصفّح الحبوب
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-border">
              {rows.map(({ item, product }) => (
                <li key={item.id} className="flex gap-4 py-6">
                  <img src={product.image} alt={product.name} className="w-24 h-28 object-cover rounded-sm" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to="/shop/$id" params={{ id: product.id }} className="font-display text-xl hover:text-brass">{product.name}</Link>
                        <div className="text-xs text-muted-foreground mt-1">{product.origin} · {product.weight}</div>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive" aria-label="أزل">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-border rounded-sm">
                        <button onClick={() => setQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                        <button onClick={() => setQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary"><Plus className="w-3 h-3" /></button>
                      </div>
                      <div className="font-mono text-brass">{(product.price * 1000 * item.qty).toLocaleString("ar-EG")} <span className="text-[10px] text-muted-foreground">د.ع</span></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={clear} className="mt-4 text-xs text-muted-foreground hover:text-destructive font-mono uppercase tracking-widest">إفراغ السلّة</button>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24 h-fit border border-border rounded-sm p-6 sm:p-8 bg-card grain">
            <h2 className="font-display text-2xl mb-6">تفاصيل التوصيل</h2>
            <form
              onSubmit={(e) => { e.preventDefault(); setPlaced(true); clear(); }}
              className="space-y-4"
            >
              <Field label="الاسم" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="الهاتف" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required dir="ltr" />
              <Field label="المدينة" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Field label="العنوان" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />

              <div className="hairline my-6" />

              <div className="space-y-2 text-sm">
                <Row k="المجموع" v={`${subtotal.toLocaleString("ar-EG")} د.ع`} />
                <Row k="الشحن" v={shipping === 0 ? "مجاني" : `${shipping.toLocaleString("ar-EG")} د.ع`} muted />
                <div className="hairline my-3" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg">الإجمالي</span>
                  <span className="font-display text-2xl text-brass">{total.toLocaleString("ar-EG")} <span className="text-xs text-muted-foreground">د.ع</span></span>
                </div>
              </div>

              <button type="submit" className="w-full mt-4 rounded-sm bg-brass hover:bg-brass-soft text-primary-foreground py-3.5 text-sm font-medium transition">
                أكمل الطلب · الدفع عند الاستلام
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                نتصل بك خلال ساعتين لتأكيد الوقت.
              </p>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, required, dir }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; dir?: "ltr" | "rtl" }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        dir={dir}
        className="mt-1.5 w-full bg-transparent border border-border rounded-sm px-3 py-2.5 text-sm focus:border-brass focus:outline-none transition"
      />
    </label>
  );
}
function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${muted ? "text-muted-foreground" : ""}`}>
      <span>{k}</span>
      <span className="font-mono">{v}</span>
    </div>
  );
}
