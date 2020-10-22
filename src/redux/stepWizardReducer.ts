import { FormikValues } from 'formik';
import { OptionTypeBase, ValueType } from 'react-select';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from './store';

const BACK_BUTTON_HANDLE = 'form/BACK_BUTTON_HANDLE';
const SELECT_STEP = 'form/SELECT_STEP';
const SUBMIT_STEP = 'form/SUBMIT_STEP';
const SET_NUMBER_OF_STEPS = 'form/SET_NUMBER_OF_STEPS';
const PREVIOS_STEP = 'form/PREVIOS_STEP';
const NEXT_STEP = 'form/NEXT_STEP';
const RESET_FORM = 'form/RESET_FORM';
const EDIT_USER = 'form/EDIT_USER';
const LOAD_SAVED_FORM = 'form/LOAD_SAVED_FORM';
const INITIATE_STEP_WIZARD = 'form/INITIATE_STEP_WIZARD';

interface BackButonAction {
  type: typeof BACK_BUTTON_HANDLE;
}

interface SelectStepAction {
  type: typeof SELECT_STEP;
  step: number;
}

interface SetNumberOfStepsAction {
  type: typeof SET_NUMBER_OF_STEPS;
  numberOfSteps: number;
}

interface PreviosStepAction {
  type: typeof PREVIOS_STEP;
}

interface NextStepAction {
  type: typeof NEXT_STEP;
}

interface ResetFormAction {
  type: typeof RESET_FORM;
}

interface SubmitStepAction {
  type: typeof SUBMIT_STEP;
  values: FormikValues;
}

interface EditUserAction {
  type: typeof EDIT_USER;
  isEditMode: boolean;
}

interface LoadSavedFormAction {
  type: typeof LOAD_SAVED_FORM;
  values: FormikValues;
}

interface InitiateStepWizardAction {
  type: typeof INITIATE_STEP_WIZARD;
  numberOfSteps: number;
  isEditMode: boolean;
}

type AddFormActionsType =
  | BackButonAction
  | SelectStepAction
  | ResetFormAction
  | SubmitStepAction
  | EditUserAction
  | SetNumberOfStepsAction
  | PreviosStepAction
  | NextStepAction
  | LoadSavedFormAction
  | InitiateStepWizardAction;

const initialState = {
  currentStep: 0,
  numberOfSteps: 0,
  isEditMode: false,
  form: {
    avatar: null as File | null,
    username: '',
    password: '',

    firstname: '',
    lastname: '',
    birthdate: undefined as Date | undefined,
    email: '',
    address: '',
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
  },
};

const stepWizardReducer = (state = initialState, action: AddFormActionsType) => {
  switch (action.type) {
    case BACK_BUTTON_HANDLE: {
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

    case SUBMIT_STEP: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.values,
        },
      };
    }

    case SET_NUMBER_OF_STEPS: {
      return {
        ...state,
        numberOfSteps: action.numberOfSteps,
      };
    }

    case PREVIOS_STEP: {
      return {
        ...state,
        currentStep: state.currentStep === 0 ? 0 : state.currentStep - 1,
      };
    }

    case NEXT_STEP: {
      return {
        ...state,
        currentStep:
          state.currentStep === state.numberOfSteps - 1 ? state.currentStep : state.currentStep + 1,
      };
    }

    case RESET_FORM: {
      return {
        ...state,
        currentStep: 0,
        form: {
          ...initialState.form,
        },
      };
    }

    case LOAD_SAVED_FORM: {
      return {
        ...state,
        currentStep: 0,
        form: {
          ...state.form,
          ...action.values,
        },
      };
    }

    case INITIATE_STEP_WIZARD: {
      return {
        ...state,
        isEditMode: action.isEditMode,
        numberOfSteps: action.numberOfSteps,
      };
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

export default stepWizardReducer;

export const backButtonHanle = (): BackButonAction => ({ type: BACK_BUTTON_HANDLE });

export const selectStep = (step: number): SelectStepAction => ({ type: SELECT_STEP, step });

export const submitForm = (values: FormikValues): SubmitStepAction => ({
  type: SUBMIT_STEP,
  values,
});
export const previosStep = (): PreviosStepAction => ({
  type: PREVIOS_STEP,
});

export const nextStep = (): NextStepAction => ({
  type: NEXT_STEP,
});

export const editUser = (isEditMode: boolean): EditUserAction => ({
  type: EDIT_USER,
  isEditMode,
});

export const loadSavedForm = (values: FormikValues): LoadSavedFormAction => ({
  type: LOAD_SAVED_FORM,
  values,
});

export const resetForm = (): ResetFormAction => ({ type: RESET_FORM });

export const initiateStepWizard = (
  numberOfSteps: number,
  isEditMode: boolean,
): InitiateStepWizardAction => ({
  type: INITIATE_STEP_WIZARD,
  numberOfSteps,
  isEditMode,
});

export const saveFormToDb = (): ThunkAction<void, StateType, unknown, Action<string>> => () => {};
