import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { passwordAndEmailState, token } from "atoms/atoms";

export function useAuthToken(email: string, password: string) {
  const setPasswordValue = useSetRecoilState(passwordAndEmailState);
  const response = useRecoilValue(token);

  useEffect(() => {
    setPasswordValue({ email: email, password: password });
  }, [password]);

  return response;
}
