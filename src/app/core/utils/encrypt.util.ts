import { mode, pad } from 'crypto-js';
import { decrypt, encrypt } from 'crypto-js/aes';
import * as base64 from 'crypto-js/enc-base64';
import * as uft8 from 'crypto-js/enc-utf8';

export namespace EncryptUtil {
  export function encryptBase64(data: string, plainKey: string): string | null {
    try {
      const iv = uft8.parse(plainKey.substring(0, 16));
      const key = uft8.parse(plainKey.substring(16));

      return encrypt(data, key, {
        iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
      }).toString();
    } catch (error) {
      return null;
    }
  }

  export function decryptBase64(data: string, plainKey: string): string | null {
    try {
      const iv = uft8.parse(plainKey.substring(0, 16));
      const key = uft8.parse(plainKey.substring(16));
      const crypted = base64.parse(data);

      return decrypt(
        {
          ciphertext: crypted,
        } as any,
        key,
        {
          iv,
          mode: mode.CBC,
          padding: pad.Pkcs7,
        }
      ).toString(uft8);
    } catch (error) {
      return null;
    }
  }
}
