import { useEffect, useState } from "react";
import { getRegex } from "../common/RegexList";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export const SignUp = () => {
  const [value, setValue] = useState({
    "email-input": "",
    "password-input": "",
  });
  const [isDisabled, setDisabled] = useState(true);
  const navi = useNavigate();
  const { instance } = useAxios();

  const updateInput = (e) => {
    const testid = e.currentTarget.dataset.testId;
    setValue((val) => {
      return {
        ...val,
        [testid]: e.target.value,
      };
    });
  };
  const goLogin = () => {
    const sendSignUpData = {
      email: value["email-input"],
      password: value["password-input"],
    };
    instance
      .post("/auth/signup", sendSignUpData)
      .then((res) => {
        if (res.status === 201) navi("/signin");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token != null) navi("/todo");
  });

  useEffect(() => {
    setDisabled(() =>
      getRegex("email", value["email-input"]) &&
      getRegex("password", value["password-input"])
        ? false
        : true
    );
  }, [value]);

  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-lg font-bold flex mb-4 items-center justify-center">
        회원가입
      </span>
      <div className="flex gap-2 justify-center items-center mb-5">
        <input
          className="text-xl font-black rounded-lg border-gray-900 border-solid border-2 px-2"
          data-test-id="email-input"
          onKeyUp={updateInput}
        />
      </div>
      <div className="flex gap-2 justify-center items-center mb-6">
        <input
          className="text-xl font-black rounded-lg border-gray-900 border-solid border-2 px-2"
          data-test-id="password-input"
          type="password"
          onKeyUp={updateInput}
        />
      </div>

      <button
        className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg w-[350px] disabled:opacity-25"
        disabled={isDisabled}
        onClick={goLogin}
      >
        회원가입
      </button>
    </div>
  );
};
