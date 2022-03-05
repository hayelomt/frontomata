import { ValidationError } from './types';

type ErrorSetter = (field: string, message: string) => void;

export const parseValidationErrors = (
  { errors }: ValidationError,
  fieldErrorSetter: ErrorSetter
) => {
  Object.entries(errors).forEach(([key, message]) =>
    fieldErrorSetter(key, message)
  );
};
