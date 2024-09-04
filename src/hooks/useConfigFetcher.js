import { fetchConfig } from "@/redux/slices/configSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useConfigFetcher = (tenant, userType, scope) => {
  const dispatch = useDispatch();
  const { config, loading, error } = useSelector((state) => state.config);

  useEffect(() => {
    if (tenant && userType && scope) {
      dispatch(fetchConfig({ tenant, userType, scope }));
    }
  }, [tenant, userType, scope, dispatch]);

  return { config, error, loading };
};

export default useConfigFetcher;
