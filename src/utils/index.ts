import { firstName } from "@/utils/constant";

export const isQuestion = (text: string): string | boolean => {
  for (let i = 0; i < firstName.length; i++) {
    const key = firstName[i];
    if (text.startsWith(key)) {
      return text.substring(key.length);
    }
  }
  return false;
};
