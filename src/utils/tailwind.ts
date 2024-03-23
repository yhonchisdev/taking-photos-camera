import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function tcn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
