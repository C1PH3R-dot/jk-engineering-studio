import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  buttons?: QuickButton[];
}

interface QuickButton {
  label: string;
  action: string;
}

const COMPANY_DATA = {
  name: 'JK Engineering',
  founded: '1998',
  founder: 'Joshua Kurian',
  experience: '25+ years',
  team: '50+ expert professionals',
  projectsCompleted: '500+',
  countriesServed: '15',
  clientRetention: '98%',
  tagline: 'Precision engineering solutions for the modern world. Building tomorrow\'s infrastructure today.',
  email: 'info@jkengineering.com',
  phone: '+44 (0) 123 456 7890',
  address: '123 Engineering Way, London, EC1A 1BB, United Kingdom',
  services: [
    { name: 'Structural Engineering', desc: 'Structural analysis and design, buildings, bridges, infrastructure, foundation design, steel & concrete structures, seismic-resistant designs.' },
    { name: 'Precision Manufacturing', desc: 'CNC machining, metal fabrication, custom components, tolerances up to 0.001mm, strict quality assurance.' },
    { name: 'Construction Management', desc: 'Project planning, site supervision, cost & timeline management, safety compliance.' },
    { name: 'Design & Drafting', desc: 'CAD drawings, 3D modeling, technical documentation, as-built drawings.' },
    { name: 'Engineering Consulting', desc: 'Feasibility studies, technical reviews, risk assessment, value engineering.' },
    { name: 'Maintenance Services', desc: 'Preventive maintenance, structural inspections, equipment servicing, emergency repairs.' },
  ],
  projects: [
    { name: 'Thames River Bridge', year: '2023', category: 'Structural Engineering' },
    { name: 'Precision Factory', year: '2023', category: 'Manufacturing' },
    { name: 'Modern Office Complex', year: '2022', category: 'Architectural Engineering' },
    { name: 'Industrial Plant Expansion', year: '2022', category: 'Civil Engineering' },
    { name: 'Renewable Energy Hub', year: '2021', category: 'Sustainable Engineering' },
    { name: 'Underground Metro Station', year: '2021', category: 'Infrastructure' },
  ],
  values: ['Excellence', 'Precision', 'Innovation', 'Collaboration'],
  mission: 'To deliver innovative, sustainable, and cost-effective engineering solutions that create long-term value.',
  vision: 'To be globally recognized for engineering excellence and sustainable innovation.',
};

const MAIN_MENU_BUTTONS: QuickButton[] = [
  { label: 'View Our Projects', action: 'projects' },
  { label: 'Explore Services', action: 'services' },
  { label: 'About JK Engineering', action: 'about' },
  { label: 'Book a Consultation', action: 'booking' },
  { label: 'Contact Information', action: 'contact' },
];

