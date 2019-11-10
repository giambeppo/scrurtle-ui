const baseUrl = 'https://my.api.endpoint/scrurtle?counter=';

export const getUrl = counter => baseUrl + counter;
export const incrementUrl = counter => baseUrl + counter + '&after=increment';
export const resetUrl = counter => baseUrl + counter + '&after=set&newValue=0';
