import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ChatState {
  messages: Message[];
  lastTopic: string;
  messageCount: number;
}

const STORAGE_KEY = 'caremate_chat_state';

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
  workingHours: 'Monday – Friday, 9:00 AM – 6:00 PM (UK Time)',
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
  { label: 'View Projects', action: 'projects' },
  { label: 'Explore Services', action: 'services' },
  { label: 'About JK Engineering', action: 'about' },
  { label: 'Book a Consultation', action: 'booking' },
  { label: 'Contact Information', action: 'contact' },
  { label: 'Start New Chat', action: 'new_chat' },
];

const SERVICE_BUTTONS: QuickButton[] = [
  { label: 'Structural Engineering', action: 'service_structural' },
  { label: 'Manufacturing Solutions', action: 'service_manufacturing' },
  { label: 'Construction Management', action: 'service_construction' },
  { label: 'Design & Drafting', action: 'service_design' },
  { label: 'Consulting Services', action: 'service_consulting' },
  { label: 'Maintenance Services', action: 'service_maintenance' },
  { label: 'Main Menu', action: 'main_menu' },
];

// Spelling corrections and abbreviations mapping
const SPELLING_MAP: Record<string, string> = {
  'yoo': 'hello', 'yo': 'hello', 'helo': 'hello', 'hii': 'hi', 'heloo': 'hello',
  'wrkng': 'working', 'wrking': 'working', 'hrs': 'hours', 'hr': 'hours',
  'abt': 'about', 'ur': 'your', 'u': 'you', 'r': 'are',
  'cnc': 'cnc machining', 'cad': 'cad design',
  'bok': 'book', 'buk': 'book', 'appoinment': 'appointment', 'apointment': 'appointment',
  'servics': 'services', 'servces': 'services', 'srvices': 'services',
  'compny': 'company', 'cmpany': 'company', 'compani': 'company',
  'projcts': 'projects', 'projetcs': 'projects', 'prjcts': 'projects',
  'consltation': 'consultation', 'consultatn': 'consultation',
  'enginrng': 'engineering', 'engneering': 'engineering', 'engg': 'engineering',
  'structral': 'structural', 'strctural': 'structural',
  'manufacturng': 'manufacturing', 'mfg': 'manufacturing',
  'constrctn': 'construction', 'constructn': 'construction',
  'maintainence': 'maintenance', 'maintnance': 'maintenance',
  'phn': 'phone', 'fon': 'phone', 'tel': 'phone',
  'addres': 'address', 'adress': 'address', 'locatn': 'location',
  'pls': 'please', 'plz': 'please', 'thx': 'thanks', 'thnks': 'thanks',
  'gd': 'good', 'mrng': 'morning', 'evng': 'evening', 'afternon': 'afternoon',
};

// Normalize input text
const normalizeInput = (input: string): string => {
  let normalized = input.toLowerCase().trim();
  
  // Replace abbreviations and fix spellings
  Object.entries(SPELLING_MAP).forEach(([key, value]) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    normalized = normalized.replace(regex, value);
  });
  
  return normalized;
};

// Detect negative sentiment
const detectNegativeSentiment = (input: string): boolean => {
  const negativeWords = ['frustrated', 'annoyed', 'angry', 'upset', 'disappointed', 'terrible', 'awful', 'bad', 'hate', 'useless', 'waste', 'slow', 'unhelpful'];
  const normalized = input.toLowerCase();
  return negativeWords.some(word => normalized.includes(word));
};