const SERVICE_BUTTONS: QuickButton[] = [
  { label: 'Structural Engineering', action: 'service_structural' },
  { label: 'Manufacturing Solutions', action: 'service_manufacturing' },
  { label: 'Construction Management', action: 'service_construction' },
  { label: 'Design & Drafting', action: 'service_design' },
  { label: 'Consulting Services', action: 'service_consulting' },
  { label: 'Maintenance Services', action: 'service_maintenance' },
  { label: '← Main Menu', action: 'main_menu' },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        `Hello 👋\nWelcome to JK Engineering.\nHow may I help you today?`,
        MAIN_MENU_BUTTONS
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (content: string, buttons?: QuickButton[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content,
        sender: 'bot',
        timestamp: new Date(),
        buttons,
      }]);
      setIsTyping(false);
    }, 500);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    }]);
  };

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'main_menu':
        addUserMessage('Main Menu');
        addBotMessage('How may I assist you today?', MAIN_MENU_BUTTONS);
        break;
      case 'projects':
        addUserMessage('View Our Projects');
        const projectsList = COMPANY_DATA.projects.map(p => `• ${p.name} (${p.year}) - ${p.category}`).join('\n');
        addBotMessage(
          `📌 Here are some of our featured projects:\n\n${projectsList}\n\nWould you like to learn more about any specific project or explore our services?`,
          [
            { label: 'View All Projects', action: 'navigate_projects' },
            { label: 'Explore Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'navigate_projects':
        addUserMessage('View All Projects');
        addBotMessage('I\'ll guide you to our projects page where you can see our complete portfolio.', [
          { label: 'Go to Projects Page', action: 'link_projects' },
          { label: '← Main Menu', action: 'main_menu' },
        ]);
        break;
      case 'link_projects':
        window.location.href = '/projects';
        break;
      case 'services':
        addUserMessage('Explore Services');
        addBotMessage(
          `We offer comprehensive engineering solutions:\n\n• Structural Engineering\n• Precision Manufacturing\n• Construction Management\n• Design & Drafting\n• Engineering Consulting\n• Maintenance Services\n\nWhich service would you like to know more about?`,
          SERVICE_BUTTONS
        );
        break;
      case 'service_structural':
        addUserMessage('Structural Engineering');
        addBotMessage(
          `🏗️ **Structural Engineering**\n\n${COMPANY_DATA.services[0].desc}\n\nOur structural engineering team has delivered landmark projects including the Thames River Bridge. Would you like to discuss your structural engineering needs?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_manufacturing':
        addUserMessage('Manufacturing Solutions');
        addBotMessage(
          `⚙️ **Precision Manufacturing**\n\n${COMPANY_DATA.services[1].desc}\n\nOur precision manufacturing capabilities are showcased in projects like the Precision Factory (2023). Interested in learning more?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_construction':
        addUserMessage('Construction Management');
        addBotMessage(
          `🏢 **Construction Management**\n\n${COMPANY_DATA.services[2].desc}\n\nWe ensure your projects are delivered on time and within budget. Would you like to schedule a consultation?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_design':
        addUserMessage('Design & Drafting');
        addBotMessage(
          `📐 **Design & Drafting**\n\n${COMPANY_DATA.services[3].desc}\n\nOur design team creates precise technical documentation for projects of all scales. Ready to start your project?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_consulting':
        addUserMessage('Consulting Services');
        addBotMessage(
          `💡 **Engineering Consulting**\n\n${COMPANY_DATA.services[4].desc}\n\nOur experts provide strategic guidance to optimize your engineering investments. Would you like expert advice?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_maintenance':
        addUserMessage('Maintenance Services');
        addBotMessage(
          `🔧 **Maintenance Services**\n\n${COMPANY_DATA.services[5].desc}\n\nWe keep your infrastructure running at peak performance. Need maintenance support?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'about':
        addUserMessage('About JK Engineering');
        addBotMessage(
          `**About JK Engineering**\n\nFounded in ${COMPANY_DATA.founded} by ${COMPANY_DATA.founder}, JK Engineering has grown from a small workshop with 5 employees into a full-service engineering firm.\n\n📊 **By the Numbers:**\n• ${COMPANY_DATA.experience} of experience\n• ${COMPANY_DATA.team}\n• ${COMPANY_DATA.projectsCompleted} projects completed\n• ${COMPANY_DATA.countriesServed} countries served\n• ${COMPANY_DATA.clientRetention} client retention\n\n**Our Mission:** ${COMPANY_DATA.mission}\n\n**Our Vision:** ${COMPANY_DATA.vision}`,
          [
            { label: 'Learn More', action: 'link_about' },
            { label: 'View Projects', action: 'projects' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'link_about':
        window.location.href = '/about';
        break;
      case 'booking':
        addUserMessage('Book a Consultation');
        addBotMessage(
          `📅 **Book a Consultation**\n\nI'd be happy to help you schedule a consultation with our expert engineers.\n\n**The booking process is simple:**\n1. Enter your personal details\n2. Select service & schedule\n3. Complete payment\n4. Receive confirmation\n\nWould you like to proceed?`,
          [
            { label: 'Start Booking', action: 'link_booking' },
            { label: 'Need Help?', action: 'booking_help' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'link_booking':
        window.location.href = '/book';
        break;
      case 'booking_help':
        addUserMessage('Need Help with Booking');
        addBotMessage(
          `I'm here to assist you with the booking process.\n\nIf you're experiencing any difficulties, you can:\n• Call us directly: ${COMPANY_DATA.phone}\n• Email us: ${COMPANY_DATA.email}\n\nOur team will respond within 24 hours during business days.`,
          [
            { label: 'Start Booking', action: 'link_booking' },
            { label: 'Contact Us', action: 'contact' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'contact':
        addUserMessage('Contact Information');
        addBotMessage(
          `📞 **Contact JK Engineering**\n\n**Email:** ${COMPANY_DATA.email}\n**Phone:** ${COMPANY_DATA.phone}\n\n**Address:**\n${COMPANY_DATA.address}\n\nOur team is available Monday to Friday, 9:00 AM - 6:00 PM GMT.`,
          [
            { label: 'Send an Inquiry', action: 'link_booking' },
            { label: 'Book Consultation', action: 'booking' },
            { label: '← Main Menu', action: 'main_menu' },
          ]
        );
        break;
      default:
        addBotMessage('How may I assist you?', MAIN_MENU_BUTTONS);
    }
  };

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();

    // Keyword matching for intelligent responses
    if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work')) {
      handleButtonClick('projects');
    } else if (lowerInput.includes('service') || lowerInput.includes('offer') || lowerInput.includes('what do you do')) {
      handleButtonClick('services');
    } else if (lowerInput.includes('about') || lowerInput.includes('company') || lowerInput.includes('who are you')) {
      handleButtonClick('about');
    } else if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('consultation') || lowerInput.includes('schedule')) {
      handleButtonClick('booking');
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('address') || lowerInput.includes('location')) {
      handleButtonClick('contact');
    } else if (lowerInput.includes('structural') || lowerInput.includes('bridge') || lowerInput.includes('building')) {
      handleButtonClick('service_structural');
    } else if (lowerInput.includes('manufacturing') || lowerInput.includes('cnc') || lowerInput.includes('fabrication')) {
      handleButtonClick('service_manufacturing');
    } else if (lowerInput.includes('construction') || lowerInput.includes('site') || lowerInput.includes('supervision')) {
      handleButtonClick('service_construction');
    } else if (lowerInput.includes('design') || lowerInput.includes('cad') || lowerInput.includes('drafting') || lowerInput.includes('drawing')) {
      handleButtonClick('service_design');
    } else if (lowerInput.includes('consulting') || lowerInput.includes('feasibility') || lowerInput.includes('advice')) {
      handleButtonClick('service_consulting');
    } else if (lowerInput.includes('maintenance') || lowerInput.includes('repair') || lowerInput.includes('inspection')) {
      handleButtonClick('service_maintenance');
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote') || lowerInput.includes('estimate')) {
      addBotMessage(
        `Project costs vary depending on scope, specifications, and site conditions. For an accurate estimate, I suggest booking a consultation with our engineers.`,
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: '← Main Menu', action: 'main_menu' },
        ]
      );
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      addBotMessage(
        `Hello! Welcome to JK Engineering. How may I assist you today?`,
        MAIN_MENU_BUTTONS
      );
    } else if (lowerInput.includes('thank')) {
      addBotMessage(
        `You're welcome! If there's anything else you need, I'm here to help.`,
        [
          { label: 'Start New Conversation', action: 'main_menu' },
          { label: 'Book Consultation', action: 'booking' },
        ]
      );
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      addBotMessage(
        `Thank you for visiting JK Engineering. If you have any further questions or would like to discuss a project, I'd be happy to assist. Have a great day!`,
        [
          { label: 'Start New Conversation', action: 'main_menu' },
        ]
      );
    } else {
      // Default fallback
      addBotMessage(
        `Thank you for your question. I recommend speaking with our engineering team to receive the most accurate guidance. Would you like to book a consultation or explore our services?`,
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Explore Services', action: 'services' },
          { label: 'Contact Team', action: 'contact' },
          { label: '← Main Menu', action: 'main_menu' },
        ]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processUserInput(inputValue);
    setInputValue('');
  };

  return (
    <>
      {/* Chat Widget Launcher */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gold text-charcoal-dark px-4 py-3 rounded-full shadow-lg hover:bg-gold-light transition-all duration-300 group",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Talk to an Engineer</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] bg-charcoal-dark border border-charcoal rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-charcoal p-4 flex items-center justify-between border-b border-charcoal-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-charcoal-dark font-bold text-sm">JK</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">JK Engineering</h3>
                <p className="text-xs text-muted-foreground">Virtual Consultant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn(
                  "flex flex-col gap-2",
                  message.sender === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] px-4 py-3 rounded-2xl whitespace-pre-line text-sm",
                    message.sender === 'user'
                      ? "bg-gold text-charcoal-dark rounded-br-md"
                      : "bg-charcoal text-foreground rounded-bl-md"
                  )}>
                    {message.content}
                  </div>
                  {message.buttons && (
                    <div className="flex flex-wrap gap-2 max-w-[85%]">
                      {message.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(btn.action)}
                          className="text-xs px-3 py-2 bg-charcoal hover:bg-charcoal-light text-foreground border border-charcoal-light rounded-full transition-colors"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-charcoal px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-charcoal">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-charcoal border-charcoal-light text-foreground placeholder:text-muted-foreground focus-visible:ring-gold"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-gold hover:bg-gold-light text-charcoal-dark"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Professional guidance, one message away.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
