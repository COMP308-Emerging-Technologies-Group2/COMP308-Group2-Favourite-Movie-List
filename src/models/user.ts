export class UserModel {
  private _email: string;
  private _password: string;
  private _displayName: string;


  constructor(email: string, password: string, displayName: string) {
    this._email = email;
    this._password = password;
    this._displayName = displayName;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }
}
