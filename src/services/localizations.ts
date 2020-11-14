import * as ExpoLocalization from 'expo-localization';
import i18n from 'i18n-js';
import dictionary from '../i18n/dictionary';

class Localization {

  private localization

  private availableLanguages = ['en', 'hu'];

  private fallbackLanguage = 'en';

  private language = this.getDefaultLanguage();

  private init() {
    i18n.translations = dictionary;
    console.log(this.language);
    i18n.locale = this.language;
    i18n.fallbacks = true;
    this.localization = i18n;
  }

  private getDefaultLanguage() {
    const expoLanguage = ExpoLocalization.locale.split('-')[0];
    return this.availableLanguages.includes(expoLanguage) ? expoLanguage : this.fallbackLanguage;
  }

  public getLocalization() {
    if (!this.localization) {
      this.init();
    }
    return this.localization;
  }

  public setLanguage(newLanguage) {
    this.language = newLanguage;
  }
}

const loc = new Localization();
const localizations = loc.getLocalization();
const { setLanguage } = loc;

export {
  localizations,
  setLanguage,
};
