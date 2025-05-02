export const loginFormRules = () => {
  const rules = {
    username: [(val: string) => !!val || "請輸入帳號"],
    password: [(val: string) => !!val || "請輸入密碼"],
  };
  return rules;
};