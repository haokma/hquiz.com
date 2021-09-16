const queryFilter = (query: any, filters: any) => {
  for (let key in filters) {
    if (filters[key]) {
      query[key] = filters[key];
    }
  }
  return query;
};
export default queryFilter;
