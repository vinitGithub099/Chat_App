export default class AppError extends Error {
  resObj;

  constructor(error) {
    super();
    this.resObj = error;
  }

  getResObj() {
    return this.resObj;
  }
}
