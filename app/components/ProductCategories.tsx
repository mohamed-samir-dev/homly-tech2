import Link from "next/link";

const categories = [
  {
    label: "شاشات",
    desc: "LED & OLED",
    image: "/cat1.webp",
    href: "/products?subCategory=tvs",
  },
  {
    label: "تلاجات",
    desc: "موفرة للطاقة",
    image: "/cat2.webp",
    href: "/products?subCategory=refrigerators",
  },
  {
    label: "غسالات",
    desc: "أوتوماتيك وشبه أوتوماتيك",
    image: "/cat3.webp",
    href: "/products?subCategory=washing_machines",
  },
  {
    label: "مكيفات",
    desc: "سبليت وشباك",
    image: "/cat4.webp",
    href: "/products?subCategory=air_conditioners",
  },
  {
    label: "أفران",
    desc: "كهربائية وغاز",
    image: "/cat5.webp",
    href: "/products?subCategory=ovens",
  },
  {
    label: "أجهزة صغيرة",
    desc: "خلاطات ومكانس",
    image: "/cat6.webp",
    href: "/products?subCategory=small_appliances",
  },
];

export default function ProductCategories() {
  return (
    <section dir="rtl" className="py-10 sm:py-14 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-1 h-7 bg-secondary rounded-full" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-on-surface">تسوق حسب القسم</h2>
      </div>

      {/* Cards */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative flex-shrink-0 snap-start w-[140px] sm:w-[180px] md:w-[200px] h-[190px] sm:h-[240px] md:h-[260px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 right-0 left-0 p-3 sm:p-4">
              <p className="text-white font-bold text-sm sm:text-base leading-tight">{cat.label}</p>
              <p className="text-white/70 text-[11px] sm:text-xs mt-0.5">{cat.desc}</p>
            </div>

            {/* Arrow */}
            <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="material-symbols-outlined text-white text-[16px]">arrow_back</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
