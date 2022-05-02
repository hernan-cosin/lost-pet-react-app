import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userInformationCreateUserState,
  userInformationCreateUserResponse,
} from "atoms/atoms";

export function useCreateUser(userInformation) {
  const setUserInformation = useSetRecoilState(userInformationCreateUserState);
  const response = useRecoilValue(userInformationCreateUserResponse);

  useEffect(() => {
    setUserInformation(userInformation);
  }, [userInformation]);

  return response;
}
