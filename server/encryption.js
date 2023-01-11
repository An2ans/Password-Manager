const crypto = require("crypto");

const secret = "pppppppppppppppppppppppppppppppp";

const encrypt = (password) => {
  //random identify vector
  const iv = Buffer.from(crypto.randomBytes(16));
  //cipher (algorithm, secretkey, iv)
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);
  // For the encryption, we must encrypt the password and add the final
  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);
  //return both encryptation and iv
  return {
    hash: encryptedPassword.toString("hex"),
    iv: iv.toString("hex"),
  };
};

const decrypt = (encryption) => {
  const iv = Buffer.from(encryption.iv, "hex");
  //decipher
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    iv
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.hash, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt };
