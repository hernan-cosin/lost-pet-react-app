// import { Cloudinary } from "@cloudinary/url-gen";
// const API_BASE_URL = "https://m7-lost-pet-app.herokuapp.com";
const API_BASE_URL = "http://localhost:3009";

// const cld = new Cloudinary({
//   cloud: {
//     cloudName: "hcosin",
//   },
// });

export async function getPetsNearBy(lat, lng) {
  const res = await fetch(
    API_BASE_URL + "/pets-near-location?lat=" + lat + "&lng=" + lng,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const pets = await res.json();

  return pets.petsNearLocationResponse;
}

export async function emailCheck(email: string) {
  if (email) {
    const checkResponse = await fetch(API_BASE_URL + "/email-check", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    return checkResponse;
  }
}

export async function authToken(email, password) {
  const authToken = fetch(API_BASE_URL + "/auth/token", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return authToken;
}

export async function userInfo(token) {
  if (token) {
    const authorization = `bearer ${token}`;

    const userInfo = fetch(API_BASE_URL + "/me", {
      headers: {
        "content-type": "application/json",
        Authorization: authorization,
      },
    });

    return userInfo;
  }
}

export async function createUser(userData) {
  const newUser = fetch(API_BASE_URL + "/auth", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      name: userData.name,
      lastName: userData.lastName,
      password: userData.password,
      password1: userData.password1,
    }),
  });

  return newUser;
}

export async function updateUserInfo(userData) {
  console.log(userData);

  let userDataToUpdate = {} as any;

  if (userData.email) {
    userDataToUpdate.email = userData.email;
  }
  if (userData.name) {
    userDataToUpdate.name = userData.name;
  }
  if (userData.lastName) {
    userDataToUpdate.lastName = userData.lastName;
  }
  if (userData.password) {
    userDataToUpdate.password = userData.password;
  }
  if (userData.password1) {
    userDataToUpdate.password1 = userData.password1;
  }

  const authorization = `beaarer ${userData.token}`;

  const updateUserInfo = fetch(API_BASE_URL + "/user", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(userDataToUpdate),
  });

  return updateUserInfo;
}

export async function myReports(token) {
  if (token) {
    const authorization = `bearer ${token}`;
    const userPets = fetch(API_BASE_URL + "/my-pets", {
      headers: {
        "content-type": "application/json",
        Authorization: authorization,
      },
    });

    return userPets;
  }
}

export async function reportPet(petInfo, token: string) {
  const authorization = `bearer ${token}`;

  const serverResponse = await fetch(API_BASE_URL + "/pet", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(petInfo),
  });

  return serverResponse;
  // const url = `https://api.cloudinary.com/v1_1/hcosin/image/upload`;

  // const formData = new FormData();
  // formData.append("file", petInfo.imgUrl);
  // formData.append("upload_preset", "omiteaq6");

  // if (!petInfo) {
  //   throw new Error("User was not provided");
  // }
  // try {
  //   // CLOUDINARY
  //   const res = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const cloudinaryRes = await res.json();
  //   console.log(cloudinaryRes);

  // SEQUELIZE
  // const [newPet, created] = await Pet.findOrCreate({
  //   where: { name: petData.petName, userId: userId },
  //   defaults: {
  //     name: petData.petName,
  //     description: petData.petDescription,
  //     imgUrl: imgUpload.url,
  //     status: petData.status,
  //     userId: userId,
  //     loc_lat: petData.loc_lat,
  //     loc_lng: petData.loc_lng,
  //     petZone: petData.petZone,
  //     deleted: petData.deleted,
  //   },
  // });

  // ALGOLIA
  //   if (created) {
  //     const savePet = await index.saveObject({
  //       objectID: newPet.get("id"),
  //       name: newPet.get("name"),
  //       _geoloc: {
  //         lat: newPet.get("loc_lat"),
  //         lng: newPet.get("loc_lng"),
  //       },
  //     });

  //     return { created };
  //   } else {
  //     return false;
  //   }
  // } catch (e) {
  //     console.log(e);
  // }
}
