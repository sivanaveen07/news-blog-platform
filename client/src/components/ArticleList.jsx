function ArticleList({ articles }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {article.title} - {article.category}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
