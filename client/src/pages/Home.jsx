import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5000/api/articles?page=${currentPage}&limit=10&search=${search}&sort=${sort}&category=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();

        setArticles(data.articles);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, search, sort, category]);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>

      <Filters
        search={search}
        category={category}
        sort={sort}
        handleSearchChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        handleCategoryChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1);
        }}
        handleSortChange={(e) => {
          setSort(e.target.value);
          setCurrentPage(1);
        }}
      />

      <ArticleList articles={articles} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Home;