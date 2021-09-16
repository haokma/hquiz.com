const Pagination = {
  sort: (order: string, orderBy: string) => {
    if (!orderBy) return;
    return {
      [orderBy]: order == 'asc' ? 1 : -1,
    };
  },
  limit: (limit: number) => {
    return limit || 20;
  },
  skip: (page: number, limit: number) => {
    if (page == 0) return 0;
    return (page - 1) * limit;
  },
  page: (page: number) => {
    return page || 1;
  },
  result: (limit: number, page: number, total: number) => {
    return {
      _limit: limit,
      _page: page,
      _total: total,
    };
  },
};

export default Pagination;
