import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";


export const auth = async (req: any, res: any, next: any) => {
    try {
        // Take token from headers
        const bearerHeader = req.headers['authorization'];

        if(typeof bearerHeader !== 'undefined'){

            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            let decoded: JwtPayload;
            try {
                const tokenPassed: string = `${process.env.TOKEN_KEY}`;
                decoded = jwt.verify(bearerToken, tokenPassed) as JwtPayload;
            } catch (e) {
                throw Error('Unauthorized');
            }
            const { authenticationNumber, user_id } = decoded;
            const user = await User.findOne({ _id: user_id, authenticationNumber });
            if (!user) {
                throw Error('UserNotExists');
            }

            req.user = user.toJSON();
            next();
        } else {
            res.send(403);
        }
    } catch (e) {
        res.send(403);
    }
}

export const createBearerToken = async (_id: string, authenticationNumber: number, username: string): Promise<string> => {
    // Create token
    const bearerToken = jwt.sign(
        { user_id: _id, username, authenticationNumber},
            `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "12h",
        }
    );

    return bearerToken;
}