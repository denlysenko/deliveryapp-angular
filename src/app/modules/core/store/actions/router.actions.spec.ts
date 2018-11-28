import { RouterPayload } from '../../models';
import { Back, Forward, Go, RouterActionTypes } from './router.actions';

describe('Router Actions', () => {
  describe('Go', () => {
    it('should create an action', () => {
      const payload: RouterPayload = {
        path: ['path']
      };
      const action = new Go(payload);
      expect({ ...action }).toEqual({
        type: RouterActionTypes.GO,
        payload: payload
      });
    });
  });

  describe('Back', () => {
    it('should create an action', () => {
      const action = new Back();
      expect({ ...action }).toEqual({
        type: RouterActionTypes.BACK
      });
    });
  });

  describe('Forward', () => {
    it('should create an action', () => {
      const action = new Forward();
      expect({ ...action }).toEqual({
        type: RouterActionTypes.FORWARD
      });
    });
  });
});
