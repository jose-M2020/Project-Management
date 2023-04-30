import { useMemo } from "react";
import { useEffect, useState } from "react";

const useFilterStoredData = (storedData, allData) => {
  // const [filteredData, setFilteredData] = useState()
  
  // useEffect(() => {
  //   if(!allData?.length) return;
  //   if(!storedData?.length) {
  //     setFilteredData(allData);
  //     return;
  //   };

  //   const idArray = storedData?.map(item => (
  //     item._id
  //   ))
    
  //   const newData = allData?.filter(item => (
  //     !idArray.includes(item._id)
  //   ));
    
  //   setFilteredData(newData);
  // }, [allData, storedData])

  // return filteredData;


  const filteredData = useMemo(() => {
    if(!allData?.length) return;
    if(!storedData?.length) {
      return allData;
    };

    const idArray = storedData?.map(item => (
      item._id
    ))
    
    const newData = allData?.filter(item => (
      !idArray.includes(item._id)
    ));
    
    return newData;
  }, [storedData, allData])

  return filteredData;
}

export default useFilterStoredData;