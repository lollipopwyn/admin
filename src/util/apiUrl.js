// util/apiUrl.js
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://222.112.27.120:8002' // 배포용 URL
    : 'http://localhost:8002'; // 로컬 개발용 URL

// 예시)
// export const GET_TERMS_API_URL = `${BASE_URL}/terms`;

export const GET_BOOK_ALL_CATEGORIES_API_URL = `${BASE_URL}/all-categories`; //도서 전체 카테고리 조회
export const GET_BOOK_LIST_API_URL = `${BASE_URL}/book-list`; //도서 조회
export const GET_SEARCH_BOOKS_API_URL = `${BASE_URL}/search-books`; //도서 키워드 검색
