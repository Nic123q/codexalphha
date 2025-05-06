import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { useScrollPosition } from '@/hooks/use-scroll-position';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollPosition = useScrollPosition();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Here you would typically redirect to search results page
    }
  };

  const isScrolled = scrollPosition > 50;

  return (
    <header className={`fixed w-full bg-black bg-opacity-90 backdrop-blur-md z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-3xl md:text-4xl font-bold cursor-pointer">
              <span className="text-primary">C</span>
              <span className="text-secondary">o</span>
              <span className="text-white">dexium</span>
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="nav-link font-medium text-white hover:text-secondary transition-colors">
            Início
          </a>
          <a href="#jogos" className="nav-link font-medium text-white hover:text-secondary transition-colors">
            Jogos
          </a>
          <a href="#novidades" className="nav-link font-medium text-white hover:text-secondary transition-colors">
            Novidades
          </a>
          <a href="#comentarios" className="nav-link font-medium text-white hover:text-secondary transition-colors">
            Comentários
          </a>
          <a href="#contato" className="nav-link font-medium text-white hover:text-secondary transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar jogos..."
              className="bg-muted text-white rounded-full py-2 px-4 focus:outline-none w-48 md:w-64 transition-all focus:ring-2 focus:ring-secondary"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
          </form>
          
          <button 
            className="md:hidden text-white text-2xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="px-4 py-2 bg-muted md:hidden">
          <div className="flex flex-col space-y-3 pb-3">
            <a 
              href="#home" 
              className="font-medium text-white hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </a>
            <a 
              href="#jogos" 
              className="font-medium text-white hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jogos
            </a>
            <a 
              href="#novidades" 
              className="font-medium text-white hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Novidades
            </a>
            <a 
              href="#comentarios" 
              className="font-medium text-white hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comentários
            </a>
            <a 
              href="#contato" 
              className="font-medium text-white hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
