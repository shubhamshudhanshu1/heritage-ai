import { fetchConfig } from "@/redux/slices/configSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useConfigFetcher = (tenant, userType) => {
  const dispatch = useDispatch();
  const { config, loading, error } = useSelector((state) => state.config);

  useEffect(() => {
    if (tenant && userType) {
      dispatch(fetchConfig({ tenant, userType }));
    }
  }, [tenant, userType, dispatch]);

  return { config, error, loading };
};

export default useConfigFetcher;
