export const jwtConstants = {
    secret: process.env.NEWSPORTALAPIKEY, // OS environment variable!    
    signOptions: {expiresIn: 60*5}, // expiresIn - time in seconds
};
