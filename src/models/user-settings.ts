export class UserSettingsModel {
  private _displayName: string;


  constructor(displayName: string) {
    this._displayName = displayName;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }
}
