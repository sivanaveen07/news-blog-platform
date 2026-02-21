import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ArticleDetails() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5000/api/articles/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>No article found</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p><strong>Category:</strong> {article.category}</p>
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleDetails;