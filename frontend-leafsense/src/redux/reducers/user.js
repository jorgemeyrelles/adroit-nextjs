import { USER } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { type, token } = action;

  switch (type) {
    case USER:
      return {
        token: token,
      };
    default:
      return state;
  }
};

export default user;
