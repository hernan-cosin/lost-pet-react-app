import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userInformationUpdateUserState,
  userInformationUpdateUserResponse,
} from "atoms/atoms";

export function useUpdateUser(userInformation) {
  const setUserInformation = useSetRecoilState(userInformationUpdateUserState);
  const response = useRecoilValue(userInformationUpdateUserResponse);

  useEffect(() => {
    setUserInformation(userInformation);
  }, [userInformation]);

  return response;
}
