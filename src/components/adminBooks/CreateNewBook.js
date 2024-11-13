import React from 'react';

const CreateNewBook = () => {
  return (
    <div className="create_new_book_container">
      <div className="create_new_book_title_area">
        <h3>ADD BOOK INFORMATION</h3>
      </div>
      <div className="upload_book_detail">
        <div className="input_book_info">
          <div>
            <label>제목</label>
            <input type="text" value={''} />
          </div>
          <div>
            <label>저자</label>
            <input type="text" value={''} />
          </div>
          <div>
            <label>출판사</label>
            <input type="text" value={''} />
          </div>
          <div>
            <label>출간연도</label>
            <input type="number" value={''} />
          </div>
          <div>
            <label>정가</label>
            <input type="number" value={''} />
          </div>
          <div>
            <label>카테고리</label>
            <input type="" value={''} />
          </div>
          <div>
            <label>ISBN</label>
            <input type="number" value={''} />
          </div>
          <div>
            <label>책 상세 소개</label>
            <input type="number" value={''} />
          </div>
        </div>
        <div className="upload_book_cover">
          <div>등록된 이미지 프리뷰</div>
          <label>이미지URL</label>
          <input type="" value={''} />
        </div>
      </div>
      <div className="book_create_button_area">
        <button>확인</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default CreateNewBook;
