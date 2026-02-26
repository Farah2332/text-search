import { useState } from "react";
import { ARTICLES } from "./data/articles";
import "./styles.css";

function highlight(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i}>{part}</mark>
      : part
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = ARTICLES.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Search</h1>

      <input
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && <p>{filtered.length} posts were found.</p>}

      {filtered.map(article => (
        <div key={article.id}>
          <h2>{highlight(article.title, query)}</h2>
          <p>{article.date}</p>
          <p>{highlight(article.excerpt, query)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}