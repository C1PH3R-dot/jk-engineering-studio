import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Target, Eye, Users } from "lucide-react";

const About = () => {
  const team = [
    { name: "James Knight", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { name: "Sarah Williams", role: "Chief Engineer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { name: "Michael Chen", role: "Project Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { name: "Emma Thompson", role: "Lead Architect", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
  ];

  const values = [
    { icon: Award, title: "Excellence", description: "We pursue the highest standards in every project we undertake." },
    { icon: Target, title: "Precision", description: "Attention to detail is at the core of everything we do." },
    { icon: Eye, title: "Innovation", description: "We embrace new technologies and methodologies to stay ahead." },
    { icon: Users, title: "Collaboration", description: "We work closely with clients to achieve their vision." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-primary text-sm uppercase tracking-wider">About Us</span>
          <h1 className="font-display text-6xl md:text-8xl mt-4 mb-8">
            Building the<br />
            <span className="text-primary">Future</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Since 1998, JK Engineering has been a trusted partner for businesses and organizations seeking innovative engineering solutions. Our commitment to excellence has made us a leader in the industry.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"
                alt="Our history"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 -z-10" />
            </div>
            <div>
              <span className="text-primary text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4 mb-6">
                25 Years of<br />Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  JK Engineering was founded in 1998 by James Knight, a visionary engineer with a dream to create a company that would redefine standards in the engineering industry.
                </p>
                <p>
                  What started as a small workshop with just five employees has grown into a full-service engineering firm with over 50 expert professionals. Throughout our journey, we've completed more than 500 projects across various sectors including construction, manufacturing, and infrastructure.
                </p>
                <p>
                  Today, we continue to push boundaries, embracing cutting-edge technology and sustainable practices to deliver solutions that meet the challenges of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-primary text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4">
              Our <span className="text-primary">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-background border border-border hover:border-primary transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 border border-primary rounded-full flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="p-10 border border-border hover:border-primary transition-colors">
              <span className="text-primary text-sm uppercase tracking-wider">Our Mission</span>
              <h3 className="font-display text-3xl mt-4 mb-6">Engineering Solutions That Matter</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide innovative, sustainable, and cost-effective engineering solutions that help our clients achieve their goals while contributing positively to society and the environment.
              </p>
            </div>
            <div className="p-10 border border-border hover:border-primary transition-colors">
              <span className="text-primary text-sm uppercase tracking-wider">Our Vision</span>
              <h3 className="font-display text-3xl mt-4 mb-6">Leading the Industry Forward</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized globally as a leader in engineering excellence, known for our innovative approach, technical expertise, and commitment to sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-primary text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4">
              Our <span className="text-primary">Team</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-display text-xl">{member.name}</h3>
                <p className="text-primary text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
