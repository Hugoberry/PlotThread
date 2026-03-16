// Mock for muuri to allow tests to run in jsdom
const mockGrid = {
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
  destroy: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  filter: jest.fn(),
  sort: jest.fn(),
  layout: jest.fn(),
  refreshItems: jest.fn(),
  getItems: jest.fn(() => []),
  getElement: jest.fn(),
};

const Muuri = jest.fn().mockImplementation(() => mockGrid);

export default Muuri;
