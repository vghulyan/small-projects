export const stringToCamel = (str: string) =>
  str.replace(/\W+/g, "-").toLowerCase();
