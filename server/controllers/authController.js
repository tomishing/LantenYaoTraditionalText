import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        if (username === process.env.ADMIN_USERNAME) {
            const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD);

            if (isPasswordValid) {
                const token = jwt.sign(
                    { role: "admin", username },
                    process.env.JWT_SECRET,
                    { expiresIn: "12h" }
                );

                return res.status(200).json({
                    success: true,
                    token,
                });
            }
        }

        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    } catch (err) {
        next(err);
    }
};
