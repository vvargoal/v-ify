import queryString from 'query-string';

export default function createQueryUrl(url, params) {
  return `${url}?${queryString.stringify(params)}`;
}
