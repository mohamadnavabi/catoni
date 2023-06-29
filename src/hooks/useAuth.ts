import { DependencyList, useEffect, useMemo } from "react";
import { useAppSelector } from "store/hooks";

type Callback = () => void;

const useAuth = (callback: Callback, deps: DependencyList = []) => {
  const { user } = useAppSelector((state) => state.auth);

  const dependencyList = useMemo(() => [user, ...deps], [user, deps]);

  useEffect(() => {
    if (user && user.token) {
      callback();
    }
  }, dependencyList);

  return user;
};

export default useAuth;
