import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

type BcryptModule = {
  hash(data: string, salt: number): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
};

const SCRYPT_PREFIX = "scrypt";
const SALT_ROUNDS = 12;

const scryptAsync = promisify(scrypt);

let cachedBcrypt: Promise<BcryptModule | null> | null = null;

async function loadBcrypt(): Promise<BcryptModule | null> {
  if (!cachedBcrypt) {
    cachedBcrypt = import("bcryptjs")
      .then((module) => (module as unknown as { default?: BcryptModule } & BcryptModule))
      .then((module) => module.default ?? module)
      .catch(() => null);
  }

  return cachedBcrypt;
}

async function hashWithScrypt(password: string) {
  const salt = randomBytes(16);
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${SCRYPT_PREFIX}:${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

async function compareWithScrypt(password: string, hash: string) {
  const [, saltHex, keyHex] = hash.split(":");
  if (!saltHex || !keyHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const storedKey = Buffer.from(keyHex, "hex");
  const derivedKey = (await scryptAsync(password, salt, storedKey.length)) as Buffer;

  return timingSafeEqual(storedKey, derivedKey);
}

export async function hashPassword(password: string) {
  const bcrypt = await loadBcrypt();

  if (bcrypt) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  return hashWithScrypt(password);
}

export async function verifyPassword(password: string, hash: string) {
  if (hash.startsWith(`${SCRYPT_PREFIX}:`)) {
    return compareWithScrypt(password, hash);
  }

  const bcrypt = await loadBcrypt();

  if (!bcrypt) {
    throw new Error("bcryptjs module is not available to verify this hash");
  }

  return bcrypt.compare(password, hash);
}
