export interface Contacts {
  [key: string]: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  region: string;
  contacts: Contacts;
}

export interface GroupedCountries {
  [region: string]: Country[];
}