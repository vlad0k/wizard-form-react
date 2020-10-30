import { FormikValues } from 'formik';

const FORM_STATE_KEY = 'formState';

export const saveFormState = async (formState: FormikValues) => {
  var reader = new FileReader();
  formState.avatar && reader.readAsDataURL(formState.avatar);
  localStorage.setItem(FORM_STATE_KEY, JSON.stringify({ formState }));
  reader.onloadend = () =>
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify({ formState, avatar: reader.result }));
};

//TODO comment next pull request
export const getFormState = (): object => {
  const formState = localStorage.getItem(FORM_STATE_KEY);
  return formState && JSON.parse(formState);
};

export const deleteFormState = () => {
  localStorage.removeItem(FORM_STATE_KEY);
};
