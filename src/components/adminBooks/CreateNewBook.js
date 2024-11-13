import React, { useState, useEffect } from 'react';
import {
  POST_NEW_BOOKS_API_URL,
  GET_BOOK_ALL_CATEGORIES_API_URL,
} from '../../util/apiUrl';
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
    is_book_best: false, // 기본값 false로 설정
    book_status: true, // 기본값 true로 설정
    book_title: '',
    book_author: '',
    genre_tag_name: '',
  });

  // 이미지 미리 보기 URL 상태 정의
  const [previewUrl, setPreviewUrl] = useState('');

  // 카테고리 목록을 관리할 상태 정의
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 카테고리 목록을 불러오기 위한 useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(GET_BOOK_ALL_CATEGORIES_API_URL);
        setCategories(response.data.categories); // categories 필드에 데이터 설정
      } catch (error) {
        console.error('카테고리 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 입력 필드의 변경을 처리하는 함수
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // book_cover 필드가 변경될 때 previewUrl 업데이트
    if (name === 'book_cover') {
      setPreviewUrl(value);
    }
  };

  // is_book_best 토글을 처리하는 함수
  const toggleIsBookBest = () => {
    setFormData((prevData) => ({
      ...prevData,
      is_book_best: !prevData.is_book_best,
    }));
  };

  // book_status 토글을 처리하는 함수
  const toggleBookStatus = () => {
    setFormData((prevData) => ({
      ...prevData,
      book_status: !prevData.book_status,
    }));
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

    // 확인 메시지 출력
    const isConfirmed = window.confirm(
      '신간 도서를 정말로 등록 하시겠습니까? 잘못된 내용이 없는지 꼭 확인 하세요.'
    );

    if (!isConfirmed) {
      return; // 사용자가 취소하면 아무 작업도 하지 않음
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
            <div className="book_info_toggle">
              {/* is_book_best 토글 버튼 추가 */}
              <div className="toggle_best_seller">
                <label>베스트셀러</label>
                <button
                  type="button"
                  className={`toggle_button ${
                    formData.is_book_best ? 'active' : 'inactive'
                  }`}
                  onClick={toggleIsBookBest}
                >
                  {formData.is_book_best ? 'On' : 'Off'}
                </button>
              </div>
              {/* book_status 토글 버튼 */}
              <div className="toggle_book_status">
                <label>도서 상태</label>
                <button
                  type="button"
                  className={`toggle_button ${
                    formData.book_status ? 'active' : 'inactive'
                  }`}
                  onClick={toggleBookStatus}
                >
                  {formData.book_status ? 'Available' : 'Unavailable'}
                </button>
              </div>
            </div>
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
              {loading ? (
                <p>카테고리를 불러오는 중...</p>
              ) : (
                <select
                  name="genre_tag_name"
                  value={formData.genre_tag_name}
                  onChange={handleChange}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option
                      key={category.genre_tag_id}
                      value={category.genre_tag_name}
                    >
                      {category.genre_tag_name}
                    </option>
                  ))}
                </select>
              )}
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
            <label>이미지 URL</label>
            <input
              type="text"
              name="book_cover"
              value={formData.book_cover}
              onChange={handleChange}
            />
            <div>등록된 이미지 프리뷰</div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="도서 이미지 미리 보기"
                className="image_preview"
                style={{ width: '100px', height: '150px', marginTop: '10px' }}
              />
            )}
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
