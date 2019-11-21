const dbMock = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  first: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  sum: jest.fn().mockReturnThis(),
  then: jest.fn(done => {
    done(null);
  }),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn(async data => [data]),
  delete: jest.fn(async () => 1),
  returning: jest.fn().mockReturnThis(),
};

module.exports = () => jest.fn(() => dbMock);
