import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      <Image
        src="/hero.webp"
        alt="مدار الأجهزة الإلكترونية - أفضل الأجهزة بأعلى جودة وأفضل سعر"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-primary-container/70" />
      <div className="relative z-10 max-w-[1280px] mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-on-primary leading-tight max-w-2xl mb-4 md:mb-6">
          أفضل الأجهزة الإلكترونية بأعلى جودة وأفضل سعر
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-on-primary-container max-w-xl mb-6 md:mb-8">
          نوفر لكم أحدث الابتكارات التقنية من أرقى الماركات العالمية لضمان تجربة استثنائية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="/products" className="bg-secondary text-on-secondary px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:shadow-lg transition-all active:scale-95">
            تسوق الآن
          </a>
          <a href="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-white/10 transition-all active:scale-95">
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}
