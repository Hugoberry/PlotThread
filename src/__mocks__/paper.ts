// Mock for paper.js to allow tests to run in jsdom without canvas support
const mockColor = jest.fn().mockImplementation((r?: any, g?: any, b?: any, a?: any) => ({
  red: r || 0,
  green: g || 0,
  blue: b || 0,
  alpha: a !== undefined ? a : 1,
  equals: jest.fn(),
  toString: jest.fn(() => 'rgba(0,0,0,1)'),
  toCSS: jest.fn(() => '#e6e6e6'),
  clone: jest.fn(),
  convert: jest.fn(),
}));

const mockPoint = jest.fn().mockImplementation((x?: any, y?: any) => ({
  x: x || 0,
  y: y || 0,
  add: jest.fn(),
  subtract: jest.fn(),
  multiply: jest.fn(),
  divide: jest.fn(),
  equals: jest.fn(),
  clone: jest.fn(),
  toString: jest.fn(),
}));

const mockRectangle = jest.fn().mockImplementation((x?: any, y?: any, w?: any, h?: any) => ({
  x: x || 0,
  y: y || 0,
  width: w || 0,
  height: h || 0,
  clone: jest.fn(),
  contains: jest.fn(),
  intersects: jest.fn(),
}));

const mockMatrix = jest.fn().mockImplementation(() => ({
  apply: jest.fn(),
  clone: jest.fn(),
  invert: jest.fn(),
}));

const createMockItem = () => ({
  position: { x: 0, y: 0 },
  bounds: { x: 0, y: 0, width: 0, height: 0 },
  visible: true,
  opacity: 1,
  data: {},
  name: '',
  parent: null,
  children: [],
  addChild: jest.fn(),
  remove: jest.fn(),
  removeChildren: jest.fn(),
  clone: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  fitBounds: jest.fn(),
  contains: jest.fn(),
  intersects: jest.fn(),
  hitTest: jest.fn(),
  getItems: jest.fn(() => []),
  strokeColor: null,
  fillColor: null,
  strokeWidth: 1,
  dashArray: [],
  closed: false,
  fullySelected: false,
  selected: false,
});

const mockGroup = jest.fn().mockImplementation((children?: any[]) => ({
  ...createMockItem(),
  children: children || [],
  addChild: jest.fn(),
  addChildren: jest.fn(),
  removeChildren: jest.fn(),
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockPath = jest.fn().mockImplementation((segments?: any) => ({
  ...createMockItem(),
  segments: [],
  curves: [],
  pathData: '',
  smooth: jest.fn(),
  simplify: jest.fn(),
  add: jest.fn(),
  insert: jest.fn(),
  removeSegments: jest.fn(),
  remove: jest.fn(),
  clone: jest.fn(),
  closePath: jest.fn(),
  getPointAt: jest.fn(() => ({ x: 0, y: 0 })),
  getTangentAt: jest.fn(() => ({ x: 0, y: 0 })),
  getLength: jest.fn(() => 0),
  getNearestPoint: jest.fn(() => ({ x: 0, y: 0 })),
  getOffsetOf: jest.fn(() => 0),
  intersects: jest.fn(() => false),
  getIntersections: jest.fn(() => []),
  strokeColor: null,
  fillColor: null,
  strokeWidth: 1,
}));

const mockCompoundPath = jest.fn().mockImplementation(() => ({
  ...createMockItem(),
  children: [],
  addChild: jest.fn(),
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockShape = jest.fn().mockImplementation(() => ({
  ...createMockItem(),
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockSegment = jest.fn().mockImplementation((point?: any) => ({
  point: point || { x: 0, y: 0 },
  handleIn: { x: 0, y: 0 },
  handleOut: { x: 0, y: 0 },
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockPointText = jest.fn().mockImplementation(() => ({
  ...createMockItem(),
  content: '',
  fontSize: 12,
  fontFamily: 'sans-serif',
  fillColor: null,
  justification: 'left',
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockRaster = jest.fn().mockImplementation(() => ({
  ...createMockItem(),
  source: '',
  remove: jest.fn(),
  clone: jest.fn(),
}));

const mockTool = jest.fn().mockImplementation(() => ({
  onMouseDown: null,
  onMouseDrag: null,
  onMouseUp: null,
  onMouseMove: null,
  activate: jest.fn(),
  remove: jest.fn(),
}));

const mockItem = jest.fn().mockImplementation(() => createMockItem());

const mockView = {
  center: { x: 0, y: 0 },
  bounds: { x: 0, y: 0, width: 800, height: 600 },
  zoom: 1,
  size: { width: 800, height: 600 },
  update: jest.fn(),
  draw: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  onFrame: null,
  onResize: null,
};

const mockProject = {
  activeLayer: {
    children: [],
    addChild: jest.fn(),
    removeChildren: jest.fn(),
    remove: jest.fn(),
  },
  layers: [],
  selectedItems: [],
  clear: jest.fn(),
  getItems: jest.fn(() => []),
  hitTest: jest.fn(),
  hitTestAll: jest.fn(() => []),
  importJSON: jest.fn(),
  exportJSON: jest.fn(),
  importSVG: jest.fn(),
  exportSVG: jest.fn(),
};

const paper = {
  Color: mockColor,
  Point: mockPoint,
  Rectangle: mockRectangle,
  Matrix: mockMatrix,
  Group: mockGroup,
  Path: mockPath,
  CompoundPath: mockCompoundPath,
  Shape: mockShape,
  Segment: mockSegment,
  PointText: mockPointText,
  Raster: mockRaster,
  Tool: mockTool,
  Item: mockItem,
  view: mockView,
  project: mockProject,
  setup: jest.fn(),
  install: jest.fn(),
};

export const Color = mockColor;
export const Point = mockPoint;
export const Rectangle = mockRectangle;
export const Matrix = mockMatrix;
export const Group = mockGroup;
export const Path = mockPath;
export const CompoundPath = mockCompoundPath;
export const Shape = mockShape;
export const Segment = mockSegment;
export const PointText = mockPointText;
export const Raster = mockRaster;
export const Tool = mockTool;
export const Item = mockItem;
export const view = mockView;
export const project = mockProject;

export default paper;
