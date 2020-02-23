export const jwtConstants = {
    secret: process.env.NEWSPORTALAPIKEY, // OS environment variable!    
    signOptions: {expiresIn: 60*60*24}, // expiresIn - time in seconds    
};
