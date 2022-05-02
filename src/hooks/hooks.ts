import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { paramState, resultState, itemResult, itemParam } from "atoms/atoms";

export function useGetPetsNearBy() {
  const queryParam = useParams();

  const setQueryValue = useSetRecoilState(paramState);
  const results = useRecoilValue(resultState);

  useEffect(() => {
    setQueryValue({ lat: queryParam.lat, lng: queryParam.lng });
  }, [queryParam]);

  let publicResults = [];

  results.forEach((pet) => {
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
}

export function useSearchResults() {
  const queryParam = useParams();
  const query = queryParam;

  const setQueryValue = useSetRecoilState(paramState);
  const results = useRecoilValue(resultState);

  return results;
}

export function useItemResult() {
  const queryParam = useParams();
  const query = queryParam;

  const setItemValue = useSetRecoilState(itemParam);
  const result = useRecoilValue(itemResult);

  useEffect(() => {
    setItemValue(query.id);
  }, [query]);

  return result;
}
