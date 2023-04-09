import axios from "axios";

export const useAxios = () => {
  const access_token = localStorage.getItem("access_token");
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    baseURL: "https://www.pre-onboarding-selection-task.shop/",
  });

  return { instance };
};
