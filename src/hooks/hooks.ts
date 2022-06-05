import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { paramState, resultState } from "atoms/atoms";

export function useGetPetsNearBy() {
  const queryParam = useParams();

  const setQueryValue = useSetRecoilState(paramState);
  const results: [] = useRecoilValue(resultState);

  useEffect(() => {
    // setQueryValue({ lat: "-34.5995152", lng: "-58.3841121" });
    setQueryValue({ lat: queryParam.lat, lng: queryParam.lng });
  }, [queryParam]);

  let publicResults = [];

  results.forEach((pet: any) => {
    if (pet.deleted == "true") {
      return;
    }
    if (pet.status == "found") {
      return;
    } else {
      return publicResults.push(pet);
    }
  });

  return publicResults;
  return results;
}
