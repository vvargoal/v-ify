import queryString from 'query-string';

function createQueryUrl(url, params) {
  return `${url}?${queryString.stringify(params)}`;
}

export default createQueryUrl;
