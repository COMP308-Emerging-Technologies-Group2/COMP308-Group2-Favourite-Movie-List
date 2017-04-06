export class UserSettingsModel {
  private _email: string;
  private _displayName: string;


  constructor(email: string, displayName: string) {
    this._email = email;
    this._displayName = displayName;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }
}
