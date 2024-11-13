import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GET_BOOK_LIST_API_URL,
  GET_BOOK_BY_CATEGORY_API_URL,
  GET_SEARCH_BOOKS_API_URL,
} from '../../util/apiUrl';
import Searchbar from './Searchbar';
import CategoryFilter from './CategoryFilter';
import Pagination from '../common/Pagination';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색어 상태 추가

  useEffect(() => {
    if (searchKeyword) {
      fetchSearchResults(currentPage, searchKeyword); // 검색어가 있을 때는 검색 API 호출
    } else {
      fetchBooks(currentPage, selectedCategory); // 그렇지 않을 경우 일반 목록 API 호출
    }
  }, [currentPage, selectedCategory, searchKeyword]);

  const fetchBooks = async (page, genre_tag_id) => {
    setLoading(true);
    try {
      const apiUrl = genre_tag_id
        ? GET_BOOK_BY_CATEGORY_API_URL
        : GET_BOOK_LIST_API_URL;
      const response = await axios.get(apiUrl, {
        params: { page, limit, genre_tag_id },
      });
      setBooks(response.data.data);
      setTotalBooks(response.data.totalBooks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  // 검색 결과를 처리하는 함수
  const handleSearch = (data, keyword) => {
    setBooks(data.data);
    setTotalBooks(data.totalBooks);
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
    setSelectedCategory(''); // 검색 시 선택된 카테고리 초기화
    setSearchKeyword(keyword); // 검색어 상태 업데이트
  };

  const fetchSearchResults = async (page, keyword) => {
    setLoading(true);
    try {
      const response = await axios.get(GET_SEARCH_BOOKS_API_URL, {
        params: { keyword, page, limit },
      });
      setBooks(response.data.data);
      setTotalBooks(response.data.totalBooks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchKeyword(''); // 카테고리 변경 시 검색어 초기화
  };

  const totalPages = Math.ceil(totalBooks / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="booklist_container">
      <div className="booklist_search">
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <Searchbar apiUrl={GET_SEARCH_BOOKS_API_URL} onSearch={handleSearch} />
      </div>
      <div className="delete_all_books">
        <button>선택 사항 삭제</button>
      </div>
      <div className="book_contianer_main_tap">
        <span>ID</span>
        <span>책 목록</span>
        <span>리뷰</span>
        <span>평점</span>
        <span>등록날짜</span>
        <span>베스트셀러 여부</span>
        <span>상태</span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="booklist_wrapper">
          <div className="booklist_content">
            <div className="booklist_contnet">
              {books.map((book, index) => (
                <div key={book.book_id}>
                  <div className="book_list_item">
                    <span key={book.genre_tag_id}></span>
                    <span> {book.book_id}</span>
                    <span>{book.book_title}</span>
                    <span>{book.review_count}</span>
                    <span>{book.average_rating}</span>
                    <span>{book.book_create_date}</span>
                    <span>{book.is_book_best}</span>
                    <span>{book.book_status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
