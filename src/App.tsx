import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Menu as MenuIcon, 
  X,
  ExternalLink,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Constants & Data ---

const IMAGES = [
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop", // Sushi platter
  "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2050&auto=format&fit=crop", // Sushi chef
  "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=2070&auto=format&fit=crop", // Salmon nigiri
  "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2064&auto=format&fit=crop", // Sushi boat
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop", // Japanese restaurant interior
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd3b91?q=80&w=2070&auto=format&fit=crop", // Sushi close up
  "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=2070&auto=format&fit=crop", // Gyoza/Entradas
  "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=2070&auto=format&fit=crop", // Temaki
  "https://images.unsplash.com/photo-1562158074-2743289ad850?q=80&w=2070&auto=format&fit=crop", // Drinks
  "https://images.unsplash.com/photo-1563612116625-3012372fccce?q=80&w=2070&auto=format&fit=crop", // Sushi set
];

const LOGO_URL = "/logo.png"; // Substitua pelo caminho do seu logo real

const MENU_CATEGORIES = [
  {
    id: "entradas",
    name: "Entradas",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=800&auto=format&fit=crop",
    items: [
      { name: "Sunomono", price: "R$ 6,00", desc: "Salada de pepino japonês, kani kama e gergelim." },
      { name: "Hot Philadelphia", price: "R$ 12,00", desc: "Sushi empanado e frito, recheado com salmão e cream cheese." },
      { name: "Carpaccio de Salmão", price: "R$ 35,00", desc: "Lâminas de salmão, cebola confit, shitimi e cebolinha." },
      { name: "Shake Dyoto", price: "R$ 25,00", desc: "Salmão empanado, lâminas de salmão, spice mayo e teriyake." },
    ]
  },
  {
    id: "temakis",
    name: "Temakis",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=800&auto=format&fit=crop",
    items: [
      { name: "Temaki Philadelphia", price: "R$ 16,00", desc: "Arroz, salmão, cream cheese e cebolinha." },
      { name: "Temaki Alaska", price: "R$ 16,00", desc: "Arroz, salmão, cream cheese e pepino." },
      { name: "Temaki Fresh", price: "R$ 16,00", desc: "Salmão, limão e gengibre." },
      { name: "Temaki Skin", price: "R$ 14,00", desc: "Pele de salmão grelhada, gergelim e teriyake." },
    ]
  },
  {
    id: "nigiris",
    name: "Nigiris",
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=800&auto=format&fit=crop",
    items: [
      { name: "Nigiri Shake", price: "R$ 8,00", desc: "Dupla de nigiri de salmão fresco." },
      { name: "Nigiri Skin", price: "R$ 7,00", desc: "Dupla de nigiri de pele de salmão grelhada." },
    ]
  }
];

const REVIEWS = [
  {
    id: 1,
    author: "Ricardo Silva",
    rating: 5,
    text: "Melhor sushi de Canoas! O Hot Philadelphia é incrível e o atendimento é nota 10. Ambiente super agradável.",
    date: "há 2 semanas",
    avatar: "https://picsum.photos/seed/ricardo/100/100"
  },
  {
    id: 2,
    author: "Juliana Mendes",
    rating: 5,
    text: "Peixe sempre muito fresco. O combo de salmão é meu favorito. Recomendo muito o delivery também, chega rápido e bem embalado.",
    date: "há 1 mês",
    avatar: "https://picsum.photos/seed/juliana/100/100"
  },
  {
    id: 3,
    author: "Marcos Oliveira",
    rating: 4,
    text: "Lugar lindo, música boa e comida excelente. O drink azul é uma delícia e muito bonito para fotos.",
    date: "há 3 meses",
    avatar: "https://picsum.photos/seed/marcos/100/100"
  },
  {
    id: 4,
    author: "Fernanda Costa",
    rating: 5,
    text: "Henko nunca decepciona. Os sushis doces são o toque final perfeito. Atendimento impecável.",
    date: "há 4 meses",
    avatar: "https://picsum.photos/seed/fernanda/100/100"
  }
];

