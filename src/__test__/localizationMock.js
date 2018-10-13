const interfaceLanguage = 'en';

class RNLocalization {
  constructor(props) {
    this.props = props;
    this.setLanguage(interfaceLanguage);
  }

  setLanguage(interfaceLanguage) {
    const bestLanguage = interfaceLanguage;
    this.language = bestLanguage;
    // Associate the language object to the this object
    if (this.props[bestLanguage]) {
      // console.log("There are strings for the language:"+language);
      const localizedStrings = this.props[this.language];
      for (const key in localizedStrings) {
        if (localizedStrings.hasOwnProperty(key)) {
          this[key] = localizedStrings[key];
        }
      }
    }
  }
}

export default RNLocalization;
