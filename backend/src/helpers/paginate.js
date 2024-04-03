async function paginate(model, query, { page = 1, limit = 10 }, populateOptions = []) {
  let queryBuilder = model
    .find(query)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  if (populateOptions.length) {
    populateOptions.forEach((populateOption) => {
      queryBuilder = queryBuilder.populate(populateOption);
    });
  }

  const result = await queryBuilder;
  const count = await model.countDocuments(query);

  return {
    data: result,
    totalCount: count,
    currentPage: Number(page),
    totalPages: Math.ceil(count / Number(limit)),
  };
}

export default paginate;
