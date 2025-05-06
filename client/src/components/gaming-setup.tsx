import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Trophy, 
  Headphones, 
  Users 
} from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  delay: number 
}) => {
  return (
    <motion.div
      className="bg-muted/50 rounded-xl p-5 transform hover:scale-105 transition-all duration-300 border border-primary/20 hover:border-primary/60"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="text-secondary text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

const GamingSetup = () => {
  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 bg-fixed z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <motion.img
              src="https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Gaming controller"
              className="rounded-xl shadow-2xl shadow-primary/30 max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Eleve sua </span>
              <span className="text-secondary">Experiência</span>
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-primary mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Descubra dicas, novidades e resenhas para levar seu setup gamer ao próximo nível. Fique por dentro das últimas tendências do mundo dos games.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Newspaper />}
                title="Últimas Notícias"
                description="Atualizações diárias sobre o mundo dos games, lançamentos e atualizações."
                delay={0}
              />
              
              <FeatureCard
                icon={<Trophy />}
                title="Torneios"
                description="Participe de competições e acompanhe os principais campeonatos de e-sports."
                delay={1}
              />
              
              <FeatureCard
                icon={<Headphones />}
                title="Hardware"
                description="Análises e reviews dos melhores equipamentos para seu setup gamer."
                delay={2}
              />
              
              <FeatureCard
                icon={<Users />}
                title="Comunidade"
                description="Conecte-se com outros gamers, compartilhe experiências e faça parte da nossa comunidade."
                delay={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingSetup;
