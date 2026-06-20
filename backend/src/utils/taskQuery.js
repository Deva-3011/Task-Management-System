const allowedSortOrders = new Set(['ASC', 'DESC']);

function normalizeTaskQuery(query = {}) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 10));
  const search = typeof query.search === 'string' ? query.search.trim() : '';
  const status = typeof query.status === 'string' ? query.status.trim() : '';
  const sort = typeof query.sort === 'string' && query.sort.trim() ? query.sort.trim() : 'created_at';
  const orderValue = typeof query.order === 'string' ? query.order.trim().toUpperCase() : 'DESC';
  const order = allowedSortOrders.has(orderValue) ? orderValue : 'DESC';

  return {
    page,
    limit,
    offset: (page - 1) * limit,
    search,
    status,
    sort: sort === 'created_at' ? 'created_at' : 'created_at',
    order
  };
}

module.exports = {
  normalizeTaskQuery
};
