import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold title-animation mb-6 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary">COD</span>
          <span className="text-white">EX</span>
          <span className="text-secondary">IUM</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Seu portal definitivo para o universo dos games. Descubra novos mundos, compartilhe experiências e mergulhe na aventura.
        </motion.p>
        
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a 
            href="#jogos" 
            className="bg-primary hover:bg-primary/80 text-white text-lg py-3 px-8 rounded-full transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
          >
            Explorar Jogos
          </a>
          <a 
            href="#novidades" 
            className="bg-transparent border-2 border-secondary text-secondary text-lg py-3 px-8 rounded-full transform transition-all hover:bg-secondary/10 hover:scale-105"
          >
            Últimas Novidades
          </a>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#jogos" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
