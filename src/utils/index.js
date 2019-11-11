const baseUrl = process.env.REACT_APP_BASE_SCRURTLE_URL + '?counter=';

export const getUrl = counter => baseUrl + counter;
export const incrementUrl = counter => baseUrl + counter + '&after=increment';
export const resetUrl = counter => baseUrl + counter + '&after=set&newValue=0';
