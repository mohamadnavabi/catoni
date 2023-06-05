import CryptoJS from "crypto-js";

const storeEncryptData = (name: string, data: string): void => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY as string
  ).toString();
  localStorage.setItem(name, encrypted);
};

const getDecryptData = (name: string): JSON | null | string => {
  const encrypted = localStorage.getItem(name);

  if (!encrypted) return encrypted;

  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY as string
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export { storeEncryptData, getDecryptData };
