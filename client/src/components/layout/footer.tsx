import { Link } from 'wouter';
import {
  MessageCircleCode,
  Twitter,
  Instagram,
  Youtube,
  SendHorizontal
} from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter submit
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    if (email) {
      console.log('Newsletter subscription for:', email);
      // Here you would typically call an API to subscribe the user
    }
  };

  return (
    <footer className="bg-card border-t border-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-primary">C</span>
              <span className="text-secondary">o</span>
              <span className="text-white">dexium</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Seu portal definitivo para o universo dos games. Descubra novos mundos, compartilhe experiências e mergulhe na aventura.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/50 transition-all">
                <MessageCircleCode size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/50 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/50 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/50 transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xl mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-secondary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#jogos" className="text-gray-300 hover:text-secondary transition-colors">
                  Jogos
                </a>
              </li>
              <li>
                <a href="#novidades" className="text-gray-300 hover:text-secondary transition-colors">
                  Novidades
                </a>
              </li>
              <li>
                <a href="#comentarios" className="text-gray-300 hover:text-secondary transition-colors">
                  Comentários
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-300 hover:text-secondary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xl mb-6">Categorias</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Ação e Aventura
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  RPG
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  FPS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Estratégia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Esportes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Indie
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xl mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Inscreva-se para receber as últimas notícias e atualizações sobre seus jogos favoritos.
            </p>
            <form className="flex mb-4" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                required
                className="bg-muted border border-muted rounded-l-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors flex-1"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/80 text-white py-3 px-4 rounded-r-lg transition-colors"
              >
                <SendHorizontal size={20} />
              </button>
            </form>
            <p className="text-gray-400 text-sm">
              Ao assinar, você concorda com nossa política de privacidade.
            </p>
          </div>
        </div>

        <div className="border-t border-muted mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Codexium. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors text-sm">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
