import { 
  users, type User, type InsertUser, 
  games, type Game, type InsertGame,
  comments, type Comment, type InsertComment,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game operations
  getAllGames(): Promise<Game[]>;
  getFeaturedGames(): Promise<Game[]>;
  getUpcomingGames(): Promise<Game[]>;
  getGameById(id: number): Promise<Game | undefined>;
  searchGames(query: string): Promise<Game[]>;
  
  // Comment operations
  getCommentsByGameId(gameId: number): Promise<Comment[]>;
  addComment(comment: InsertComment): Promise<Comment>;
  likeComment(id: number): Promise<Comment | undefined>;
  
  // Contact operations
  addContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private comments: Map<number, Comment>;
  private contacts: Map<number, Contact>;
  
  private userId = 1;
  private gameId = 1;
  private commentId = 1;
  private contactId = 1;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.comments = new Map();
    this.contacts = new Map();
    
    // Initialize with sample games
    this.initializeGames();
    this.initializeComments();
  }

  private initializeGames() {
    const sampleGames: InsertGame[] = [
      {
        title: "Cyberpunk 2077",
        description: "Um RPG de mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.",
        category: "RPG / Ação",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "4.5",
        isUpcoming: false,
        developer: "CD Projekt Red"
      },
      {
        title: "The Witcher 3",
        description: "Torne-se Geralt de Rívia, um caçador de monstros profissional, e embarque numa aventura épica em um mundo de fantasia.",
        category: "RPG / Fantasia",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "5.0",
        isUpcoming: false,
        developer: "CD Projekt Red"
      },
      {
        title: "Forza Horizon 5",
        description: "Explore um mundo aberto vibrante e em constante evolução com paisagens deslumbrantes e direção arcade divertida.",
        category: "Corrida / Mundo Aberto",
        imageUrl: "https://images.unsplash.com/photo-1585504198199-20277593b94f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "4.7",
        isUpcoming: false,
        developer: "Playground Games"
      },
      {
        title: "God of War Ragnarök",
        description: "Embarque em uma jornada épica como Kratos e Atreus enquanto buscam respostas para o iminente Ragnarök.",
        category: "Ação / Aventura",
        imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "4.9",
        isUpcoming: false,
        developer: "Santa Monica Studio"
      },
      {
        title: "Starfield",
        description: "Um RPG épico ambientado entre as estrelas. Crie qualquer personagem que você desejar e explore com liberdade sem precedentes.",
        category: "RPG / Espaço",
        imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "4.5",
        isUpcoming: false,
        developer: "Bethesda Game Studios"
      },
      {
        title: "Apex Legends",
        description: "Um jogo de tiro battle royale gratuito onde lendários competidores lutam nas periferias da Fronteira.",
        category: "Battle Royale / FPS",
        imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "4.0",
        isUpcoming: false,
        developer: "Respawn Entertainment"
      },
      {
        title: "Dragon Age: Dreadwolf",
        description: "Um novo capítulo da épica série de RPG da BioWare, onde suas escolhas moldarão o destino de Thedas.",
        category: "RPG / Fantasia",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "0.0",
        releaseDate: "Dezembro 2023",
        isUpcoming: true,
        developer: "BioWare"
      },
      {
        title: "GTA VI",
        description: "A próxima entrada na aclamada série Grand Theft Auto, prometendo um mundo aberto ainda mais imersivo e detalhado.",
        category: "Ação / Mundo Aberto",
        imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "0.0",
        releaseDate: "2024",
        isUpcoming: true,
        developer: "Rockstar Games"
      },
      {
        title: "Silent Hill 2 Remake",
        description: "Uma reconstrução completa do clássico de terror psicológico, com visuais e jogabilidade modernizados.",
        category: "Terror / Aventura",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "0.0",
        releaseDate: "Março 2024",
        isUpcoming: true,
        developer: "Bloober Team"
      },
      {
        title: "Elden Ring: Shadow of the Erdtree",
        description: "A expansão aguardada do aclamado RPG de ação, trazendo novas áreas, chefes e desafios ao mundo das Terras Intermédias.",
        category: "RPG / Ação",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        rating: "0.0",
        releaseDate: "Fevereiro 2024",
        isUpcoming: true,
        developer: "FromSoftware"
      }
    ];

    sampleGames.forEach(game => {
      const id = this.gameId++;
      this.games.set(id, { ...game, id });
    });
  }

  private initializeComments() {
    const cyberpunkComments: InsertComment[] = [
      {
        gameId: 1,
        author: "João Dimas",
        content: "Depois de todas as atualizações, o jogo está finalmente no estado que deveria ter sido lançado. A história é incrível e Night City é um dos melhores cenários que já vi em um jogo.",
        likes: 45
      },
      {
        gameId: 1,
        author: "Marina Silva",
        content: "Os personagens são muito bem desenvolvidos e as side quests são tão boas quanto a história principal. As mecânicas de RPG poderiam ser mais profundas, mas ainda assim é um jogo excelente.",
        likes: 32
      },
      {
        gameId: 1,
        author: "Rafael Costa",
        content: "A ambientação e a direção de arte são de outro mundo. A trilha sonora complementa perfeitamente a experiência. Tecnicamente ainda tem alguns bugs, mas nada que atrapalhe a diversão.",
        likes: 28
      }
    ];

    const witcherComments: InsertComment[] = [
      {
        gameId: 2,
        author: "Amanda Rodrigues",
        content: "O melhor RPG já feito, sem dúvidas. A história principal é excelente, mas as DLCs são obras-primas por si só. Blood and Wine é praticamente um jogo completo.",
        likes: 72
      },
      {
        gameId: 2,
        author: "Lucas Mendes",
        content: "As side quests são tão bem escritas quanto a história principal. Cada missão tem personagens memoráveis e dilemas morais complexos. Simplesmente perfeito.",
        likes: 56
      },
      {
        gameId: 2,
        author: "Gabriel Pereira",
        content: "Mesmo depois de anos, ainda é um dos jogos mais bonitos que já vi. O combate poderia ser mais refinado, mas não tira o brilho do restante do jogo. A trilha sonora é espetacular.",
        likes: 41
      }
    ];

    [...cyberpunkComments, ...witcherComments].forEach(comment => {
      const id = this.commentId++;
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 14)); // Random date in last 2 weeks
      this.comments.set(id, { ...comment, id, date });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Game operations
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getFeaturedGames(): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => !game.isUpcoming);
  }

  async getUpcomingGames(): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.isUpcoming);
  }

  async getGameById(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async searchGames(query: string): Promise<Game[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.games.values()).filter(game => 
      game.title.toLowerCase().includes(lowercaseQuery) || 
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Comment operations
  async getCommentsByGameId(gameId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.gameId === gameId)
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }

  async addComment(commentData: InsertComment): Promise<Comment> {
    const id = this.commentId++;
    const date = new Date();
    const comment: Comment = { ...commentData, id, date, likes: 0 };
    this.comments.set(id, comment);
    return comment;
  }

  async likeComment(id: number): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    
    const updatedComment = { ...comment, likes: (comment.likes || 0) + 1 };
    this.comments.set(id, updatedComment);
    return updatedComment;
  }

  // Contact operations
  async addContact(contactData: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const contact: Contact = { ...contactData, id };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
