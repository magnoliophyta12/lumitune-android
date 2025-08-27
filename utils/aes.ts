import Config from "react-native-config";
import "react-native-get-random-values";
import CryptoJS from "crypto-js";

export const encrypt = (plainText: string): string => {
  const key = Config.AES_KEY;
  if (!key) throw new Error("AES_KEY is not defined");

  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decrypt = (cipherBase64: string): string => {
  const key = Config.AES_KEY;
  if (!key) throw new Error("AES_KEY is not defined");

  const ciphertext = CryptoJS.enc.Base64.parse(cipherBase64);
  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

  const decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};