import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getPetsNearBy,
  emailCheck,
  authToken,
  userInfo,
  createUser,
  updateUserInfo,
} from "lib/api";

// QUERY PARAMS FOR PETS NEAR BY
export const paramState = atom({
  key: "paramState", // unique ID (with respect to other atoms/selectors)
  default: { lat: "", lng: "" }, // default value (aka initial value)
});

export const resultState = selector({
  key: "searchResults", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const query = get(paramState);

    if (query.lat && query.lng) {
      const res = await getPetsNearBy(query.lat, query.lng);

      return res;
    } else {
      return [];
    }
  },
});

// EMAIL LOGIN-SIGNUP VALIDATION
export const emailState = atom({
  key: "emailState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const emailCheckResult = selector({
  key: "emailCheckResult", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const email = get(emailState);

    if (email) {
      const res = await emailCheck(email);
      const userFound = await res.json();

      if (userFound.userFound) {
        return true;
      }
      if (userFound.userFound == false) {
        return false;
      }
    } else {
      return [];
    }
  },
});

// PASSWORD
export const passwordAndEmailState = atom({
  key: "passwordState", // unique ID (with respect to other atoms/selectors)
  default: { email: "", password: "" }, // default value (aka initial value)
});

export const email = selector({
  key: "userEmail",
  get: ({ get }) => {
    const email = get(passwordAndEmailState);
    if (email.password) {
      return email.email;
    }
  },
});

// TOKEN
export const tokenValueState = atom({
  key: "tokenValue", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const token = selector({
  key: "paswordStateResult", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const { password, email } = get(passwordAndEmailState);

    if (password) {
      const res = await authToken(email, password);
      const authTokenRes = await res.json();

      if (authTokenRes.verified == false) {
        return false;
      }
      if (authTokenRes.verified == true) {
        localStorage.setItem("token", authTokenRes.token);

        return true;
      }
    }
  },
});

// USERINFORMATION
export const userInformation = selector({
  key: "userInfo",
  get: async ({ get }) => {
    const token = get(tokenValueState);

    if (token) {
      const res = await userInfo(token);

      const userInfoRes = await res.json();
      return userInfoRes;
    }
  },
});

// CREATE USER
export const userInformationCreateUserState = atom({
  key: "userInformationCreateUser",
  default: { email: "", name: "", lastName: "", password: "", password1: "" },
});

export const userInformationCreateUserResponse = selector({
  key: "userInformationCreateUserResponse",
  get: async ({ get }) => {
    const userInformation = get(userInformationCreateUserState);
    // console.log("ATOMS userInformation", userInformation);
    console.log("tokenValue", tokenValueState);

    if (
      userInformation.email &&
      userInformation.name &&
      userInformation.lastName &&
      userInformation.password &&
      userInformation.password1
    ) {
      const res = await createUser(userInformation);

      const userInfoRes = await res.json();
      console.log("userInfoRes atoms", userInfoRes);
      return userInfoRes;
    }
  },
});

// UPDATE USER INFORMATION
export const userInformationUpdateUserState = atom({
  key: "userInformationUpdateUserState",
  default: {
    token: "",
    email: "",
    name: "",
    lastName: "",
    password: "",
    password1: "",
  },
});

export const userInformationUpdateUserResponse = selector({
  key: "userInformationUpdateUserResponse",
  get: async ({ get }) => {
    const userInformationUpdate = get(userInformationUpdateUserState);
    console.log("atom userInfoUpdate", userInformationUpdate);

    if (userInformationUpdate.email) {
      const res = await updateUserInfo(userInformationUpdate);
      const updateUserResponse = await res.json();

      console.log("atoms update", updateUserResponse);
      return updateUserResponse;
    }
  },
});

// GET REPORTED PET BY USER
export const reportedPetState = atom({
  key: "reportedPetState",
  default: [],
});

// LOST PET COORDS
export const lostPetCoordsState = atom({
  key: "lostPetCoordsState",
  default: {},
});

// DROPZONE IMG URL
export const imgUrlState = atom({
  key: "imgUrlState",
  default: "",
});

// export const itemParam = atom({
//   key: "itemParam",
//   default: "",
// });

// export const itemResult = selector({
//   key: "itemResult",
//   get: async ({ get }) => {
//     const query = get(itemParam);

//     if (query) {
//       const res = await fetch("https://api.mercadolibre.com/items/" + query, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//       return data;
//     } else {
//       return [];
//     }
//   },
// });
