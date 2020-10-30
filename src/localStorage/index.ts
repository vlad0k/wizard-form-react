import { FormikValues } from 'formik';

const FORM_STATE_KEY = 'formState';

//TODO save avatar to localstorage
export const saveFormState = async (formState: FormikValues) => {
  const formStateString = JSON.stringify(formState);
  localStorage.setItem(FORM_STATE_KEY, formStateString);
};

//TODO comment next pull request
export const getFormState = (): object => {
  const formState = localStorage.getItem(FORM_STATE_KEY);
  return formState && JSON.parse(formState);
};

export const deleteFormState = () => {
  localStorage.removeItem(FORM_STATE_KEY);
};
