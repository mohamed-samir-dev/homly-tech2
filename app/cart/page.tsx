"use client";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-[1280px] mx-auto px-margin py-unit-xl min-h-[60vh] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-8xl text-outline/30 mb-4">shopping_cart</span>
          <h1 className="text-2xl font-bold text-on-surface mb-2">السلة فارغة</h1>
          <p className="text-on-surface-variant mb-6">لم تقم بإضافة أي منتجات بعد</p>
          <a href="/products" className="bg-secondary text-on-secondary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
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
        <h1 className="text-xl sm:text-2xl font-bold text-on-surface mb-unit-lg">سلة التسوق ({totalItems} منتج)</h1>

        <div className="flex flex-col lg:flex-row gap-unit-lg">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.productId} className="bg-white rounded-xl border border-outline-variant/20 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0">
                    <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0 sm:hidden">
                    <h3 className="font-semibold text-on-surface text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-secondary font-bold mt-1 text-sm">{item.price.toLocaleString()} ر.س</p>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="sm:hidden text-error hover:bg-error/10 w-9 h-9 rounded-lg flex items-center justify-center transition-colors mr-auto">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="flex-1 min-w-0 hidden sm:block">
                  <h3 className="font-semibold text-on-surface text-sm truncate">{item.name}</h3>
                  <p className="text-secondary font-bold mt-1">{item.price.toLocaleString()} ر.س</p>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                  <p className="font-bold text-on-surface text-sm sm:text-base sm:w-24 sm:text-left">{(item.price * item.quantity).toLocaleString()} ر.س</p>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="hidden sm:flex text-error hover:bg-error/10 w-9 h-9 rounded-lg items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-xl border border-outline-variant/20 p-4 sm:p-6 sticky top-24">
              <h2 className="font-bold text-on-surface text-lg mb-4">ملخص الطلب</h2>
              <div className="flex justify-between text-sm text-on-surface-variant mb-2">
                <span>المجموع الفرعي</span>
                <span>{totalPrice.toLocaleString()} ر.س</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant mb-4">
                <span>التوصيل</span>
                <span className="text-green-600 font-medium">مجاني</span>
              </div>
              <div className="border-t border-outline-variant/20 pt-4 flex justify-between font-bold text-on-surface text-lg">
                <span>الإجمالي</span>
                <span className="text-secondary">{totalPrice.toLocaleString()} ر.س</span>
              </div>
              <a href="/checkout" className="mt-6 w-full bg-secondary text-on-secondary py-3.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 block text-center">
                <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                إتمام الطلب
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
