import bcrypt from "bcrypt";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node utils/hashPassword.js <password>");
  process.exit(1);
}

const password = args[0];
const hash = await bcrypt.hash(password, 10);
console.log("Hashed password:", hash);
console.log("\nAdd this to your .env as ADMIN_PASSWORD_HASH");
