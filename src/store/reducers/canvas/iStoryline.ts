import { ActionType } from '../../../types';
import iStoryline from 'i-storyline-js';
import { StoryStore } from '../../../utils/storyStore';

const initialState = {
  storyName: '',
  storyLayouter: new iStoryline(),
  storyStore: new StoryStore()
};

export default (state = initialState, action: ActionType) => {
  const _iStoryliner = new iStoryline();
  switch (action.type) {
    case 'LOAD_STORYFILE':
      const { fileUrl, fileType } = action.payload;
      _iStoryliner.loadFile(fileUrl, fileType);
      return {
        storyName: fileUrl,
        storyLayouter: _iStoryliner,
        storyStore: new StoryStore()
      };
    case 'LOAD_STORYJSON': {
      const { storyName, storyJson } = action.payload;
      // iStoryline.loadJSON is async, but Story.loadJSON (called inside it) runs
      // parseJSONFile synchronously with no await statements. Calling it without
      // await populates _story immediately; _layout() then builds the graph
      // synchronously. Using 'any' cast is necessary since Redux reducers must
      // be synchronous and the library does not expose a synchronous load API.
      (_iStoryliner as any)._story.loadJSON(storyJson);
      const graph = (_iStoryliner as any)._layout();
      return {
        storyName: storyName,
        storyLayouter: _iStoryliner,
        storyStore: new StoryStore(graph)
      };
    }
    case 'BEND_STORYLINES': {
      const { args } = action.payload;
      if (args === null) return state;
      const [names, timeSpan] = args;
      const graph =
        timeSpan.length === 1
          ? state.storyLayouter.bend(names, timeSpan)
          : state.storyLayouter.straighten(names, timeSpan);
      return {
        storyName: state.storyName,
        storyLayouter: state.storyLayouter,
        storyStore: new StoryStore(graph)
      };
    }
    case 'SORT_STORYLINES': {
      const { args } = action.payload;
      if (args === null) return state;
      // TODO: consider local re-ordering
      const [names, timeSpan] = args;
      const graph = state.storyLayouter.sort(names, timeSpan);
      return {
        storyName: state.storyName,
        storyLayouter: state.storyLayouter,
        storyStore: new StoryStore(graph)
      };
    }
    case 'COMPRESS_STORYLINES': {
      const { args } = action.payload;
      if (args === null) return state;
      const [names, timeSpan] = args;
      // TODO: enable scale adjustment
      const graph = state.storyLayouter.compress(names, timeSpan, 0.5);
      return {
        storyName: state.storyName,
        storyLayouter: state.storyLayouter,
        storyStore: new StoryStore(graph)
      };
    }
    case 'STYLISH_STORYLINES': {
      const { args } = action.payload;
      if (args === null) return state;
      const [names, timeSpan, type] = args;
      if (timeSpan[0] === -1 || timeSpan[1] === -1) return state;
      const graph = state.storyLayouter.stylish(names, timeSpan, type);
      return {
        storyName: state.storyName,
        storyLayouter: state.storyLayouter,
        storyStore: new StoryStore(graph)
      };
    }
    case 'RELATE_STORYLINES': {
      const { args } = action.payload;
      if (args === null) return state;
      const [names, timeSpan, type] = args;
      if (timeSpan[0] === -1 || timeSpan[1] === -1) return state;
      const graph = state.storyLayouter.relate(names, timeSpan, type);
      return {
        storyName: state.storyName,
        storyLayouter: state.storyLayouter,
        storyStore: new StoryStore(graph)
      };
    }
    default:
      break;
  }
  return state;
};
