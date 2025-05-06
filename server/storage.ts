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
        imageUrl: "https://www.psu.com/wp/wp-content/uploads/2020/12/cyberpunk-2077-1.jpg",
        rating: "4.5",
        isUpcoming: false,
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        platform: "PC, PS5, Xbox Series X/S",
        screenshots: [
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9039bf95b2de8decb7ad83b722a9f51c84e694f8.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_2970ece6917c2a7df9a1a70b5e1155caee889fbe.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_d5720477d85c27d103cf142a9ad1d9de7d6f5574.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9d402505a7edc1aad75ba4dd67b1e6a119b2da1e.jpg"
        ],
        features: [
          "Mundo Aberto Imersivo",
          "História envolvente",
          "Customização completa",
          "Implantes Cibernéticos",
          "Sistema de combate avançado"
        ]
      },
      {
        title: "The Witcher 3",
        description: "Torne-se Geralt de Rívia, um caçador de monstros profissional, e embarque numa aventura épica em um mundo de fantasia.",
        category: "RPG / Fantasia",
        imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        rating: "5.0",
        isUpcoming: false,
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        platform: "PC, PS4, PS5, Xbox One, Xbox Series X/S, Switch",
        screenshots: [
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_107600c1337accc09104f7a8aa7f275f23cad096.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_908485cbb1401a2ba00d0b4e5d586f307a4f4756.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_e497be9d0db8c89a7f8df32d7a72394a95cea2b6.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_82d69e75b5b426c7e6454e35ed3519dc33eeea8e.jpg"
        ],
        features: [
          "Mundo de fantasia imersivo",
          "Narrativa premiada",
          "Sistemas de combate mágico",
          "Caça a monstros",
          "Decisões morais complexas"
        ]
      },
      {
        title: "Forza Horizon 5",
        description: "Explore um mundo aberto vibrante e em constante evolução com paisagens deslumbrantes e direção arcade divertida.",
        category: "Corrida / Mundo Aberto",
        imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg",
        rating: "4.7",
        isUpcoming: false,
        developer: "Playground Games",
        publisher: "Xbox Game Studios",
        platform: "PC, Xbox One, Xbox Series X/S",
        screenshots: [
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_bff92c4d7c3e997c9123e8240afde9a4d840c173.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_9926a0c19148c8e18c61df7dae38ba75d96d853a.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_41ee79a4446e0785cf33f32cdb2c99147059e5e3.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_59a575ae8687e09e4adaee0f415f79ec868b9966.jpg"
        ],
        features: [
          "Mundo aberto no México",
          "Centenas de carros",
          "Gráficos realistas",
          "Eventos dinâmicos",
          "Modos multijogador"
        ]
      },
      {
        title: "God of War Ragnarök",
        description: "Embarque em uma jornada épica como Kratos e Atreus enquanto buscam respostas para o iminente Ragnarök.",
        category: "Ação / Aventura",
        imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.jpg",
        rating: "4.9",
        isUpcoming: false,
        developer: "Santa Monica Studio",
        publisher: "Sony Interactive Entertainment",
        platform: "PS4, PS5",
        screenshots: [
          "https://assets.reedpopcdn.com/god-of-war-ragnarok-will-feature-all-nine-realms-including-the-previously-unreachable-vanaheim-asgard-and-jotunheim-1662579476219.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/god-of-war-ragnarok-will-feature-all-nine-realms-including-the-previously-unreachable-vanaheim-asgard-and-jotunheim-1662579476219.jpg",
          "https://assets.reedpopcdn.com/digitalfoundry-2022-god-of-war-ragnarok-ps5-vs-ps4-pro-a-comprehensive-tech-breakdown-1668011335762.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/digitalfoundry-2022-god-of-war-ragnarok-ps5-vs-ps4-pro-a-comprehensive-tech-breakdown-1668011335762.jpg",
          "https://assets.reedpopcdn.com/god-of-war-ragnarok-1.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/god-of-war-ragnarok-1.jpg",
          "https://assets.reedpopcdn.com/god-of-war-ragnarok-combat-guide-header.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/god-of-war-ragnarok-combat-guide-header.jpg"
        ],
        features: [
          "Combate visceral e estratégico",
          "História emocionante",
          "Exploração dos nove reinos",
          "Personagens cativantes",
          "Gráficos de última geração"
        ]
      },
      {
        title: "Starfield",
        description: "Um RPG épico ambientado entre as estrelas. Crie qualquer personagem que você desejar e explore com liberdade sem precedentes.",
        category: "RPG / Espaço",
        imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg",
        rating: "4.5",
        isUpcoming: false,
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        platform: "PC, Xbox Series X/S",
        screenshots: [
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_c4eb4b10a08e92aba249908cee4cf3f64d0cb44c.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_3ad56816d95cdfac7c11b0abe0222a0379cbae33.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_83cac31c5e72e8f6e2e01272483097add59d667f.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_de0b3880a93d0831e64f68d9f5cf98420ba0b597.jpg"
        ],
        features: [
          "Exploração espacial",
          "Construção de naves",
          "Mais de 1000 planetas",
          "Sistema de combate em FPS",
          "Narrativa imersiva"
        ]
      },
      {
        title: "Apex Legends",
        description: "Um jogo de tiro battle royale gratuito onde lendários competidores lutam nas periferias da Fronteira.",
        category: "Battle Royale / FPS",
        imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
        rating: "4.0",
        isUpcoming: false,
        developer: "Respawn Entertainment",
        publisher: "Electronic Arts",
        platform: "PC, PS4, PS5, Xbox One, Xbox Series X/S, Switch",
        screenshots: [
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/ss_5339a62b0ab050dc535cf682e8d0f964f22c496d.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/ss_c4ecd637c089b67f9d4a63eb63c0edcebc52cfad.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/ss_4fca4b9cef6d0d85fb30d86ceddad9f9f0f9130a.jpg",
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/ss_df4b2d124292c49681372333de5d6c7f40e7e7f2.jpg"
        ],
        features: [
          "Personagens com habilidades únicas",
          "Jogabilidade em equipe",
          "Free-to-play",
          "Gráficos de alta qualidade",
          "Atualizações constantes"
        ]
      },
      {
        title: "Dragon Age: Dreadwolf",
        description: "Um novo capítulo da épica série de RPG da BioWare, onde suas escolhas moldarão o destino de Thedas.",
        category: "RPG / Fantasia",
        imageUrl: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/12/dragon-age-dreadwolf-release-date-rumours.jpg",
        rating: "0.0",
        releaseDate: "Dezembro 2023",
        isUpcoming: true,
        developer: "BioWare",
        publisher: "Electronic Arts",
        platform: "PC, PS5, Xbox Series X/S",
        screenshots: [
          "https://cdn.mos.cms.futurecdn.net/aN5TsqsGwSGBvGpMdQCDgY.jpg",
          "https://cdn1.dotesports.com/wp-content/uploads/2023/06/05104806/dragonage-dreadwolf.jpg",
          "https://cdn.vox-cdn.com/thumbor/fIDV-IlR34tjfOWkwKEqxIQT5XA=/0x0:1920x1080/1400x1400/filters:focal(807x387:1113x693):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/71104532/Screenshot_2022_06_02_135731.0.png",
          "https://www.ggrecon.com/media/zfvhfepv/dragon-age-dreadwolf-reveal-tease.jpg"
        ],
        features: [
          "Sistema de combate renovado",
          "Decisões com impacto na história",
          "Mundo vasto para explorar",
          "Companheiros carismáticos",
          "Gráficos de nova geração"
        ]
      },
      {
        title: "GTA VI",
        description: "A próxima entrada na aclamada série Grand Theft Auto, prometendo um mundo aberto ainda mais imersivo e detalhado.",
        category: "Ação / Mundo Aberto",
        imageUrl: "https://www.pcinvasion.com/wp-content/uploads/2022/08/GTA-6-cover.jpg",
        rating: "0.0",
        releaseDate: "2024",
        isUpcoming: true,
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        platform: "PC, PS5, Xbox Series X/S",
        screenshots: [
          "https://cdn.vox-cdn.com/thumbor/6-0kM97-EwQ9hRNbQESluvXZcrI=/0x0:1280x720/1200x0/filters:focal(0x0:1280x720):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24395464/grand_theft_auto_vi_trailer_thumb_clean.png",
          "https://cdn.mos.cms.futurecdn.net/8Bvp5cm5kjvYRZDnFJ5JF5.jpg",
          "https://www.digitaltrends.com/wp-content/uploads/2023/12/gta-6-car.jpg",
          "https://cdn.mos.cms.futurecdn.net/vNVFhtjNqghPzBvxCzYGqd.jpg"
        ],
        features: [
          "Novo cenário em Vice City",
          "Gráficos realistas",
          "Múltiplos personagens jogáveis",
          "Mundo vivo e dinâmico",
          "Experiência online aprimorada"
        ]
      },
      {
        title: "Silent Hill 2 Remake",
        description: "Uma reconstrução completa do clássico de terror psicológico, com visuais e jogabilidade modernizados.",
        category: "Terror / Aventura",
        imageUrl: "https://assets.reedpopcdn.com/silent-hill-2-remake-release-date-trailer_S1EhDsf.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/silent-hill-2-remake-release-date-trailer_S1EhDsf.jpg",
        rating: "0.0",
        releaseDate: "Março 2024",
        isUpcoming: true,
        developer: "Bloober Team",
        publisher: "Konami",
        platform: "PC, PS5",
        screenshots: [
          "https://cdn.akamai.steamstatic.com/steam/apps/2281530/ss_b3af5ff8b3e82b68ccf9e1ba42173ca8c4de2ce4.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2281530/ss_e85a8e1a04c0c292a5b7e0a9eb69e166553d2bae.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2281530/ss_c7d96e77c5d1c247751827c0c7c7144c354d97f4.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2281530/ss_7b6ad95d9e89f5bbc49ba19c1d1c0a52da94fd73.jpg"
        ],
        features: [
          "Gráficos modernizados",
          "Terror psicológico imersivo",
          "Nova dublagem e efeitos sonoros",
          "Jogabilidade reimaginada",
          "Combate e quebra-cabeças aprimorados"
        ]
      },
      {
        title: "Elden Ring: Shadow of the Erdtree",
        description: "A expansão aguardada do aclamado RPG de ação, trazendo novas áreas, chefes e desafios ao mundo das Terras Intermédias.",
        category: "RPG / Ação",
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2104541/header.jpg",
        rating: "0.0",
        releaseDate: "Fevereiro 2024",
        isUpcoming: true,
        developer: "FromSoftware",
        publisher: "Bandai Namco Entertainment",
        platform: "PC, PS4, PS5, Xbox One, Xbox Series X/S",
        screenshots: [
          "https://cdn.akamai.steamstatic.com/steam/apps/2104541/ss_efccc90b0f2531beea17ca8a91ee1f3b63a23b40.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2104541/ss_93a3f8dbd94fd5ec1774a08c52b7bae9bda2e2cb.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2104541/ss_0d64bde394507cfe75b3b741f8a9e7a2cec9749e.jpg",
          "https://cdn.akamai.steamstatic.com/steam/apps/2104541/ss_3a4923336aef84ef62ca5ca7116f1eb720e3812a.jpg"
        ],
        features: [
          "Novas regiões para explorar",
          "Chefes desafiadores",
          "Novas armas e equipamentos",
          "História expandida",
          "Novas classes e habilidades"
        ]
      }
    ];

    sampleGames.forEach(game => {
      const id = this.gameId++;
      this.games.set(id, { 
        ...game, 
        id,
        releaseDate: game.releaseDate || null,
        isUpcoming: game.isUpcoming || false,
        developer: game.developer || null,
        publisher: game.publisher || null,
        platform: game.platform || null,
        screenshots: game.screenshots || null,
        features: game.features || null
      });
    });
  }

  private initializeComments() {
    const cyberpunkComments = [
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

    const witcherComments = [
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
      this.comments.set(id, { 
        ...comment, 
        id, 
        date, 
        likes: comment.likes || 0 
      });
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
    const comment: Comment = { 
      ...commentData, 
      id, 
      date, 
      likes: 0 
    };
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
    const contact: Contact = { 
      ...contactData, 
      id, 
      newsletter: contactData.newsletter || false 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
