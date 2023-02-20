import { atom } from 'recoil';
import { IContent } from './api';

interface IModalContent extends IContent {
  layoutId: string;
}

export const contentModalState = atom<IModalContent | null>({
  key: 'contentModalState',
  default: null,
});
