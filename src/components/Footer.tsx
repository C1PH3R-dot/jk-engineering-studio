import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center">
                <span className="font-display text-lg text-primary">JK</span>
              </div>
              <span className="font-display text-xl tracking-wider">ENGINEERING</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Precision engineering solutions for the modern world. Building tomorrow's infrastructure today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Projects
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/book" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@jkengineering.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail size={16} />
                info@jkengineering.com
              </a>
              <a href="tel:+441onal234567890" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone size={16} />
                +44 (0) 123 456 7890
              </a>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>123 Engineering Way<br />London, EC1A 1BB, UK</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} JK Engineering. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
