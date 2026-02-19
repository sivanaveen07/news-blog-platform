import { Link } from "react-router-dom";
function ArticleList({ articles }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
            <Link to={`/article/${article.id}`}>
          {article.title} </Link>
          {"-"} 
          {article.category}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
