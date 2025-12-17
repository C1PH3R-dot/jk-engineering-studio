import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Book Appointment", path: "/book" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
            <span className="font-display text-lg text-primary group-hover:text-primary-foreground transition-colors duration-300">JK</span>
          </div>
          <span className="font-display text-xl tracking-wider hidden sm:block">ENGINEERING</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-sm tracking-wide uppercase ${
                location.pathname === link.path ? "text-primary" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border">
          <div className="flex flex-col py-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-6 py-4 text-lg tracking-wide uppercase hover:bg-muted transition-colors ${
                  location.pathname === link.path ? "text-primary" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
