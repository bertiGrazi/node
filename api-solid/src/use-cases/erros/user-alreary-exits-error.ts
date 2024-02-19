export class UserAlrearyExistsError extends Error {
  constructor() {
    super('E-mail alreary exists.')
  }
}