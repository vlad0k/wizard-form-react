import { FormikValues } from 'formik';

import {
  HOBBIES_CHECKBOX_GROUP,
  LANGUAGE_SELECT_OPTIONS,
  SKILLS_SELECT_OPTIONS,
} from '../formOptions';
import ageValidator from './dateYearSubstract';

const faker = require('faker');
faker.random.array = (min: number, max: number, cb: () => any = () => {}): any[] => {
  const len = faker.random.number({ min, max });
  const array = [];

  for (let i = 0; i < len; ++i) {
    array[i] = cb();
  }

  return array.filter((element, index, arr) => arr.indexOf(element) === index);
};
const createFakeUser = (): FormikValues => {
  const newUser = {
    additionalInfo: faker.lorem.text(),
    address: faker.address.streetAddress(),
    avatar: faker.image.avatar(),
    birthdate: faker.date.past(70, ageValidator(18)),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    facebook: '',
    fax: '',
    firstname: faker.name.firstName(),
    gender: faker.random.arrayElement(['male', 'female']),
    github: '',
    hobbies: faker.random.array(0, HOBBIES_CHECKBOX_GROUP.length, () =>
      faker.random.arrayElement(HOBBIES_CHECKBOX_GROUP.map((hobbie) => hobbie.label)),
    ),
    lastname: faker.name.lastName(),
    mainLang: faker.random.arrayElement(LANGUAGE_SELECT_OPTIONS).value,
    password: faker.internet.password(),
    phoneNumbers: faker.random.array(0, 3, () => faker.phone.phoneNumber('+38 (0##) ### ## ##')),
    skills: faker.random.array(
      3,
      SKILLS_SELECT_OPTIONS.length,
      () => faker.random.arrayElement(SKILLS_SELECT_OPTIONS).value,
    ),
    username: faker.internet.userName(),
  };
  return newUser;
};

export default createFakeUser;
