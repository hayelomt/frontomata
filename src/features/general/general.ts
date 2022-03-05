import { Media, Model } from '../../core/utils/types';

export type General = {
  title: string;
  media: Media[];
} & Model;

export type GeneralInputType = {
  title: string;
};
