import { ImageLoaderProps } from 'next/image';

//prop que recibe es de tipo string | null y la func devuelve string
// ya que el metodo donde es llamado Image->src solo acepta strings
export const toString = (poke: string | null | undefined): string => {
  return poke && isUrl(poke) ? poke : '';
};

//Verifica que el elemento sea una url
// devuelve un boolean
const isUrl = (str: string): boolean => {
  return /^https?:\/\//gi.test(str);
};
