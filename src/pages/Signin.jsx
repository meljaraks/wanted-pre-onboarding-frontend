/**
 * CHECKLIST
 * [x]  유효성 검사 이메일 조건: @ 포함
 * [x]  유효성 검사 비밀번호 조건: 8자 이상
 * [x] 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여
 * WARNING 유효성검사시 주어진 조건 이외의 조건 추가 X
 *
 * [x] : 로그인 완료시 /TODO 이동
 * [x] : 로컬 스토리지에 JWT 저장
 * [x] : 로컬 스토리지에 토큰이 있을때 /TODO로 리다이렉트
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { getRegex } from "../common/RegexList";

export const SignIn = () => {
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
      .post("/auth/signin", sendSignUpData)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navi("/todo");
        }
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
    <>
      <span>로그인</span>
      <input data-test-id="email-input" onKeyUp={updateInput} />
      <input
        data-test-id="password-input"
        type="password"
        onKeyUp={updateInput}
      />
      <button disabled={isDisabled} onClick={goLogin}>
        로그인하기
      </button>
    </>
  );
};
