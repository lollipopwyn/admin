import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// API 요청에 사용될 엔드포인트 URL을 import함
import {} from '../../util/apiUrl';

//Request 메서드
import {
  postRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} from '../../util/requestMethods';

//  =======================1. 동적 fetch Thunk 생성기========================
//    actionType (예: fetchGetBookList)
//    apiURL - 엔드포인트 URL
//    requestMethod - HTTP 요청 함수 (예: getRequest)
const createApiThunk = (actionType, apiURL, requestMethod) => {
  return createAsyncThunk(actionType, async (params) => {
    const options = {
      method: requestMethod === getRequest ? 'GET' : requestMethod.method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(requestMethod === getRequest ? {} : { body: JSON.stringify(params) }),
      credentials: 'include',
    };
    const url = typeof apiURL === 'function' ? apiURL(params) : apiURL;
    return await requestMethod(url, options);
  });
};

// ========================2. 각 Thunks 정의========================
//    특정 API 요청을 위해 createApiThunk를 호출하여 Thunk 함수 생성

//예시
// export const fetchBookListData = createApiThunk(
//   'api/fetchGetBookList',
//   GET_BOOK_LIST_API_URL,
//   getRequest
// );

//========================3. 비동기 API 호출 처리========================
// fulfilled 상태를 처리하는 핸들러 함수 생성
const handleFullfilled = (stateKey) => (state, action) => {
  if (Array.isArray(action.payload)) {
    state[stateKey] = action.payload;
  } else if (action.payload && typeof action.payload === 'object') {
    state[stateKey] = action.payload.data || action.payload;
  }
  state.isLoading = false;
};

// rejected 상태를 처리하는 핸들러 함수
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.errorMessage = action.error.message;
};

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
  state.errorMessage = '';
};

// ========================4. apiSlice 슬라이스 생성========================
//    Redux 슬라이스를 생성하여 초기 상태와 비동기 액션의 상태 관리 설정
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    // 예시) hotTopics: [],
    // 기타 초기화

    isLoading: false,
    isError: false,
    errorMessage: '',
  },

  // 비동기 액션을 처리하는 extraReducers 설정
  extraReducers: (builder) => {
    // builder
    // 예시)
    // .addCase(
    //   fetchBookListData.fulfilled,
    //   handleFullfilled('fetchGetBookList')
    // )
    // .addCase(fetchBookListData.rejected, handleRejected);
    // 다른 extraReducers 설정
  },
});

export default apiSlice.reducer;
