import { FormikValues } from 'formik';
import { OptionTypeBase, ValueType } from 'react-select';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from './store';
import db from '../db/db';

const GO_BACK = 'form/GO_BACK';
const SUBMIT_FORM = 'form/SUBMIT_FORM';
const CLEAR_FORM = 'form/CLEAR_FORM';
const SELECT_STEP = 'form/SELECT_STEP';
const EDIT_USER = 'form/EDIT_USER';

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

interface EditUserAction {
  type: typeof EDIT_USER;
  isEditMode: boolean;
}

type AddFormActionsType =
  | GoBackAction
  | SelectStepAction
  | ClearFormAction
  | SubmitFormAction
  | EditUserAction;

const initialState = {
  currentStep: 0,
  isEditMode: false,

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

const formReducer = (state = initialState, action: AddFormActionsType) => {
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
      if (!state.isEditMode) {
        return {
          ...state,
          currentStep: state.currentStep < 3 ? state.currentStep + 1 : 0,
          ...action.values,
        };
      } else {
        return {
          ...state,
          ...action.values,
        };
      }
    }

    case EDIT_USER: {
      return {
        ...state,
        isEditMode: action.isEditMode,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default formReducer;

export const goBack = (): GoBackAction => ({ type: GO_BACK });

export const selectStep = (step: number): SelectStepAction => ({
  type: SELECT_STEP,
  step,
});

export const editUser = (isEditMode: boolean): EditUserAction => ({
  type: EDIT_USER,
  isEditMode,
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
};

export const saveFormToDb = (): ThunkAction<void, StateType, unknown, Action<string>> => (
  dispatch,
  getState,
) => {
  db.table('formState')
    .clear()
    .then(() => db.table('formState').add(getState().form));
};
