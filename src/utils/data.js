const DataUtils = {
  paging: async ({ start = 0, limit = 10, sort, model, query, facetData }) => {
    query.push({
      $sort: sort,
    });

    let facetDataComp = [
      {
        $skip: parseInt(start, 10),
      },
      {
        $limit: parseInt(limit, 10),
      },
    ];
    if (facetData) facetDataComp = facetDataComp.concat(facetData);
    query.push({
      $facet: {
        data: facetDataComp,
        total: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
        ],
      },
    });

    const matchedData = await model.aggregate(query);

    let data = [];
    let total = 0;
    if (matchedData[0].data.length > 0) {
      data = matchedData[0].data;
      total = matchedData[0].total[0].count;
    }

    return {
      data,
      total,
      limit,
      start,
      page: Math.floor(start / limit) + 1,
    };
  },
};

module.exports = {
  DataUtils,
};
