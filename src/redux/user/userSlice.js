import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Init a slice in redux store

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    )
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',

  // Init start value of a slice in redux
  initialState: {
    currentUser: null
  },
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    //
  },
  // ExtraReducers: Nơi xử lý bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload chính là cái response.data ở trên
      const user = action.payload

      // Xử lý dữ liệu nếu cần thiết

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// export const {} = userSlice.actions

// Selectors: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ redux ra ngoài sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// cái file này tên là activeBoardSlice nhưng chúng ta sẽ export một thứ tên là reducer
// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer
