import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Thames River Bridge",
      category: "Structural Engineering",
      image: hero2,
      year: "2023",
    },
    {
      title: "Precision Factory",
      category: "Manufacturing",
      image: hero1,
      year: "2023",
    },
    {
      title: "Modern Office Complex",
      category: "Architectural Engineering",
      image: hero3,
      year: "2022",
    },
    {
      title: "Industrial Plant Expansion",
      category: "Civil Engineering",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
      year: "2022",
    },
    {
      title: "Renewable Energy Hub",
      category: "Sustainable Engineering",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      year: "2021",
    },
    {
      title: "Underground Metro Station",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      year: "2021",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-primary text-sm uppercase tracking-wider">Our Work</span>
          <h1 className="font-display text-6xl md:text-8xl mt-4 mb-8">
            Featured<br />
            <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Explore our portfolio of engineering excellence. Each project represents our commitment to innovation, quality, and client satisfaction.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <ArrowUpRight className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <span className="text-primary text-xs uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-display text-2xl md:text-3xl mt-2">{project.title}</h3>
                  <span className="text-muted-foreground text-sm">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-display text-5xl md:text-7xl text-primary">500+</h3>
              <p className="text-muted-foreground mt-2 uppercase tracking-wider text-sm">Projects Completed</p>
            </div>
            <div>
              <h3 className="font-display text-5xl md:text-7xl text-primary">15</h3>
              <p className="text-muted-foreground mt-2 uppercase tracking-wider text-sm">Countries Served</p>
            </div>
            <div>
              <h3 className="font-display text-5xl md:text-7xl text-primary">98%</h3>
              <p className="text-muted-foreground mt-2 uppercase tracking-wider text-sm">Client Retention</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
