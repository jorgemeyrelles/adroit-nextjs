const REPORT = 'REPORT';
const USER = 'USER';

const searchReport = (report) => ({
  type: REPORT,
  payload: {
    report,
  }
});

const user = (token) => ({
  type: USER,
  payload: {
    token,
  }
});

export {
  REPORT,
  USER,
  searchReport,
  user,
};
