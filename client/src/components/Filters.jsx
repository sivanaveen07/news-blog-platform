function Filters({
  search,
  category,
  sort,
  handleSearchChange,
  handleCategoryChange,
  handleSortChange
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearchChange}
      />

      <select value={category} onChange={handleCategoryChange}>
        <option value="">All</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Sports">Sports</option>
      </select>

      <select value={sort} onChange={handleSortChange}>
        <option value="latest">Latest</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
}

export default Filters;
