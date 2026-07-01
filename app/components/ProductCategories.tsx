import Link from "next/link";

const categories = [
  {
    label: "شاشات",
    desc: "أحدث شاشات LED و OLED",
    image: "/cat1.webp",
    href: "/products?subCategory=tvs",
  },
  {
    label: "تلاجات",
    desc: "تلاجات موفرة للطاقة",
    image: "/cat2.webp",
    href: "/products?subCategory=refrigerators",
  },
  {
    label: "غسالات",
    desc: "غسالات أوتوماتيك وشبه أوتوماتيك",
    image: "/cat3.webp",
    href: "/products?subCategory=washing_machines",
  },
  {
    label: "مكيفات",
    desc: "مكيفات سبليت وشباك",
    image: "/cat4.webp",
    href: "/products?subCategory=air_conditioners",
  },
  {
    label: "أفران",
    desc: "أفران كهربائية وغاز",
    image: "/cat5.webp",
    href: "/products?subCategory=ovens",
  },
  {
    label: "أجهزة صغيرة",
    desc: "خلاطات، مكانس، وأكثر",
    image: "/cat6.webp",
    href: "/products?subCategory=small_appliances",
  },
];

export default function ProductCategories() {
  return (
    <section dir="rtl" className="py-10 sm:py-14 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-2">
          تسوق حسب القسم
        </h2>
        <p className="text-on-surface-variant text-sm sm:text-base">
          اختر القسم اللي يناسبك وتصفح أحدث المنتجات
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-on-surface text-sm sm:text-base">{cat.label}</p>
              <p className="text-on-surface-variant text-[11px] sm:text-xs mt-0.5 leading-snug">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
