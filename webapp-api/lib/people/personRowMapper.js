module.exports = {
  map: (row) => {
    return {
      firstName: row.firstName,
      lastName: row.lastName,
      description: row.description,
      status: row.status,
      tags: JSON.parse(row.tags)
    };
  }
};