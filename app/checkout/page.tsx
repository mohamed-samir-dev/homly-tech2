"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", notes: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    if (name === "customerName" && /\d/.test(value)) return;
    setForm({ ...form, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 3) {
      errors.customerName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }
    if (!/^(05|5)\d{8}$/.test(form.phone)) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      errors.address = "العنوان يجب أن يكون 10 أحرف على الأقل";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      const firstError = document.querySelector("[data-error='true']");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (items.length === 0) {
      setError("السلة فارغة");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          notes: form.notes,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "حدث خطأ");
      clearCart();
      router.push(`/order-success?id=${data.data._id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-[1280px] mx-auto px-margin py-unit-xl min-h-[60vh] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-8xl text-outline/30 mb-4">remove_shopping_cart</span>
          <h1 className="text-2xl font-bold text-on-surface mb-2">السلة فارغة</h1>
          <a href="/products" className="bg-secondary text-on-secondary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all mt-4">
            تصفح المنتجات
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-[1280px] mx-auto px-margin py-unit-xl">
        <h1 className="text-2xl font-bold text-on-surface mb-unit-lg">إتمام الطلب</h1>

        <div className="flex flex-col lg:flex-row gap-unit-lg">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-xl border border-outline-variant/20 p-6">
            <h2 className="font-bold text-on-surface text-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">person</span>
              بيانات التوصيل
            </h2>

            {error && (
              <div className="bg-error/10 text-error text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div data-error={!!fieldErrors.customerName}>
                <label className="text-sm font-medium text-on-surface mb-1 block">الاسم الكامل *</label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/40 focus:outline-none ${fieldErrors.customerName ? "border-error" : "border-outline-variant/40"}`}
                  placeholder="أدخل اسمك الكامل (حروف فقط)"
                />
                {fieldErrors.customerName && <p className="text-error text-xs mt-1">{fieldErrors.customerName}</p>}
              </div>
              <div data-error={!!fieldErrors.phone}>
                <label className="text-sm font-medium text-on-surface mb-1 block">رقم الهاتف *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  dir="ltr"
                  maxLength={10}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/40 focus:outline-none text-left ${fieldErrors.phone ? "border-error" : "border-outline-variant/40"}`}
                  placeholder="05XXXXXXXX"
                />
                {fieldErrors.phone && <p className="text-error text-xs mt-1">{fieldErrors.phone}</p>}
              </div>
              <div data-error={!!fieldErrors.address}>
                <label className="text-sm font-medium text-on-surface mb-1 block">العنوان الكامل *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/40 focus:outline-none ${fieldErrors.address ? "border-error" : "border-outline-variant/40"}`}
                  placeholder="المدينة - الحي - الشارع - رقم المبنى"
                />
                {fieldErrors.address && <p className="text-error text-xs mt-1">{fieldErrors.address}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface mb-1 block">ملاحظات (اختياري)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/40 focus:outline-none resize-none"
                  placeholder="أي ملاحظات إضافية للتوصيل..."
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 pt-6 border-t border-outline-variant/20">
              <h2 className="font-bold text-on-surface text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">payments</span>
                طريقة الدفع
              </h2>
              <div className="border-2 border-secondary rounded-xl p-4 bg-secondary/5 flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                </span>
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                <div>
                  <p className="font-bold text-on-surface text-sm">الدفع عند الاستلام</p>
                  <p className="text-xs text-on-surface-variant">ادفع نقداً عند استلام طلبك</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  تأكيد الطلب
                </>
              )}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl border border-outline-variant/20 p-6 sticky top-24">
              <h2 className="font-bold text-on-surface text-lg mb-4">ملخص الطلب ({items.length} منتج)</h2>
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image.startsWith("http") ? item.image : `${API_URL}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-on-surface truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">{item.quantity} × {item.price.toLocaleString()} ر.س</p>
                    </div>
                    <p className="text-sm font-bold text-on-surface">{(item.price * item.quantity).toLocaleString()} ر.س</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant/20 mt-4 pt-4">
                <div className="flex justify-between text-sm text-on-surface-variant mb-2">
                  <span>المجموع الفرعي</span>
                  <span>{totalPrice.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between text-sm text-on-surface-variant mb-2">
                  <span>التوصيل</span>
                  <span className="text-green-600 font-medium">مجاني</span>
                </div>
                <div className="flex justify-between font-bold text-on-surface text-lg pt-2 border-t border-outline-variant/20">
                  <span>الإجمالي</span>
                  <span className="text-secondary">{totalPrice.toLocaleString()} ر.س</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
