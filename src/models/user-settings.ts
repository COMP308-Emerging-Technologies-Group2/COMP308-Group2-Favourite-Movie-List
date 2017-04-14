/**
 * File Name:     models/user-settings.ts
 * Description:   Contains database logic of user settings
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */


/**
 * Defines the user model with fields and getter/setters
 * 
 * @export
 * @class UserSettingsModel
 */
export class UserSettingsModel {
  private _email: string;
  private _displayName: string;


  /**
   * Creates an instance of UserSettingsModel.
   * @param {string} email 
   * @param {string} displayName 
   * 
   * @memberOf UserSettingsModel
   */
  constructor(email: string, displayName: string) {
    this._email = email;
    this._displayName = displayName;
  }

  // getters and setters
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
