const RegexList = [
  {
    type: "email",
    regex: /@+/,
  },
  {
    type: "password",
    regex: /.{8,}/,
  },
];

export const useRegex = ({ target, type }) => {
  const regex = RegexList.find((regexType) => type === regexType.type);
  return regex.regex.test(target);
};
