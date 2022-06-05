import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenValueState, userInformation } from "atoms/atoms";

export function useUserInfo() {
  const setTokenValue = useSetRecoilState(tokenValueState);
  const response = useRecoilValue(userInformation);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTokenValue(token);
  }, [token]);

  return response;
}
