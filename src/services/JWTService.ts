import jwt from "jsonwebtoken";

interface IJWTData {
    id: number;
}

const sign = (data: IJWTData) => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2d" });

    return token;
};

const verify = (token: string) => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

    try {
        const check = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof check === "string") return "INVALID_TOKEN";
        return check;
        
    } catch (error) {
        return "INVALID_TOKEN";
    }
};


export const JWTService = {
    sign,
    verify
};