import useSWR, { mutate } from 'swr';
import { getCurrentUser } from '~/actions/user';

const generateKey = () => ({ path: 'getCurrentUser' });

export const useCurrentUser = () => {
  return useSWR(generateKey(), () => getCurrentUser());
};

export const mutateCurrentUser = () => {
  mutate(generateKey());
};
