import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_BOOK_DETAIL_API_URL } from '../../util/apiUrl';
import './Books.css';

const BookListDetail = () => {
  const [bookDetails, setBookDetails] = useState({});
  const { bookId } = useParams();

  // Fetch book details
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(GET_BOOK_DETAIL_API_URL(bookId));
      const data = response.data;

      // Set default values if null
      setBookDetails({
        ...data,
        sent_email: data.sent_email ?? false,
        is_book_best: data.is_book_best ?? false,
        book_status: data.book_status ?? false,
      });
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="admin_book_detail">
      <form className="upload_book_detail">
        <div className="input_book_info">
          <div className="book_info_toggle">
            {/* Email toggle */}
            <div className="toggle_sent_email">
              <label>이메일 발송</label>
              <button
                type="button"
                className={`toggle_button ${
                  bookDetails.sent_email ? 'selected' : ''
                }`}
                disabled
              >
                {bookDetails.sent_email ? '발송 완료' : '미 발송'}
              </button>
            </div>
            {/* Bestseller toggle */}
            <div className="toggle_best_seller">
              <label>베스트셀러</label>
              <button
                type="button"
                className={`toggle_button ${
                  bookDetails.is_book_best ? 'selected' : ''
                }`}
                disabled
              >
                {bookDetails.is_book_best ? 'best' : 'none'}
              </button>
            </div>
            {/* Book status toggle */}
            <div className="toggle_book_status">
              <label>도서 상태</label>
              <button
                type="button"
                className={`toggle_button ${
                  bookDetails.book_status ? 'selected' : ''
                }`}
                disabled
              >
                {bookDetails.book_status ? '활성' : '숨김'}
              </button>
            </div>
          </div>
          <div>
            <label>제목</label>
            <input
              type="text"
              name="book_title"
              value={bookDetails.book_title || ''}
              readOnly
            />
          </div>
          <div>
            <label>저자</label>
            <input
              type="text"
              name="book_author"
              value={bookDetails.book_author || ''}
              readOnly
            />
          </div>
          <div>
            <label>출판사</label>
            <input
              type="text"
              name="book_publisher"
              value={bookDetails.book_publisher || ''}
              readOnly
            />
          </div>
          <div>
            <label>출간연도</label>
            <input
              type="text"
              name="publish_date"
              value={bookDetails.publish_date || ''}
              readOnly
            />
          </div>
          <div>
            <label>정가</label>
            <input
              type="text"
              name="book_price"
              value={`${bookDetails.book_price || ''}`}
              readOnly
            />
          </div>
          <div>
            <label>카테고리</label>
            <input
              type="text"
              name="genre_tag_name"
              value={bookDetails.genre_tag_name || ''}
              readOnly
            />
          </div>
          <div>
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={bookDetails.isbn || ''}
              readOnly
            />
          </div>
          <div className="book_desc">
            <label>책 상세 소개</label>
            <textarea
              name="book_description"
              value={bookDetails.book_description || ''}
              rows="5" // 원하는 높이에 맞춰 설정
              style={{
                fontFamily: 'var(--font-kr)',
                fontSize: 'var(--font-small)',
                width: '100%', // 고정 너비
                height: '170px', // 고정 높이
                resize: 'none', // 크기 조정 비활성화
                overflowY: 'auto', // 텍스트가 넘칠 경우 세로 스크롤 활성화
                whiteSpace: 'pre-wrap', // 줄바꿈 설정
                wordWrap: 'break-word', // 단어가 길 경우 자동 줄바꿈
              }}
              readOnly
            />
          </div>
        </div>
        <div className="upload_book_cover">
          <img
            src={bookDetails.book_cover}
            alt="도서 이미지 미리 보기"
            className="image_preview"
          />
          <label>이미지 URL</label>
          <input
            type="text"
            name="book_cover"
            value={bookDetails.book_cover || ''}
            readOnly
          />
          <div className="book_create_button_area">
            <button type="button">확인</button>
            <button type="button">취소</button>
          </div>
        </div>
        <div className="book_detail_timeline">
          <span>도서 등록 날짜: {bookDetails.book_create_date}</span>
          <span>도서 수정 날짜: {bookDetails.book_update_date}</span>
          <span>도서 비활성 처리 날짜: {bookDetails.book_delete_date}</span>
        </div>
      </form>
    </div>
  );
};

export default BookListDetail;
