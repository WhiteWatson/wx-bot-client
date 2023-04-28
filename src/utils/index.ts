import { firstName } from "@/bot/config";

export const isQuestion = (text: string): string | boolean => {
  for (let i = 0; i < firstName.length; i++) {
    const key = firstName[i];
    if (text.startsWith(key)) {
      console.log(text.startsWith(key), text.substring(key.length));
      return text.substring(key.length);
    }
  }
  return false;
};
