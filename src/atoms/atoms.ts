import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getPetsNearBy,
  emailCheck,
  authToken,
  userInfo,
  createUser,
  updateUserInfo,
} from "lib/api";

// MENU
export const openMenu = atom({
  key: "openMenu", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// REPORT SEEN PET INFORMATION
export const openReportForm = atom({
  key: "openReportForm", // unique ID (with respect to other atoms/selectors)
  default: { petId: 0, open: false }, // default value (aka initial value)
});

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
    if (
      userInformation.email &&
      userInformation.name &&
      userInformation.lastName &&
      userInformation.password &&
      userInformation.password1
    ) {
      const res = await createUser(userInformation);

      const userInfoRes = await res.json();
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

    if (userInformationUpdate.email) {
      const res = await updateUserInfo(userInformationUpdate);
      const updateUserResponse = await res.json();

      return updateUserResponse;
    }
  },
});

export const stateToken = atom({
  key: "stateToken",
  default: "",
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

// COORDS UPDATE
export const cordsUpdate = atom({
  key: "cordsUpdate",
  default: { loc_lat: undefined, loc_lng: undefined },
});

// DROPZONE IMG URL
export const imgUrlState = atom({
  key: "imgUrlState",
  default: "",
});

// EDIT PET INFORMATION
export const editPetInformation = atom({
  key: "editPetInformation",
  default: {
    id: 0,
    name: "",
    description: "",
    petZone: "",
    imgUrl: "",
    status: "",
    deleted: false,
    latlng: { lat: 0, lng: 0 },
  },
});

// FLAG CREATE PET OR UPDATE PET
export const flagCreatePet = atom({
  key: "flagCreatePet",
  default: false,
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
