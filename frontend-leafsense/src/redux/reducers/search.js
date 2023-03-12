import { REPORT } from '../actions';

const INITIAL_STATE = {
  report: {
    name: '',
    id: '',
    farms: '',
    block: '',
    spacing: '',
    variety: '',
    age: '',
  },
};

const search = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case REPORT:
      return {
        report: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default search;
