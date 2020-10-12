export enum ButtonAppearance {
  Primary = 'primary',
  Secondary = 'secondary',
  Text = 'text',
  Finish = 'finish',
  Delete = 'delete',
}

export type UserType = {
  additionalInfo: string;
  adress: string;
  avatar: File | null;
  birthdate: Date | undefined;
  company: string;
  email: string;
  facebook: string;
  fax: string;
  firstname: string;
  gender: 'male' | 'female' | undefined | null;
  github: string;
  hobbies: string[];
  id: number | string;
  lastname: string;
  mainLang: string;
  password: string;
  phoneNumbers: string[];
  skills: string[];
  username: string;
};

export type RadioOptionType = {
  value: string;
  label: string;
};

export type SkillOptionType = {
  value: string;
  label: string;
};
