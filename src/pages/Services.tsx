import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Cog, HardHat, Lightbulb, Ruler, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Structural Engineering",
      description: "Comprehensive structural analysis and design for buildings, bridges, and infrastructure. We ensure safety, durability, and compliance with all regulations.",
      features: ["Structural Analysis", "Foundation Design", "Steel & Concrete Structures", "Seismic Design"],
    },
    {
      icon: Cog,
      title: "Precision Manufacturing",
      description: "State-of-the-art CNC machining, metal fabrication, and custom component manufacturing with tolerances as tight as 0.001mm.",
      features: ["CNC Machining", "Metal Fabrication", "Custom Components", "Quality Assurance"],
    },
    {
      icon: HardHat,
      title: "Construction Management",
      description: "End-to-end project oversight ensuring timely delivery, budget adherence, and the highest quality standards.",
      features: ["Project Planning", "Site Supervision", "Cost Management", "Safety Compliance"],
    },
    {
      icon: Ruler,
      title: "Design & Drafting",
      description: "Detailed engineering drawings and 3D modeling using the latest CAD software for precise visualization and documentation.",
      features: ["CAD Drawings", "3D Modeling", "Technical Documentation", "As-Built Drawings"],
    },
    {
      icon: Lightbulb,
      title: "Engineering Consulting",
      description: "Expert advice on engineering challenges, feasibility studies, and technical reviews to optimize your projects.",
      features: ["Feasibility Studies", "Technical Reviews", "Value Engineering", "Risk Assessment"],
    },
    {
      icon: Settings,
      title: "Maintenance Services",
      description: "Ongoing maintenance and inspection services to ensure your structures and equipment perform optimally.",
      features: ["Preventive Maintenance", "Structural Inspections", "Equipment Servicing", "Emergency Repairs"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-primary text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="font-display text-6xl md:text-8xl mt-4 mb-8">
            Our<br />
            <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            We offer a comprehensive range of engineering services tailored to meet the unique needs of each client. From concept to completion, we're with you every step of the way.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 md:p-12 bg-card border border-border hover:border-primary transition-all duration-300"
              >
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                  <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-9 h-9 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-muted text-sm text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-display text-7xl text-muted/30 hidden lg:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Need a Custom<br />
            <span className="text-primary">Solution?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Every project is unique. Let's discuss your specific requirements and create a tailored solution.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground hover:bg-gold-light transition-colors uppercase tracking-wider text-sm font-medium"
          >
            Book Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