const ORDER_URL = "https://pedido.anota.ai/loja/henko-sushi-canoas?referer=gbp_anota";
const MAPS_URL = "https://maps.app.goo.gl/wiuhNdtbmfTVfZ2EA";
const WHATSAPP_URL = "https://wa.me/5551989273999";
const INSTAGRAM_URL = "https://www.instagram.com/henkosushicanoas/";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src={LOGO_URL} alt="Henko Logo" className="h-14 md:h-20 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Início", "Sobre", "Cardápio", "Avaliações", "Contato"].map((item) => (
            <a 
              key={item} 
              href={item === "Início" ? "#" : `#${item.toLowerCase()}`} 
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            PEDIR ONLINE
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {["Início", "Sobre", "Cardápio", "Avaliações", "Contato"].map((item) => (
              <a 
                key={item} 
                href={item === "Início" ? "#" : `#${item.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display italic hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white py-4 rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              PEDIR ONLINE
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="início" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
        <img 
          src={IMAGES[1]} 
          alt="Henko Sushi Hero" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6">
            O Melhor de Canoas
          </span>
          <div className="flex justify-center mb-8">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src={LOGO_URL} 
              alt="Henko Sushi Logo" 
              className="h-32 md:h-48 lg:h-64 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(225,29,72,0.3)]"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Uma fusão moderna entre a tradição japonesa e a sofisticação urbana. 
            Descubra sabores que transcendem o paladar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:bg-primary hover:text-white"
            >
              FAÇA SEU PEDIDO
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#cardápio"
              className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-all"
            >
              VER CARDÁPIO
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
      </motion.div>
    </section>
  );
};

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-display italic font-bold mb-6">Galeria de Sabores</h2>
          <p className="text-white/50 text-lg">Cada peça é uma obra de arte, preparada com os ingredientes mais frescos e selecionados.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={prev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronLeft />
          </button>
          <button onClick={next} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0 px-6"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden relative group">
              <img 
                src={IMAGES[index]} 
                alt="Sushi Gallery" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const SPECIALTIES = [
  {
    title: "Sashimi Premium",
    desc: "Cortes precisos de salmão fresco, selecionados diariamente.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=800&auto=format&fit=crop",
    size: "large"
  },
  {
    title: "Uramaki Especial",
    desc: "A combinação perfeita de texturas e sabores intensos.",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
    size: "small"
  },
  {
    title: "Drinks Autorais",
    desc: "Mixologia sofisticada para acompanhar seu jantar.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    size: "small"
  },
  {
    title: "Ambiente Exclusivo",
    desc: "Um espaço pensado para momentos inesquecíveis.",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop",
    size: "medium"
  }
];

const SpecialtiesSection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Nossos Destaques</span>
          <h2 className="text-5xl md:text-7xl font-display italic font-bold">A Arte do Sushi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
          {SPECIALTIES.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-[2.5rem] overflow-hidden group",
                spec.size === "large" ? "md:col-span-2 md:row-span-2" : 
                spec.size === "medium" ? "md:col-span-2 md:row-span-1" : 
                "md:col-span-1 md:row-span-1"
              )}
            >
              <img 
                src={spec.image} 
                alt={spec.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold mb-2">{spec.title}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {spec.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const currentCategory = MENU_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section id="cardápio" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Experiência Gastronômica</span>
          <h2 className="text-5xl md:text-7xl font-display italic font-bold mb-12">Nosso Cardápio</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-8 py-4 rounded-full text-sm font-bold transition-all uppercase tracking-widest border",
                  activeCategory === cat.id 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Category Image */}
          <div className="lg:col-span-5 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden relative group"
              >
                <img 
                  src={currentCategory?.image} 
                  alt={currentCategory?.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-display italic font-bold">{currentCategory?.name}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Items List */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-8"
              >
                {currentCategory?.items.map((item, i) => (
                  <motion.div 
                    key={`${activeCategory}-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-start justify-between border-b border-white/5 pb-8 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1 pr-8">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                        <div className="flex-1 border-b border-dashed border-white/10 group-hover:border-primary/20 transition-colors" />
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-display italic font-bold text-primary">{item.price}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            <div className="pt-8">
              <a 
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all"
              >
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Cardápio Completo</p>
                  <p className="text-lg font-bold">Ver todas as opções no Anota AI</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="avaliações" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Social Proof</span>
            <h2 className="text-4xl md:text-6xl font-display italic font-bold mb-6">O que dizem nossos clientes</h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-white font-bold text-lg">4.8</span>
              <span className="text-white/40 text-sm">no Google Maps</span>
            </div>
          </div>
          <a 
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass px-8 py-4 rounded-full text-sm font-bold flex items-center gap-3 hover:bg-white hover:text-black transition-all"
          >
            AVALIAR NO GOOGLE
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-black/10">
              <ExternalLink size={12} />
            </div>
          </a>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {REVIEWS.map((review) => (
            <motion.div 
              key={review.id}
              whileHover={{ y: -10 }}
              className="min-w-[320px] md:min-w-[450px] glass p-10 rounded-[2.5rem] snap-start flex flex-col justify-between relative group"
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.35 11.1h-9.17v2.73h5.14c-.22 1.1-.88 2.03-1.85 2.63v2.19h3c1.76-1.62 2.77-4 2.77-6.88 0-.6-.05-1.18-.14-1.67z"/>
                  <path d="M12.18 20.5c2.3 0 4.22-.76 5.63-2.06l-3-2.19c-.83.56-1.9.88-3.03.88-2.33 0-4.3-1.57-5-3.68h-3.1v2.4c1.53 3.05 4.68 5.15 8.13 5.15z"/>
                  <path d="M7.18 13.45c-.18-.56-.28-1.15-.28-1.75s.1-1.19.28-1.75v-2.4h-3.1c-.6 1.2-1.03 2.57-1.03 4.15s.43 2.95 1.03 4.15l3.1-2.4z"/>
                  <path d="M12.18 6.85c1.25 0 2.38.43 3.26 1.28l2.44-2.44c-1.53-1.43-3.54-2.3-5.7-2.3-3.45 0-6.6 2.1-8.13 5.15l3.1 2.4c.7-2.11 2.67-3.68 5-3.68z"/>
                </svg>
              </div>
              
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <img src={review.avatar} alt={review.author} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10" />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Star size={10} fill="#D4AF37" color="#D4AF37" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{review.author}</h4>
                    <span className="text-white/40 text-xs tracking-widest uppercase">{review.date}</span>
                  </div>
                </div>
                <div className="flex text-gold mb-6 gap-1">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/80 text-lg italic leading-relaxed font-light">"{review.text}"</p>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  <MapPin size={12} className="text-primary" />
                  Canoas, RS
                </div>
                <div className="text-[10px] text-white/20 font-bold">GOOGLE REVIEWS</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center mb-8">
              <img src={LOGO_URL} alt="Henko Logo" className="h-20 w-auto object-contain" />
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Experiência gastronômica japonesa moderna em Canoas. Sabor, qualidade e ambiente exclusivo.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display italic text-xl mb-8">Localização</h4>
            <div className="flex items-start gap-4 text-white/50 text-sm">
              <MapPin className="text-primary shrink-0" size={20} />
              <p>
                R. Bolívia, 1283 - Sala B <br />
                São José, Canoas - RS <br />
                92420-170
              </p>
            </div>
            <a 
              href={MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold text-primary hover:underline"
            >
              COMO CHEGAR
            </a>
          </div>

          <div>
            <h4 className="font-display italic text-xl mb-8">Horários</h4>
            <div className="space-y-4 text-white/50 text-sm">
              <div className="flex items-start gap-4">
                <Clock className="text-primary shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">Terça a Domingo</p>
                  <p>19:00 às 23:30</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-5 h-5" />
                <div>
                  <p className="text-white font-medium">Segunda-feira</p>
                  <p className="text-primary/60">Fechado</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display italic text-xl mb-8">Contato</h4>
            <div className="space-y-4 text-white/50 text-sm">
              <a href={WHATSAPP_URL} className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="text-primary" size={20} />
                (51) 98927-3999
              </a>
              <a href={`mailto:contato@henkosushi.com.br`} className="flex items-center gap-4 hover:text-white transition-colors">
                <MessageCircle className="text-primary" size={20} />
                WhatsApp Direto
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display italic text-xl mb-8">Henko Club</h4>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">Receba novidades, eventos exclusivos e promoções especiais diretamente no seu e-mail.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors w-full"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-full text-[10px] font-bold hover:bg-white hover:text-black transition-all shrink-0">
                CADASTRAR
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <p>© 2026 HENKO SUSHI. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</a>
            <a href="#" className="hover:text-white transition-colors">TERMOS DE USO</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingCTA = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
    >
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <ShoppingBag size={18} />
        PEDIR AGORA
      </a>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black bg-mesh selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <ImageCarousel />
      
      {/* About Section */}
      <section id="sobre" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" 
                  alt="Henko Sushi Interior" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-3xl overflow-hidden border-8 border-[#050505] hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop" 
                  alt="Chef Henko" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Nossa História</span>
              <h2 className="text-4xl md:text-6xl font-display italic font-bold mb-8 leading-tight">A arte do sushi encontra a sofisticação.</h2>
              <div className="space-y-6 text-white/60 leading-relaxed">
                <p>
                  O Henko Sushi nasceu da paixão pela culinária japonesa tradicional aliada a um toque de modernidade e inovação. Localizado no coração de Canoas, oferecemos mais do que apenas uma refeição; proporcionamos uma experiência sensorial completa.
                </p>
                <p>
                  Nossos chefs selecionam diariamente os peixes mais frescos e ingredientes de altíssima qualidade para garantir que cada peça seja uma obra de arte. Do ambiente cuidadosamente decorado ao atendimento personalizado, cada detalhe foi pensado para surpreender você.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-display italic font-bold text-primary mb-2">5+</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Anos de Experiência</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display italic font-bold text-primary mb-2">10k+</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Clientes Satisfeitos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <SpecialtiesSection />

      <MenuSection />
      <ReviewsSection />
      
      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display italic font-bold mb-8">Pronto para uma experiência única?</h2>
          <p className="text-xl text-white/60 mb-12">Não perca tempo e garanta o melhor sushi de Canoas na sua mesa agora mesmo.</p>
          <a 
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            FAZER MEU PEDIDO AGORA
            <ShoppingBag size={24} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
