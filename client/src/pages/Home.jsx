import { useState } from "react";
import dummyData from "../data/dummyArticle";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";

function Home() {
  const [articles] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 2;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const filteredArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      article.category.toLowerCase().includes(search.trim().toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(search.trim().toLowerCase())
      )
    )
    .filter((article) => (category ? article.category === category : true));

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sort === "popular") {
      const scoreA = a.likes + a.views;
      const scoreB = b.likes + b.views;
      return scoreB - scoreA;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <h1>Home Page</h1>

      <Filters
        search={search}
        category={category}
        sort={sort}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange}
        handleSortChange={handleSortChange}
      />

      <ArticleList articles={currentArticles} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalArticles={sortedArticles.length}
        articlesPerPage={articlesPerPage}
      />
    </div>
  );
}

export default Home;
