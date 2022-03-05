import { Model } from "../../core/utils/types";

export type Blog = {
  title: string;
  counter: number;
  description: string;
  image: File | null;
  selection: string;
  color: string;
  tune_level: number;
  conditions: boolean;
  created_at: Date;
} & Model;

export type BlogCreate = {
  title: string;
  counter: number;
  description: string;
  image: File | null;
  selection: string;
  color: string;
  tune_level: number;
  conditions: boolean;
  created_at: Date;
}