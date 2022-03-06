import { FormikHelpers } from 'formik';
import React from 'react';

export type ValidationError = {
  errors: Record<string, string>;
};

export type ValidationHandler = (err: ValidationError) => void;

export type ErrorHandler = (err: string) => void;

export type SuccessHandler = (data: any, status?: number) => void;

export type FormSubmit<T> = (
  values: T,
  { setFieldError }: FormikHelpers<T>
) => void | Promise<any>;

export type ReactChildren = {
  children: React.ReactNode;
};

export interface PaginationTableProps {
  page: number;
  rowsPerPage: number;
  total: number;
  handleChangePage: (
    _: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export type Model = {
  id: number;
  created_at: string;
};

export type Renderer<T = object> = (arg?: T) => React.ReactElement;

export type Media = {
  id: number;
  name: string;
  file_name: string;
  size: number;
};

export type Paginated<T> = {
  total: number;
  data: T[];
};
