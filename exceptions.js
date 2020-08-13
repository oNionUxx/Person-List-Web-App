class Exceptions {
  // Method to verify a valid person id

  static isValidNumber(id) {
    const id_pattern = /^\d*$/;
    return id_pattern.test(id);
  }

  // Method to verify a valid person name

  static isValidName(name) {
    const name_pattern = /.[a-zA-Z]{1}.*/;
    return name_pattern.test(name);
  }

  // Method to verify a valid person age

  static isValidAge(age) {
    const age_pattern = /^(?:1[01][0-9]|120|1[8-9]|[2-9][0-9])$/;
    return age_pattern.test(age);
  }

  // Method to verify a valid person salary

  static isValidFtd(ftd) {
    const ftd_pattern = /^(?:1[01][0-9][0-9][0-9][0-9]|120000|[5-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9])$/;

    return ftd_pattern.test(ftd);
  }
}
