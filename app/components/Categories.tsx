const categories = [
  {
    name: "تكييفات",
    image: "/taq.webp",
    slug: "air_conditioners",
    large: true,
  },
  {
    name: "أجهزة منزلية",
    image: "/home.webp",
    slug: "home_devices",
  },
  {
    name: "اكسسوارات",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_HS1-Jqrva8---ufTRtXtlmhtNDG9HQvyb721os3DnCydMgI5g0YZ8lr78RFiWFnTtXiXNnj_cRME46EQqcuLdGU_f-er5Hl9seeBL-zBIw5OdgMkAhThpy57YmHatN0J2U4Kvm2VA8WLOWs5KzdNY7rHC2eKCBfA0Dff8EDZUaW_QKX0FGd4FI3fQhW2mTR2aeKOuV0y1H1aK1-c1PaWDE8li0l-JKld9VSHnNQIm775a0t5UBYCpy3zXWQAJ4bqqDBzpavR0w",
    slug: "accessories",
  },
];

export default function Categories() {
  return (
    <section className="py-8 sm:py-12 md:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl md:text-[32px] md:leading-[40px] font-semibold text-on-surface mb-4 sm:mb-6 md:mb-8 text-center">تصفح حسب الفئة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 h-auto sm:h-[300px] md:h-[400px]">
        {categories.map((cat, i) => (
          <a
            href={`/products?category=${cat.slug}`}
            key={i}
            className={`${cat.large ? "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2" : ""} relative group overflow-hidden rounded-xl bg-white shadow-sm border border-outline-variant h-[180px] sm:h-auto`}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={cat.name}
              src={cat.image}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end ${cat.large ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
              <span className={`text-white ${cat.large ? "text-lg sm:text-xl md:text-[24px] font-semibold" : "text-sm font-medium"}`}>{cat.name}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
