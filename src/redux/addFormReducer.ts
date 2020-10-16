import { FormikValues } from 'formik';
import { OptionTypeBase, ValueType } from 'react-select';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from './store';

const GO_BACK = 'addForm/GO_BACK';
const SUBMIT_FORM = 'addForm/SUBMIT_FORM';
const CLEAR_FORM = 'addForm/CLEAR_FORM';

const SELECT_STEP = 'addForm/SELECT_STEP';

interface GoBackAction {
  type: typeof GO_BACK;
}

interface SelectStepAction {
  type: typeof SELECT_STEP;
  step: number;
}

interface ClearFormAction {
  type: typeof CLEAR_FORM;
}

interface SubmitFormAction {
  type: typeof SUBMIT_FORM;
  values: FormikValues;
}

type AddFormActionsType = GoBackAction | SelectStepAction | ClearFormAction | SubmitFormAction;

const initialState = {
  currentStep: 0,

  avatar: null as File | null,
  username: '',
  password: '',

  firstname: '',
  lastname: '',
  birthdate: undefined as Date | undefined,
  email: '',
  adress: '',
  gender: null as 'male' | 'female' | null,

  company: '',
  facebook: '',
  github: '',
  mainLang: null as ValueType<OptionTypeBase>,
  fax: '',
  phoneNumbers: [''],

  skills: [] as ValueType<OptionTypeBase>,
  additionalInfo: '',
  hobbies: [] as string[],
};

const addFormReducer = (state = initialState, action: AddFormActionsType) => {
  switch (action.type) {
    case GO_BACK: {
      return {
        ...state,
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
      };
    }

    case SELECT_STEP: {
      return {
        ...state,
        currentStep: action.step,
      };
    }

    case CLEAR_FORM: {
      return {
        ...initialState,
      };
    }

    case SUBMIT_FORM: {
      return {
        ...state,
        currentStep: state.currentStep < 3 ? state.currentStep + 1 : 0,
        ...action.values,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default addFormReducer;

export const goBack = (): GoBackAction => ({ type: GO_BACK });

export const selectStep = (step: number): SelectStepAction => ({
  type: SELECT_STEP,
  step,
});

export const submitFormActionCreator = (values: FormikValues): SubmitFormAction => ({
  type: SUBMIT_FORM,
  values,
});

export const clearForm = (): ClearFormAction => ({ type: CLEAR_FORM });

export const submitForm = (
  values: FormikValues,
): ThunkAction<void, StateType, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(submitFormActionCreator(values));
  localStorage.setItem('formState', JSON.stringify(getState().addForm));
};
