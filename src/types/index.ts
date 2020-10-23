import { OptionTypeBase } from 'react-select';

export enum ButtonAppearance {
  primary = 'primary',
  secondary = 'secondary',
  text = 'text',
  finish = 'finish',
  delete = 'delete',
}

export type UserType = {
  additionalInfo: string;
  address: string;
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
  mainLang: OptionTypeBase;
  password: string;
  phoneNumbers: string[];
  skills: OptionTypeBase[];
  username: string;
  updatedAt: Date;
};

export type RadioOptionType = {
  value: string;
  label: string;
};

export type SkillOptionType = {
  value: string;
  label: string;
};

export enum AvatarSize {
  small = 'small',
  default = 'default',
  large = 'large',
}

export enum UsersFetchStatus {
  unfetched,
  isFetching,
  fetched,
}

export type UrlParamTypes = {
  id: string;
};

export type FormPropsType = {
  nextStepHandler: () => void;
  prevStepHandler: () => void;
};
