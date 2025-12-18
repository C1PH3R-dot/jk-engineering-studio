import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "PRECISION",
    subtitle: "MANUFACTURING",
    description: "State-of-the-art CNC machining and fabrication",
  },
  {
    image: hero2,
    title: "STRUCTURAL",
    subtitle: "ENGINEERING",
    description: "Building bridges that connect communities",
  },
  /*{
    image: hero3,
    title: "Modern",
    subtitle: "Architecture",
    description: "Innovative designs for the future",
  },*/
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="overlay-dark absolute inset-0" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1
            key={currentSlide}
            className="hero-title animate-fade-in"
          >
            {slides[currentSlide].title}
            <br />
            <span className="text-primary">{slides[currentSlide].subtitle}</span>
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl mx-auto animate-fade-in animation-delay-200"
          >
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-foreground/30 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-foreground/30 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`slide-indicator ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-end px-6 md:px-12">
        <div className="flex gap-4">
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
        </div>

        <Link
          to="/projects"
          className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-primary transition-colors"
        >
          All Projects
          <div className="w-8 h-px bg-current" />
        </Link>
      </div>

      {/* Work With Us Link */}
      <Link
        to="/book"
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <span className="vertical-text text-sm uppercase tracking-[0.3em] text-foreground/60 hover:text-primary transition-colors px-4 py-8 border-l border-foreground/20">
          Work With Us
        </span>
      </Link>
    </div>
  );
};

export default HeroSlider;
