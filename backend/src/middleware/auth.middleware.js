import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, email, role }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};

export default authMiddleware;