// Check if query is ambiguous (single word that could mean multiple things)
const isAmbiguousQuery = (input: string): string | null => {
  const normalized = normalizeInput(input);
  const ambiguousTerms: Record<string, string> = {
    'bridge': 'projects or services',
    'factory': 'projects or services',
    'design': 'services or projects',
    'consult': 'booking or services',
    'building': 'projects or services',
    'metro': 'projects',
    'office': 'projects or contact',
    'plant': 'projects',
    'energy': 'projects',
  };
  
  for (const [term, context] of Object.entries(ambiguousTerms)) {
    if (normalized === term || (normalized.split(' ').length === 1 && normalized.includes(term))) {
      return context;
    }
  }
  return null;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<string>('');
  const [messageCount, setMessageCount] = useState(0);
  const [hasOfferedHandover, setHasOfferedHandover] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed: ChatState = JSON.parse(savedState);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.messages.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(messagesWithDates);
        setLastTopic(parsed.lastTopic || '');
        setMessageCount(parsed.messageCount || 0);
      } catch (e) {
        console.error('Failed to parse chat state:', e);
      }
    }
  }, []);

  // Save chat state to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const state: ChatState = {
        messages,
        lastTopic,
        messageCount,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [messages, lastTopic, messageCount]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle initial greeting or welcome back
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        `Welcome to JK Engineering.\nI'm CareMate, your virtual consultant.\nHow may I assist you today?`,
        MAIN_MENU_BUTTONS
      );
    } else if (isOpen && messages.length > 0 && lastTopic) {
      // Welcome back message only if reopening with history
      const lastBotMessage = messages[messages.length - 1];
      if (lastBotMessage?.sender === 'user') {
        addBotMessage(
          `Welcome back. We were discussing ${lastTopic}. Would you like to continue?`,
          [
            { label: 'Continue', action: 'continue_topic' },
            { label: 'Start New Chat', action: 'new_chat' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
      }
    }
  }, [isOpen]);

  // Inactivity prompt
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Clear existing timer
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      
      // Set new timer for 15 seconds of inactivity
      const timer = setTimeout(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === 'bot' && !lastMessage.buttons?.length) {
          addBotMessage(
            'You may explore our services, view completed projects, or schedule a consultation at your convenience.',
            MAIN_MENU_BUTTONS.filter(b => b.action !== 'new_chat')
          );
        }
      }, 15000);
      
      setInactivityTimer(timer);
      
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const addBotMessage = useCallback((content: string, buttons?: QuickButton[]) => {
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
    }, 700);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    }]);
    setMessageCount(prev => prev + 1);
  }, []);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setLastTopic('');
    setMessageCount(0);
    setHasOfferedHandover(false);
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => {
      addBotMessage(
        `Welcome to JK Engineering.\nI'm CareMate, your virtual consultant.\nHow may I assist you today?`,
        MAIN_MENU_BUTTONS
      );
    }, 100);
  }, [addBotMessage]);

  const handleButtonClick = useCallback((action: string) => {
    switch (action) {
      case 'new_chat':
        handleNewChat();
        break;
      case 'continue_topic':
        addBotMessage(
          'Of course. Please continue with your question or select an option below.',
          MAIN_MENU_BUTTONS
        );
        break;
      case 'main_menu':
        addUserMessage('Main Menu');
        addBotMessage('How may I assist you today?', MAIN_MENU_BUTTONS);
        break;
      case 'projects':
        addUserMessage('View Projects');
        setLastTopic('our projects');
        const projectsList = COMPANY_DATA.projects.map(p => `• ${p.name} (${p.year}) - ${p.category}`).join('\n');
        addBotMessage(
          `Here are some of our featured projects:\n\n${projectsList}\n\nWould you like more details on any specific project or would you prefer to explore our services?`,
          [
            { label: 'View All Projects', action: 'navigate_projects' },
            { label: 'Explore Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'navigate_projects':
        addUserMessage('View All Projects');
        addBotMessage('I can guide you to our projects page where you can see our complete portfolio.', [
          { label: 'Go to Projects Page', action: 'link_projects' },
          { label: 'Main Menu', action: 'main_menu' },
        ]);
        break;
      case 'link_projects':
        window.location.href = '/projects';
        break;
      case 'services':
        addUserMessage('Explore Services');
        setLastTopic('our services');
        addBotMessage(
          `We offer comprehensive engineering solutions:\n\n• Structural Engineering\n• Precision Manufacturing\n• Construction Management\n• Design & Drafting\n• Engineering Consulting\n• Maintenance Services\n\nWhich service would you like to know more about?`,
          SERVICE_BUTTONS
        );
        break;
      case 'service_structural':
        addUserMessage('Structural Engineering');
        setLastTopic('structural engineering services');
        addBotMessage(
          `**Structural Engineering**\n\n${COMPANY_DATA.services[0].desc}\n\nOur engineering team has delivered landmark projects including the Thames River Bridge. Would you like to discuss your structural engineering needs?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_manufacturing':
        addUserMessage('Manufacturing Solutions');
        setLastTopic('precision manufacturing services');
        addBotMessage(
          `**Precision Manufacturing**\n\n${COMPANY_DATA.services[1].desc}\n\nOur precision manufacturing capabilities are showcased in projects like the Precision Factory (2023). Would you like me to expand on this or guide you to the next step?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_construction':
        addUserMessage('Construction Management');
        setLastTopic('construction management services');
        addBotMessage(
          `**Construction Management**\n\n${COMPANY_DATA.services[2].desc}\n\nWe ensure your projects are delivered on time and within budget. Would you like to schedule a consultation?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_design':
        addUserMessage('Design & Drafting');
        setLastTopic('design and drafting services');
        addBotMessage(
          `**Design & Drafting**\n\n${COMPANY_DATA.services[3].desc}\n\nOur design team creates precise technical documentation for projects of all scales. Ready to start your project?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_consulting':
        addUserMessage('Consulting Services');
        setLastTopic('engineering consulting services');
        addBotMessage(
          `**Engineering Consulting**\n\n${COMPANY_DATA.services[4].desc}\n\nOur experts provide strategic guidance to optimize your engineering investments. Would you like expert advice?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'service_maintenance':
        addUserMessage('Maintenance Services');
        setLastTopic('maintenance services');
        addBotMessage(
          `**Maintenance Services**\n\n${COMPANY_DATA.services[5].desc}\n\nWe keep your infrastructure running at peak performance. Need maintenance support?`,
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'View Other Services', action: 'services' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'about':
        addUserMessage('About JK Engineering');
        setLastTopic('our company');
        addBotMessage(
          `**About JK Engineering**\n\nFounded in ${COMPANY_DATA.founded} by ${COMPANY_DATA.founder}, JK Engineering has grown from a small workshop with 5 employees into a full-service engineering firm.\n\n**By the Numbers:**\n• ${COMPANY_DATA.experience} of experience\n• ${COMPANY_DATA.team}\n• ${COMPANY_DATA.projectsCompleted} projects completed\n• ${COMPANY_DATA.countriesServed} countries served\n• ${COMPANY_DATA.clientRetention} client retention\n\n**Mission:** ${COMPANY_DATA.mission}\n\n**Vision:** ${COMPANY_DATA.vision}`,
          [
            { label: 'Learn More', action: 'link_about' },
            { label: 'View Projects', action: 'projects' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'link_about':
        window.location.href = '/about';
        break;
      case 'booking':
        addUserMessage('Book a Consultation');
        setLastTopic('booking a consultation');
        addBotMessage(
          `**Book a Consultation**\n\nI can help you schedule a consultation with our engineering team.\n\n**The booking process:**\n1. Enter your personal details\n2. Select service & schedule\n3. Complete payment\n4. Receive confirmation\n\nConsultation booking is available online anytime.\n\nWould you like to proceed?`,
          [
            { label: 'Start Booking', action: 'link_booking' },
            { label: 'Need Assistance?', action: 'booking_help' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'link_booking':
        window.location.href = '/book';
        break;
      case 'booking_help':
        addUserMessage('Need Assistance with Booking');
        addBotMessage(
          `I can assist you with the booking process.\n\nIf you prefer direct assistance:\n• Call: ${COMPANY_DATA.phone}\n• Email: ${COMPANY_DATA.email}\n\nOur team responds within 24 hours during business days.`,
          [
            { label: 'Start Booking', action: 'link_booking' },
            { label: 'Contact Us', action: 'contact' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'contact':
        addUserMessage('Contact Information');
        setLastTopic('contact information');
        addBotMessage(
          `**Contact JK Engineering**\n\n**Email:** ${COMPANY_DATA.email}\n**Phone:** ${COMPANY_DATA.phone}\n\n**Address:**\n${COMPANY_DATA.address}\n\n**Working Hours:**\n${COMPANY_DATA.workingHours}\n\nClosed on weekends. Consultation booking available online anytime.`,
          [
            { label: 'Send an Inquiry', action: 'link_booking' },
            { label: 'Book Consultation', action: 'booking' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      case 'ambiguous_projects':
        addUserMessage('Related Projects');
        handleButtonClick('projects');
        break;
      case 'ambiguous_services':
        addUserMessage('Related Services');
        handleButtonClick('services');
        break;
      case 'speak_expert':
        addUserMessage('Speak to an Expert');
        addBotMessage(
          'I can arrange a conversation with one of our engineers for deeper discussion. Would you like to book a consultation or contact us directly?',
          [
            { label: 'Book Consultation', action: 'booking' },
            { label: 'Contact Us', action: 'contact' },
            { label: 'Main Menu', action: 'main_menu' },
          ]
        );
        break;
      default:
        addBotMessage('How may I assist you?', MAIN_MENU_BUTTONS);
    }
  }, [addBotMessage, addUserMessage, handleNewChat]);

  const processUserInput = useCallback((input: string) => {
    const normalizedInput = normalizeInput(input);
    const lowerInput = normalizedInput;
    
    // Check for negative sentiment first
    if (detectNegativeSentiment(input)) {
      addBotMessage(
        'I understand your concern. Let me address this clearly and help you find the right solution. Could you share more details about what you need?',
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Contact Team', action: 'contact' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Check for ambiguous single-word queries
    const ambiguity = isAmbiguousQuery(input);
    if (ambiguity) {
      addBotMessage(
        `Are you looking for information on our projects or services related to this?`,
        [
          { label: 'Related Projects', action: 'ambiguous_projects' },
          { label: 'Related Services', action: 'ambiguous_services' },
          { label: 'Speak to an Expert', action: 'speak_expert' },
        ]
      );
      return;
    }

    // Handle human handover after many messages
    if (messageCount >= 6 && !hasOfferedHandover) {
      setHasOfferedHandover(true);
      addBotMessage(
        'If you would like, I can arrange a conversation with one of our engineers for deeper discussion.',
        [
          { label: 'Speak to Expert', action: 'speak_expert' },
          { label: 'Continue Chat', action: 'main_menu' },
        ]
      );
      return;
    }

    // Greeting variations
    if (/^(hi|hello|hey|yoo|yo|hii|good morning|good evening|good afternoon|greetings)/.test(lowerInput)) {
      addBotMessage(
        'Hello. How may I assist you today?',
        MAIN_MENU_BUTTONS
      );
      return;
    }

    // FAQ: Working hours
    if (lowerInput.includes('working hours') || lowerInput.includes('open') || lowerInput.includes('hours') || lowerInput.includes('time')) {
      setLastTopic('working hours');
      addBotMessage(
        `**Working Hours:**\n${COMPANY_DATA.workingHours}\n\nClosed on weekends.\nConsultation booking is available online anytime.`,
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Contact Us', action: 'contact' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Search-style queries
    if (lowerInput.includes('jk engineering') || lowerInput.includes('engineering firm') || lowerInput.includes('engineering company') || lowerInput.includes('uk')) {
      addBotMessage(
        `JK Engineering is a full-service engineering firm based in London, UK. Founded in ${COMPANY_DATA.founded}, we specialize in structural engineering, precision manufacturing, and construction management.\n\nHow may I assist you further?`,
        MAIN_MENU_BUTTONS
      );
      return;
    }

    // Project keywords
    if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work') || lowerInput.includes('completed')) {
      handleButtonClick('projects');
      return;
    }

    // Service keywords
    if (lowerInput.includes('service') || lowerInput.includes('offer') || lowerInput.includes('what do you do') || lowerInput.includes('what you do')) {
      handleButtonClick('services');
      return;
    }

    // About keywords
    if (lowerInput.includes('about') || lowerInput.includes('company') || lowerInput.includes('who are you') || lowerInput.includes('tell me about')) {
      handleButtonClick('about');
      return;
    }

    // Booking keywords
    if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('consultation') || lowerInput.includes('schedule') || lowerInput.includes('meeting')) {
      handleButtonClick('booking');
      return;
    }

    // Contact keywords
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('address') || lowerInput.includes('location') || lowerInput.includes('where')) {
      handleButtonClick('contact');
      return;
    }

    // Service-specific keywords
    if (lowerInput.includes('structural') || lowerInput.includes('bridge') || lowerInput.includes('building structure')) {
      handleButtonClick('service_structural');
      return;
    }
    if (lowerInput.includes('manufacturing') || lowerInput.includes('cnc') || lowerInput.includes('fabrication') || lowerInput.includes('machining')) {
      handleButtonClick('service_manufacturing');
      return;
    }
    if (lowerInput.includes('construction') || lowerInput.includes('site') || lowerInput.includes('supervision')) {
      handleButtonClick('service_construction');
      return;
    }
    if (lowerInput.includes('design') || lowerInput.includes('cad') || lowerInput.includes('drafting') || lowerInput.includes('drawing') || lowerInput.includes('3d')) {
      handleButtonClick('service_design');
      return;
    }
    if (lowerInput.includes('consulting') || lowerInput.includes('feasibility') || lowerInput.includes('advice') || lowerInput.includes('review')) {
      handleButtonClick('service_consulting');
      return;
    }
    if (lowerInput.includes('maintenance') || lowerInput.includes('repair') || lowerInput.includes('inspection')) {
      handleButtonClick('service_maintenance');
      return;
    }

    // Price/cost - redirect to consultation
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote') || lowerInput.includes('estimate') || lowerInput.includes('how much')) {
      addBotMessage(
        'Project costs vary depending on scope, specifications, and site conditions. For an accurate estimate, I suggest booking a consultation with our engineering team.',
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Legal/compliance - redirect
    if (lowerInput.includes('legal') || lowerInput.includes('compliance') || lowerInput.includes('certification') || lowerInput.includes('certified') || lowerInput.includes('regulation')) {
      addBotMessage(
        'For legal or regulatory matters, our specialists can provide verified information. Please contact us directly or schedule a consultation.',
        [
          { label: 'Contact Us', action: 'contact' },
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Technical calculations - redirect
    if (lowerInput.includes('calculate') || lowerInput.includes('calculation') || lowerInput.includes('formula') || lowerInput.includes('load bearing')) {
      addBotMessage(
        'This topic requires a detailed technical evaluation by our engineering team. I recommend scheduling a consultation so our experts can provide precise guidance.',
        [
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Thank you responses
    if (lowerInput.includes('thank') || lowerInput.includes('okay') || lowerInput.includes('ok') || lowerInput.includes('done') || lowerInput.includes('great')) {
      addBotMessage(
        'You are welcome. If you need further assistance, I am here to help.',
        [
          { label: 'Start New Chat', action: 'new_chat' },
          { label: 'Book Consultation', action: 'booking' },
          { label: 'Main Menu', action: 'main_menu' },
        ]
      );
      return;
    }

    // Goodbye
    if (lowerInput.includes('bye') || lowerInput.includes('goodbye') || lowerInput.includes('see you')) {
      addBotMessage(
        'Thank you for visiting JK Engineering. If you have any further questions or would like to discuss a project, I would be happy to assist.',
        [
          { label: 'Start New Chat', action: 'new_chat' },
        ]
      );
      return;
    }

    // Clarification for unclear input
    if (input.trim().length < 3) {
      addBotMessage(
        'Could you please clarify your requirement so I can assist you more effectively?',
        MAIN_MENU_BUTTONS
      );
      return;
    }

    // Smart fallback - not lazy
    addBotMessage(
      'I may not have enough context for that request. Would you like me to connect you with our engineering team or help you book a consultation?',
      [
        { label: 'Book Consultation', action: 'booking' },
        { label: 'Explore Services', action: 'services' },
        { label: 'Contact Team', action: 'contact' },
        { label: 'Main Menu', action: 'main_menu' },
      ]
    );
  }, [addBotMessage, handleButtonClick, messageCount, hasOfferedHandover]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userInput = inputValue;
    setInputValue('');
    
    setTimeout(() => {
      processUserInput(userInput);
    }, 100);
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

      {/* Chat Window - Glassmorphism Effect */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[620px] max-h-[85vh] max-w-[calc(100vw-48px)] backdrop-blur-xl bg-charcoal-dark/80 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-charcoal/90 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-lg">
                <span className="text-charcoal-dark font-bold text-sm">CM</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">CareMate</h3>
                <p className="text-xs text-muted-foreground">Virtual Engineering Consultant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Start New Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 scroll-smooth"
          >
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
                      : "bg-white/10 backdrop-blur-sm text-foreground rounded-bl-md border border-white/5"
                  )}>
                    {message.content}
                  </div>
                  {message.buttons && (
                    <div className="flex flex-wrap gap-2 max-w-[85%]">
                      {message.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(btn.action)}
                          className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/10 rounded-full transition-all duration-200 hover:border-gold/30"
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
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">CareMate is responding</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-charcoal/50 backdrop-blur-md">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-gold/50 focus-visible:border-gold/30"
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
