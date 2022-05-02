import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emailState, emailCheckResult } from "atoms/atoms";

export function useEmailCheck(email: string) {
  const setEmailValue = useSetRecoilState(emailState);
  const response = useRecoilValue(emailCheckResult);

  useEffect(() => {
    setEmailValue(email);
  }, [email]);

  return response;
}
