import schoolLogo from "@/assets/whatsapp-20image-202025-12-17-20at-2011.jpeg";
import labLogo from "@/assets/Gemini_Generated_Image_nn37rbnn37rbnn37.png";
import carnivalHero from "@/assets/carnival-hero.jpg";

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${carnivalHero})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container py-8 md:py-12">
        <div className="flex items-center justify-between">
          <img src={schoolLogo} alt="School Logo" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card p-1" />
          <div className="text-center flex-1 px-4">
            <h2 className="text-sm md:text-base font-medium text-primary-foreground/80 tracking-wider uppercase">
              Sanmati Higher Secondary School
            </h2>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mt-1 drop-shadow-lg">
              🎪 Knowledge Carnival Feedback
            </h1>
            <p className="text-primary-foreground/70 text-sm mt-2 hidden sm:block">
              Share your experience and help us grow!
            </p>
          </div>
          <img src={labLogo} alt="Lab Logo" loading="lazy" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card p-1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
