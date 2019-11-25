const baseUrl = process.env.REACT_APP_BASE_SCRURTLE_URL;
const baseQueryParams = function(counter, user) {
    return `?counter=${counter}&by=${user}`;
}

export const getUrl = (counter, user) => baseUrl + baseQueryParams(counter, user);
export const incrementUrl = (counter, user) => baseUrl + baseQueryParams(counter, user) + '&after=increment';
export const resetUrl = (counter, user) => baseUrl + baseQueryParams(counter, user) + '&after=set&newValue=0';
