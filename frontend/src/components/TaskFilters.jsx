function TaskFilters({ filters, onChange, onSearch }) {
  return (
    <div className="filter-panel mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-lg-5">
          <label className="form-label">Search</label>
          <input
            type="search"
            className="form-control"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Search title or description"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-2">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={filters.status}
            onChange={(event) => onChange('status', event.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-12 col-sm-6 col-lg-2">
          <label className="form-label">Sort</label>
          <select
            className="form-select"
            value={filters.order}
            onChange={(event) => onChange('order', event.target.value)}
          >
            <option value="DESC">Newest first</option>
            <option value="ASC">Oldest first</option>
          </select>
        </div>
        <div className="col-12 col-lg-3 d-grid">
          <button type="button" className="btn btn-info fw-semibold" onClick={onSearch}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
