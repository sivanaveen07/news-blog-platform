function Pagination({ currentPage, setCurrentPage, totalPages, }) {

  
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
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
