import {
  deviceType,
  browserName,
  fullBrowserVersion,
  mobileVendor,
  mobileModel,
  osName,
  osVersion,
  isMobile,
} from "react-device-detect";
import axios from "axios";

const getDeviceInfo = () => {
  return `${deviceType}(${
    isMobile ? "mobile" : "desktop"
  })|${browserName}(${fullBrowserVersion})|${mobileVendor}|${mobileModel}|${osName}(${osVersion})`;
};

const getDeviceIp = async (): Promise<any> => {
  try {
    const result = await axios.get("https://geolocation-db.com/json/");
    return result.data.IPv4;
  } catch (error) {
    return await getDeviceIp();
  }
};

export { getDeviceInfo, getDeviceIp };
