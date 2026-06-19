const features = [
  { icon: "verified", title: "جودة مضمونة", desc: "جميع منتجاتنا أصلية وتخضع لأعلى معايير الجودة العالمية", color: "from-emerald-500 to-emerald-600" },
  { icon: "payments", title: "سعر تنافسي", desc: "نضمن لك أفضل الأسعار في السوق مع عروض حصرية ومستمرة", color: "from-blue-500 to-blue-600" },
  { icon: "local_shipping", title: "شحن سريع", desc: "خدمة توصيل سريعة وموثوقة لجميع مناطق المملكة خلال وقت قياسي", color: "from-orange-500 to-orange-600" },
  { icon: "handshake", title: "الدفع عند الاستلام", desc: "نوفر لك خيارات دفع مرنة وآمنة تشمل الدفع عند الاستلام", color: "from-purple-500 to-purple-600" },
];

export default function WhyUs() {
  return (
    <section dir="rtl" className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 md:mb-12">لماذا تختارنا؟</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-white text-base sm:text-lg md:text-xl">{f.icon}</span>
              </div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{f.title}</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
