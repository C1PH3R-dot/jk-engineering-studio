import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Wrench, Building } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years Experience", icon: Award },
              { number: "500+", label: "Projects Completed", icon: Building },
              { number: "50+", label: "Expert Engineers", icon: Users },
              { number: "100%", label: "Client Satisfaction", icon: Wrench },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-primary">{stat.number}</h3>
                <p className="text-muted-foreground mt-2 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 mb-6">
                Engineering<br />
                <span className="text-primary">Excellence</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                JK Engineering has been at the forefront of innovation since 1998. We combine cutting-edge technology with decades of expertise to deliver engineering solutions that stand the test of time.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From precision manufacturing to large-scale infrastructure projects, our team of dedicated professionals ensures every project exceeds expectations.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all uppercase tracking-wider text-sm"
              >
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-charcoal-light rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                  alt="Engineering team"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-primary text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4">
              Our <span className="text-primary">Services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Structural Engineering",
                description: "Comprehensive structural analysis and design for buildings, bridges, and infrastructure.",
                icon: "01",
              },
              {
                title: "Manufacturing",
                description: "Precision CNC machining, metal fabrication, and custom component manufacturing.",
                icon: "02",
              },
              {
                title: "Project Management",
                description: "End-to-end project oversight ensuring timely delivery and quality standards.",
                icon: "03",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-background border border-border hover:border-primary transition-colors duration-300"
              >
                <span className="font-display text-6xl text-primary/20 group-hover:text-primary/40 transition-colors">
                  {service.icon}
                </span>
                <h3 className="font-display text-2xl mt-4 mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 border border-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border border-primary rounded-full translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            Ready to Start<br />
            <span className="text-primary">Your Project?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Book a consultation with our expert engineers and let's bring your vision to life.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground hover:bg-gold-light transition-colors uppercase tracking-wider text-sm font-medium"
          >
            Book Appointment <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
