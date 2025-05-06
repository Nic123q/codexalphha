import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add meta tags for SEO
document.title = "Codexium - Portal de Jogos";

// Add meta description
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Codexium é seu portal definitivo para o universo dos games. Descubra novos mundos, compartilhe experiências e mergulhe na aventura.";
document.head.appendChild(metaDescription);

// Add Open Graph tags
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Codexium - Portal de Jogos";
document.head.appendChild(ogTitle);

const ogDesc = document.createElement("meta");
ogDesc.property = "og:description";
ogDesc.content = "Descubra novos mundos, compartilhe experiências e mergulhe na aventura dos games com o Codexium.";
document.head.appendChild(ogDesc);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(<App />);
