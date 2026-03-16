import { StoryStore } from '../../../../utils/storyStore';
import iStorylineReducer from '../iStoryline';

// Sample JSON files from public/json
import ChasingDragon from '../../../../../public/json/ChasingDragon.json';
import Coco from '../../../../../public/json/Coco.json';
import Frozen from '../../../../../public/json/Frozen.json';
import Guowuguan from '../../../../../public/json/Guowuguan.json';
import InceptionTune from '../../../../../public/json/InceptionTune.json';
import JurassicParkTune from '../../../../../public/json/JurassicParkTune.json';
import KingLearTune from '../../../../../public/json/KingLearTune.json';
import LetBulletFlyTune from '../../../../../public/json/LetBulletFlyTune.json';
import MatrixTune from '../../../../../public/json/MatrixTune.json';
import Minions from '../../../../../public/json/Minions.json';
import MoonAndSixpence from '../../../../../public/json/MoonAndSixpence.json';
import NaniaTune from '../../../../../public/json/NaniaTune.json';
import Naruto from '../../../../../public/json/Naruto.json';
import Redcap from '../../../../../public/json/Redcap.json';
import StarWarsTune from '../../../../../public/json/StarWarsTune.json';
import Suiciders from '../../../../../public/json/Suiciders.json';
import TrainToBusan from '../../../../../public/json/TrainToBusan.json';

const sampleFiles: Array<{ name: string; json: any }> = [
  { name: 'ChasingDragon', json: ChasingDragon },
  { name: 'Coco', json: Coco },
  { name: 'Frozen', json: Frozen },
  { name: 'Guowuguan', json: Guowuguan },
  { name: 'InceptionTune', json: InceptionTune },
  { name: 'JurassicParkTune', json: JurassicParkTune },
  { name: 'KingLearTune', json: KingLearTune },
  { name: 'LetBulletFlyTune', json: LetBulletFlyTune },
  { name: 'MatrixTune', json: MatrixTune },
  { name: 'Minions', json: Minions },
  { name: 'MoonAndSixpence', json: MoonAndSixpence },
  { name: 'NaniaTune', json: NaniaTune },
  { name: 'Naruto', json: Naruto },
  { name: 'Redcap', json: Redcap },
  { name: 'StarWarsTune', json: StarWarsTune },
  { name: 'Suiciders', json: Suiciders },
  { name: 'TrainToBusan', json: TrainToBusan },
];

describe('iStoryline reducer with sample JSON files', () => {
  sampleFiles.forEach(({ name, json }) => {
    it(`renders ${name}.json without errors`, () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const action = {
        type: 'LOAD_STORYJSON',
        payload: { storyName: name, storyJson: json },
      };

      const newState = iStorylineReducer(undefined, action as any);

      expect(newState.storyName).toBe(name);
      expect(newState.storyLayouter).toBeDefined();
      expect(newState.storyStore).toBeDefined();
      expect(newState.storyStore).toBeInstanceOf(StoryStore);
      expect(newState.storyStore.names).toBeDefined();
      expect(Array.isArray(newState.storyStore.names)).toBe(true);
      expect(newState.storyStore.names.length).toBeGreaterThan(0);
      expect(newState.storyStore.paths).toBeDefined();
      expect(Array.isArray(newState.storyStore.paths)).toBe(true);

      // Verify rendering is void of error messages
      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();

      consoleError.mockRestore();
      consoleWarn.mockRestore();
    });
  });
});
