import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { emailState, emailCheckResult } from "atoms/atoms";

export function useEmailCheck(email: string) {
  const setEmailAtom = useSetRecoilState(emailState);
  const response = useRecoilValue(emailCheckResult);

  useEffect(() => {
    setEmailAtom(email);
    // console.log("CUSTOM HOOK EMAIL", email);
  }, [email]);

  return response;
}
