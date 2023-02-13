import {jwt} from 'jsonwebtoken';

export async function generateToken(userId){
    return jwt.sign({userId}, process.env.DEEP_SECRET, {expiresIn:'2d'})
}

