const FORM_STATE_KEY = 'formState';

export const saveFormState = (formState: object) => {
  const formStateString = JSON.stringify(formState);
  localStorage.setItem(FORM_STATE_KEY, formStateString);
};

//TODO comment next pull request
export const getFormState = (): object => {
  const formState = localStorage.getItem(FORM_STATE_KEY);
  return formState ? JSON.parse(formState) : undefined;
};

export const deleteFormState = () => {
  localStorage.removeItem(FORM_STATE_KEY);
};
