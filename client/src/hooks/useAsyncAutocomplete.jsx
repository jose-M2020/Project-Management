import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useAsyncAutocomplete = (query) => {
  const [getData, { loading: loadingQuery, data = [] }] = useLazyQuery(query);
  const [open, setOpen] = useState(false);
  const loading = open && (data?.length === 0);
    
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    };
    
    (async () => {
      if (active && !loadingQuery) {
        await getData();
      }
    })();
    
    return () => {
      active = false;
    };
  });

  return { data, loading, open, setOpen }
}


export default useAsyncAutocomplete;