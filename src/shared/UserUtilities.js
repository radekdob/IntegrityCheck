

export const getUsername = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.username;
}

export const isUserLogged = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return !!user;
}

export const getBasicAuthHeaderValue = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return `Basic ${user.btoa}`;
}
