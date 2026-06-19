"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products?sort=newest&limit=4`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => {});
  }, []);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      stock: product.stock,
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section dir="rtl" className="py-8 sm:py-12 md:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-[32px] md:leading-[40px] font-semibold text-on-surface">منتجاتنا المختارة</h2>
        <a className="text-secondary text-sm sm:text-base hover:underline" href="/products">عرض الكل</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <a href={`/products/${product.slug}`} key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-variant p-2 sm:p-3 md:p-4 flex flex-col">
            <div className="relative h-32 sm:h-40 md:h-48 mb-2 sm:mb-3 bg-white rounded-lg overflow-hidden">
              {product.images?.[0] ? (
                <img
                  className="w-full h-full object-contain p-2 sm:p-3"
                  alt={product.name}
                  src={product.images[0].startsWith("http") ? product.images[0] : `${API_URL}/uploads/${product.images[0]}`}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="material-symbols-outlined text-4xl text-outline/40">image</span>
                </div>
              )}
              {product.oldPrice && (
                <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-error text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
            <h3 className="text-on-surface font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
            <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-secondary font-bold text-base sm:text-lg md:text-[24px]">{product.price.toLocaleString()} ر.س</span>
              <button
                onClick={(e) => handleAdd(e, product)}
                className="bg-primary text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-1 w-full sm:w-auto justify-center"
              >
                <span className="material-symbols-outlined text-sm">
                  {addedId === product._id ? "check" : "add_shopping_cart"}
                </span>
                <span className="text-xs sm:text-sm">{addedId === product._id ? "تمت" : "أضف"}</span>
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
