const categories = [
  {
    name: "معيشة",
    desc: "كنب وجلسات وصالون",
    image: "/home5.webp",
    slug: "living_room",
    large: true,
  },
  {
    name: "نوم",
    desc: "أسرّة وأطقم غرف نوم",
    image: "/homew.webp",
    slug: "bedroom",
  },
  {
    name: "أجهزة منزلية",
    desc: "تلفزيون ومكيف وأكثر",
    image: "/hhhhh.webp",
    slug: "home_devices",
  },
];

export default function Categories() {
  return (
    <section dir="rtl" className="py-8 sm:py-12 md:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-[32px] font-bold text-on-surface mb-2">
          تسوق حسب التصنيف
        </h2>
        <p className="text-on-surface-variant text-sm sm:text-base">اكتشف تشكيلة واسعة تناسب كل ركن في بيتك</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
        {/* Large card */}
        <a
          href={`/products?category=${categories[0].slug}`}
          className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl shadow-sm border border-outline-variant"
        >
          <img
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={categories[0].name}
            src={categories[0].image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 right-0 p-4 sm:p-6">
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold block">{categories[0].name}</span>
            <span className="text-white/70 text-xs sm:text-sm">{categories[0].desc}</span>
          </div>
        </a>

        {/* Small cards */}
        {categories.slice(1).map((cat, i) => (
          <a
            key={i}
            href={`/products?category=${cat.slug}`}
            className="relative group overflow-hidden rounded-2xl shadow-sm border border-outline-variant"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={cat.name}
              src={cat.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 right-0 p-3 sm:p-4">
              <span className="text-white text-sm sm:text-base font-bold block">{cat.name}</span>
              <span className="text-white/70 text-[10px] sm:text-xs">{cat.desc}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-5 sm:mt-6">
        <a
          href="/products"
          className="inline-flex items-center gap-2 text-secondary font-semibold text-sm sm:text-base border border-secondary/30 px-5 py-2.5 rounded-xl hover:bg-secondary/5 transition-colors"
        >
          عرض جميع التصنيفات
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </a>
      </div>
    </section>
  );
}
