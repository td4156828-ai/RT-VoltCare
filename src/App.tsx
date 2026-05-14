import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Lightbulb, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Menu, 
  X,
  MapPin,
  Mail,
  CheckCircle2,
  Hammer,
  MessageSquare
} from "lucide-react";

// --- Components ---

const Logo = ({ className = "", dark = false, minimal = false, size = "md" }: { className?: string; dark?: boolean; minimal?: boolean; size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16 sm:w-20 sm:h-20"
    };

    const textClasses = {
        sm: "text-xl",
        md: "text-2xl sm:text-3xl",
        lg: "text-4xl sm:text-6xl"
    };

    return (
        <div className={`inline-flex items-center gap-3 sm:gap-4 ${className} whitespace-nowrap`}>
            <div className={`relative ${sizeClasses[size]} flex-shrink-0 group`}>
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
                
                <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
                    {/* 3/4 Circular Border with Gradient feel */}
                    <path 
                        d="M20 50 A 30 30 0 1 1 80 50" 
                        fill="none" 
                        stroke="#EAB308" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                    />
                    
                    {/* Power Plug Integrated into the Border */}
                    <g transform="translate(80, 42) rotate(45)">
                        <rect x="-6" y="-8" width="12" height="15" rx="2" fill="#EAB308" />
                        <path d="M-3 -8 L-3 -15 M3 -8 L3 -15" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
                    </g>
    
                    {/* RT Main Typography */}
                    <g transform="translate(50, 58)">
                        {/* Stylized R */}
                        <path 
                            d="M-28 0 L-28 -28 L-8 -28 C2 -28, 7 -22, 7 -14 C7 -6, 2 0, -8 0 L-20 0 L-5 12" 
                            fill={dark ? "#FFFFFF" : "#111827"} 
                            className="transition-colors duration-300"
                        />
                        {/* Stylized T */}
                        <path 
                            d="M2 -28 L28 -28 M15 -28 L15 8" 
                            fill="none" 
                            stroke="#EAB308" 
                            strokeWidth="10" 
                            strokeLinecap="butt"
                        />
                        
                        {/* Central Lightning Strike */}
                        <path 
                            d="M-8 -24 L8 2 L-5 6 L12 28" 
                            fill="none" 
                            stroke="#EAB308" 
                            strokeWidth="5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="opacity-90"
                        >
                            <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                        </path>
                    </g>
    
                    {/* Bottom Status Dots */}
                    <g transform="translate(50, 88)">
                        <circle cx="-15" cy="0" r="2.5" fill="#EAB308" />
                        <circle cx="0" cy="0" r="2.5" fill="#EAB308" opacity="0.6" />
                        <circle cx="15" cy="0" r="2.5" fill="#EAB308" opacity="0.3" />
                    </g>
                </svg>
            </div>
    
            {!minimal && (
                <div className="flex flex-col translate-y-0.5">
                    <span className={`${textClasses[size]} font-black italic tracking-tighter leading-none ${dark ? "text-white" : "text-gray-900"}`}>
                        RT <span className="text-yellow-500">VOLTCARE</span>
                    </span>
                </div>
            )}
        </div>
    );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-700 hover:text-yellow-600 font-bold transition-colors text-sm uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+918013026363" 
              className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-full font-black hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-yellow-200/50 uppercase text-xs tracking-wider"
            >
              <PhoneCall className="w-4 h-4" />
              8013026363
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 py-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-gray-700 px-4 py-2 hover:bg-yellow-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+918013026363" 
              className="mx-4 mt-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-black text-center flex items-center justify-center gap-2 shadow-lg shadow-yellow-100"
            >
              <PhoneCall className="w-5 h-5" />
              8013026363
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0f1d]">
      {/* Lightning Effect Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left mx-auto lg:mx-0 max-w-3xl"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-10 relative"
            >
              <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 rounded-full" />
              <Logo size="lg" dark />
            </motion.div>

            <h1 className="text-6xl lg:text-9xl font-black text-white leading-none mb-4 italic tracking-tighter">
              RT <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.4)]">VoltCare</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-gray-300 font-bold uppercase tracking-widest text-sm">
               <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Wrench className="w-4 h-4 text-yellow-400" /> Tanmoy Debnath
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Wrench className="w-4 h-4 text-yellow-400" /> Rahul Mahato
               </div>
            </div>

            <p className="text-xl text-blue-100/70 mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
               Providing fast, reliable, and affordable electrical services in Barasat, Madhyamgram, and surrounding areas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="tel:+918013026363" className="group px-8 py-5 bg-yellow-400 text-gray-900 rounded-xl font-black text-lg hover:bg-yellow-500 transition-all text-center flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(250,204,21,0.3)]">
                CALL 8013026363
                <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://wa.me/918013026363" target="_blank" rel="noreferrer" className="px-8 py-5 bg-transparent text-white border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all text-center flex items-center justify-center gap-3">
                WhatsApp Us
                <MessageSquare className="w-5 h-5 text-yellow-400" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-yellow-400" />
                 <span className="text-gray-400 font-bold text-sm">North 24 Parganas</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 bg-yellow-500 rounded-full" />
              <div className="text-yellow-400 font-black text-sm uppercase tracking-[0.2em]">FAST • RELIABLE • AFFORDABLE</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
    const steps = [
        {
            title: "Book Service",
            icon: <PhoneCall />,
            desc: "Easily inform us about your problem via our website or phone call."
        },
        {
            title: "Inspection",
            icon: <MapPin />,
            desc: "Our expert will visit your premises to thoroughly inspect the issue."
        },
        {
            title: "Repairing",
            icon: <Wrench />,
            desc: "We fix the issue quickly and accurately using modern tools."
        },
        {
            title: "Safety Check",
            icon: <ShieldCheck />,
            desc: "After finishing, we verify the entire system for your safety."
        }
    ];

    return (
        <section id="process" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">How We Work</h2>
                    <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 border-t-2 border-dashed border-amber-200 -z-10" />
                            )}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-500 font-medium">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const faqs = [
        { q: "How much is the service charge?", a: "Our service charge varies depending on the type of work. However, we always ensure competitive and affordable pricing." },
        { q: "Can you come for emergency needs?", a: "Yes, we have a special team that works 24/7 just for emergency cases." },
        { q: "Is there any guarantee after work?", a: "Of course! After every task, we offer a free service guarantee and follow-up checkup for a specific time." }
    ];

    const [active, setActive] = useState<number | null>(null);

    return (
        <section className="py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-black text-center mb-16 underline decoration-amber-500 underline-offset-8 transition-all hover:decoration-amber-400 cursor-default">Frequently Asked Questions (FAQ)</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all hover:bg-white/10">
                            <button 
                                onClick={() => setActive(active === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-bold">{faq.q}</span>
                                {active === i ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5" />}
                            </button>
                            {active === i && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="px-6 pb-6 text-gray-400 font-medium"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = () => {
  const services = [
    {
      title: "Switch Board Installation",
      desc: "Complete installation and repair of all types of modern switch boards.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-400"
    },
    {
      title: "MCB Box Setup",
      desc: "Safe and standard MCB box setup to protect your home from short circuits.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-500"
    },
    {
      title: "House Wiring",
      desc: "Premium house wiring for new buildings and expert repairs for old ones.",
      icon: <MapPin className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-600"
    },
    {
      title: "Fault Detection",
      desc: "Quickly finding and fixing electrical leaks and hidden faults.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-400"
    },
    {
      title: "Light & Fan Installation",
      desc: "Perfect installation of all kinds of decorative lights and high-speed fans.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-500"
    },
    {
      title: "Socket Replacement",
      desc: "Replacing old or burnt sockets and switches with high-quality parts.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-600"
    },
    {
      title: "Water Pump Connection",
      desc: "Professional wiring and connection for domestic and submersible pumps.",
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-400"
    },
    {
      title: "Inverter Line Connection",
      desc: "Expert setup for inverters and battery lines for backup power.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-400/10 text-yellow-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0a0f1d] border-y border-white/5 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">OUR <span className="text-yellow-400">SERVICES</span></h2>
          <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-tight">
            Fast • Reliable • Affordable Service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-400 hover:bg-white/10 transition-all group flex flex-col items-center text-center shadow-xl"
            >
              <div className={`w-16 h-16 ${s.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all border border-yellow-400/20`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{s.title}</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const points = [
    "10+ Years Expert Team",
    "Best Value at Affordable Price",
    "Use of Modern Equipment",
    "Free Checkup After Work",
    "Fast Response in Emergency",
    "Security & Safety Assurance"
  ];

  return (
    <section id="why-us" className="py-24 bg-gray-50 overflow-hidden relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight text-gray-900">
              Why You Should <br />
              <span className="text-amber-600">Choose Us?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {points.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 justify-center">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-700">{p}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="p-8 bg-amber-500 rounded-3xl text-white text-center">
                   <div className="text-4xl font-black mb-2 tracking-tight">99%</div>
                   <div className="font-bold opacity-80 uppercase text-xs">Success Rate</div>
                </div>
                <div className="p-8 bg-gray-900 rounded-3xl text-white text-center">
                   <div className="text-4xl font-black mb-2 tracking-tight">10k+</div>
                   <div className="font-bold opacity-80 uppercase text-xs">Happy Clients</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative">
          <div className="lg:w-5/12 bg-yellow-400 p-12 text-gray-900 relative overflow-hidden">
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
            <h2 className="text-4xl font-black mb-8 relative z-10 uppercase italic">Contact Us</h2>
            <p className="text-gray-900/70 mb-12 text-lg font-bold relative z-10 leading-tight uppercase tracking-wider">
              We Care For Your Power. <br />Available 24/7 for you.
            </p>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-gray-900/60 text-xs font-black uppercase tracking-widest">Main Call</div>
                  <div className="font-black text-2xl tracking-tighter">8013026363</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-gray-900/60 text-xs font-black uppercase tracking-widest">Email Address</div>
                  <div className="font-black text-xl tracking-tighter">td4156828@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-gray-900/60 text-xs font-black uppercase tracking-widest">WhatsApp</div>
                  <a href="https://wa.me/918013026363" target="_blank" rel="noreferrer" className="font-black text-2xl tracking-tighter hover:text-gray-900 transition-colors">Click to Chat</a>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-gray-900/60 text-xs font-black uppercase tracking-widest">Location</div>
                  <div className="font-black text-lg leading-none uppercase tracking-tighter">Barasat / Madhyamgram, N24P</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 p-12 bg-white text-gray-900">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Work Details</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your requirements..."
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none resize-none text-lg font-medium"
                  ></textarea>
                </div>
                <button className="group w-full py-6 bg-gray-900 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                  Send Message
                  <Zap className="w-6 h-6 group-hover:fill-current" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Message Sent Successfully!</h3>
                <p className="text-gray-500 text-lg font-medium max-w-sm">We have received your application. One of our experts will contact you today.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-10 px-8 py-3 ring-2 ring-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050810] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
           <div>
              <Logo dark size="md" className="mb-8" />
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest leading-loose">
                  Electrical Solutions You Can Trust. <br />
                  Provided by Tanmoy Debnath & Rahul Mahato.
              </p>
           </div>
           <div>
              <h4 className="text-sm font-black text-yellow-400 mb-6 uppercase tracking-[0.3em]">Quick Links</h4>
              <ul className="space-y-4 font-bold text-gray-400 text-xs uppercase tracking-widest">
                 <li className="hover:text-yellow-400 transition-colors cursor-pointer">House Wiring</li>
                 <li className="hover:text-yellow-400 transition-colors cursor-pointer">MCB Box Setup</li>
                 <li className="hover:text-yellow-400 transition-colors cursor-pointer">Inverter Line</li>
                 <li className="hover:text-yellow-400 transition-colors cursor-pointer">Fault Detection</li>
              </ul>
           </div>
           <div>
              <h4 className="text-sm font-black text-yellow-400 mb-6 uppercase tracking-[0.3em]">Coverage</h4>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest leading-loose">
                Barasat, Madhyamgram, <br />
                North 24 Parganas, WB.
              </p>
           </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 RT VOLTCARE. DESIGNED FOR POWER.
            </p>
        </div>
      </div>
    </footer>
  );
};

const LiveSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.map(m => ({
                      role: m.role,
                      parts: [{ text: m.text }]
                    }))
                }),
            });
            const data = await response.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: 'model', text: data.text }]);
            } else if (data.error) {
              setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please call us at 8013026363 for direct support." }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please call us at 8013026363 for direct support." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-yellow-400 text-gray-900 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center gap-3 border-2 border-gray-900/10"
                >
                    <div className="bg-gray-900 text-yellow-400 p-2 rounded-full">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest hidden md:block pr-2">24/7 SUPPORT</span>
                </button>
            )}

            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white w-[350px] max-w-[90vw] h-[500px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col border border-gray-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-5 bg-gray-900 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Logo dark minimal size="sm" />
                            <div>
                                <div className="font-black text-sm uppercase tracking-tighter italic">RT <span className="text-yellow-400">Support</span></div>
                                <div className="text-[10px] text-yellow-400 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-0.5">
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Online Now
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
                        <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 text-sm font-bold text-gray-700 leading-relaxed uppercase tracking-tight">
                             Hello! How can we help you today? Our expert support team is ready to assist you.
                        </div>
                        {messages.map((m, i) => (
                            <div 
                                key={i} 
                                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-sm leading-relaxed ${
                                    m.role === 'user' 
                                    ? 'bg-yellow-400 text-gray-900 rounded-tr-none' 
                                    : 'bg-white text-gray-600 rounded-tl-none border border-gray-100'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-gray-100 flex gap-1.5 h-10 items-center px-5">
                                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-5 bg-white border-t border-gray-100 flex gap-3">
                        <input 
                            type="text" 
                            required
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="w-12 h-12 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 transition-all flex-shrink-0 shadow-lg"
                        >
                            <Zap className="w-6 h-6" />
                        </button>
                    </form>
                </motion.div>
            )}
        </div>
    );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1200); // Short delay matches the inner animation duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-[#0a0f1d] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Surge Effects - Simplified */}
            <div className="absolute inset-0 bg-slate-900/40 shrink-0" />
            <motion.div 
                animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-[400px] h-[400px] bg-yellow-400/5 blur-[80px] rounded-full"
            />

            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center will-change-transform w-full px-4"
            >
                <div className="relative mb-8">
                    {/* Pulsing Aura - Reduced Blur */}
                    <motion.div 
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 rounded-full" 
                    />
                    
                    {/* Scaling Logo - Removed filter animation */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="will-change-transform"
                    >
                        <Logo size="lg" dark />
                    </motion.div>
                </div>

                {/* Progress Bar (Visual only) */}
                <div className="w-32 sm:w-40 h-1 bg-white/10 rounded-full overflow-hidden mt-8 sm:mt-12 relative">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="h-full bg-yellow-400"
                    />
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 text-yellow-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] px-4 text-center"
                >
                    System Powering Up...
                </motion.div>
            </motion.div>

            {/* Electrical Sparks (Simplified) */}
            <div className="absolute top-0 w-full flex justify-around opacity-10 pointer-events-none">
                {[1, 2].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ y: [0, 300], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.5, repeat: Infinity }}
                        className="w-[1px] h-10 bg-yellow-400"
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-100 selection:text-gray-900 scroll-smooth">
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Process />
            <WhyUs />
            <FAQ />
            <ContactForm />
          </main>
          <Footer />
          <LiveSupport />
        </motion.div>
      )}
    </div>
  );
}
