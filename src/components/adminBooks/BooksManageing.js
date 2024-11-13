import React from 'react';
import Searchbar from './Searchbar';
import CategoryFilter from './CategoryFilter';
import './Books.css';

const BooksManageing = () => {
  return (
    <div className="book_container">
      <div className="book_contianer_top">
        <h2>도서 목록</h2>
        <div className="books_search">
          <Searchbar />
          <CategoryFilter />
        </div>
        <button>일관 삭제</button>
      </div>
      <div className="book_contianer_main">
        <div className="book_contianer_main_tap">
          <span>ID</span>
          <span>책 목록</span>
          <span>리뷰</span>
          <span>평점</span>
          <span>등록날짜</span>
          <span>베스트셀러 여부</span>
          <span>상태</span>
        </div>
      </div>
    </div>
  );
};

export default BooksManageing;
