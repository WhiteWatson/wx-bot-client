// import { firstName } from "@/utils/constant";
import store from "@/store";

export const isQuestion = (text: string): string | boolean => {
  const storeSetting = store.getters?.getSetting?.setting;
  const firstName = storeSetting.firstName;
  for (let i = 0; i < firstName.length; i++) {
    const key = firstName[i];
    if (text.startsWith(key)) {
      return text.substring(key.length);
    }
  }
  return false;
};
