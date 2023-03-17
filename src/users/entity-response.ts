export const LoginUserMapper = (user, token) => {
    const {id, name, email, phone} = user;
    return {
        id,
        name,
        email,
        phone,
        token
    };
};
