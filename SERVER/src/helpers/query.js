const queryFilter = (query, filters) => {
  for (let key in filters) {
    if (filters[key]) {
      query[key] = filters[key];
    }
  }
  return query;
};
module.exports = queryFilter;
