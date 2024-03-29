import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import MyRouter from "routers/index";
import { useAppDispatch } from "store/hooks";
import { setDeviceInfo, verify } from "store/slices";
import { getDeviceInfo } from "utils/device";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const deviceInfo = getDeviceInfo();
    dispatch(setDeviceInfo(deviceInfo));
    dispatch(verify(deviceInfo));
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* MAIN APP */}
      <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <MyRouter />
      </div>
    </>
  );
}

export default App;
