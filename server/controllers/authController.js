import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (
            username === process.env.ADMIN_USER &&
            password === process.env.ADMIN_PASS
        ) {
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

        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    } catch (err) {
        next(err);
    }
};
