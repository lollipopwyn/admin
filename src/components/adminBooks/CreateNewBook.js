import React, { useState } from 'react';
import { POST_NEW_BOOKS_API_URL } from '../../util/apiUrl';
import axios from 'axios';

const CreateNewBook = ({ onClose }) => {
  // 입력 필드를 관리할 상태 정의
  const [formData, setFormData] = useState({
    book_cover: '',
    book_publisher: '',
    publish_date: '',
    isbn: '',
    book_description: '',
    book_price: '',
    is_book_best: false,
    book_title: '',
    book_author: '',
    genre_tag_name: '',
  });

  // 입력 필드의 변경을 처리하는 함수
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 필수 입력 필드 유효성 검사를 위한 함수
  const validateForm = () => {
    const {
      book_cover,
      book_publisher,
      publish_date,
      isbn,
      book_description,
      book_price,
      book_title,
      book_author,
      genre_tag_name,
    } = formData;

    // 필수 입력 필드가 비어있는지 확인
    if (
      !book_cover ||
      !book_publisher ||
      !publish_date ||
      !isbn ||
      !book_description ||
      !book_price ||
      !book_title ||
      !book_author ||
      !genre_tag_name
    ) {
      alert('필수 항목을 다 채우세요!'); // 필수 항목이 비어 있을 때 알림
      return false;
    }

    // 각 필드 형식이 올바른지 확인 (예: ISBN이 숫자인지, 출간연도가 올바른지)
    if (
      isNaN(Number(isbn)) ||
      isNaN(Number(publish_date)) ||
      isNaN(Number(book_price))
    ) {
      alert('형식에 안 맞는 항목이 있습니다, 확인하세요!'); // 형식 오류가 있을 때 알림
      return false;
    }

    return true; // 모든 필드가 올바르면 true 반환
  };

  // 서버에 POST 요청을 보내는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유효성 검사 통과 여부 확인
    if (!validateForm()) {
      return; // 유효성 검사를 통과하지 못하면 서버 요청을 보내지 않음
    }

    try {
      const response = await axios.post(POST_NEW_BOOKS_API_URL, formData);
      console.log('신간 도서가 성공적으로 추가되었습니다:', response.data);
      alert('신간 도서가 성공적으로 등록되었습니다.');
      onClose(); // 팝업 닫기
    } catch (error) {
      console.error('도서 등록 중 오류 발생:', error);
      alert('도서 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="create_new_book_container">
      <div className="create_new_book_title_area">
        <h3>ADD BOOK INFORMATION</h3>
      </div>
      <form className="upload_book_detail" onSubmit={handleSubmit}>
        <div className="upload_book_detail">
          <div className="input_book_info">
            <div>
              <label>제목</label>
              <input
                type="text"
                name="book_title"
                value={formData.book_title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>저자</label>
              <input
                type="text"
                name="book_author"
                value={formData.book_author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>출판사</label>
              <input
                type="text"
                name="book_publisher"
                value={formData.book_publisher}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>출간연도</label>
              <input
                type="number"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>정가</label>
              <input
                type="number"
                name="book_price"
                value={formData.book_price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>카테고리</label>
              <input
                type="text"
                name="genre_tag_name"
                value={formData.genre_tag_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>ISBN</label>
              <input
                type="number"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>책 상세 소개</label>
              <textarea
                name="book_description"
                value={formData.book_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="upload_book_cover">
            <div>등록된 이미지 프리뷰</div>
            <label>이미지URL</label>
            <input
              type="text"
              name="book_cover"
              value={formData.book_cover}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="book_create_button_area">
          <button type="submit">확인</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewBook;
