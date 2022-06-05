import React, { useEffect, useState } from "react";
import { myReports } from "lib/api";
import { useSetRecoilState } from "recoil";
import { reportedPetState } from "atoms/atoms";

export async function useMyReportedPet() {
  const token = localStorage.getItem("token");

  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getPets() {
      const res = await myReports(token);
      if (res) {
        const myReportedPets = await res.json();
        setPets(myReportedPets.pets);
        return myReportedPets;
      }
    }

    getPets();
  }, []);

  const setReportedPetState = useSetRecoilState(reportedPetState);
  useEffect(() => {
    setReportedPetState(pets);
  }, [pets]);
}
