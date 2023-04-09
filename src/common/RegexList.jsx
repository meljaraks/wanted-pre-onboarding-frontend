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

export const getRegex = (type, data) => {
  const item = RegexList.find((el) => type === el.type);
  return item.regex.test(data);
};
