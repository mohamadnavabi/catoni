import { DependencyList, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/hooks";

type Action = (arg: any) => any;

const useAppDispatch = (action: Action, userAction: Action) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  if (user.token) {
    // dispatch(action);
  } else {
  }
};

export default useAppDispatch;
