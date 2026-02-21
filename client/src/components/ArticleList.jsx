import { Link } from "react-router-dom";
function ArticleList({ articles }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article._id}>
            <Link to={`/article/${article._id}`}>
          {article.title} </Link>
          {"-"} 
          {article.category}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
