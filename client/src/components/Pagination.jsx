function Pagination({ currentPage, setCurrentPage, totalArticles, articlesPerPage }) {

  const indexOfLast = currentPage * articlesPerPage;

  return (
    <div>
      <button
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <button
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={indexOfLast >= totalArticles}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
