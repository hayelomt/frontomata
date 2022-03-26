import { Model } from "../../core/utils/types";

export type Impact = {
  title: string;
  amount: number;
  from_date: Date;
  to_date: Date;
  women_impacted: number;
  girls_impacted: number;
  men_impacted: number;
  boys_impacted: number;
  donated_by: string;
  locations: string;
} & Model;

export type ImpactCreate = {
  title: string;
  amount: number;
  from_date: Date;
  to_date: Date;
  women_impacted: number;
  girls_impacted: number;
  men_impacted: number;
  boys_impacted: number;
  donated_by: string;
  locations: string;
}
export type ImpactEdit = {
  title?: string;
  amount?: number;
  from_date?: Date;
  to_date?: Date;
  women_impacted?: number;
  girls_impacted?: number;
  men_impacted?: number;
  boys_impacted?: number;
  donated_by?: string;
  locations?: string;
}