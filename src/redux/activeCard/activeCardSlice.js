import { createSlice } from '@reduxjs/toolkit'

export const activeCardSlice = createSlice({
  name: 'activeCard',

  // Init start value of a slice in redux
  initialState: {
    currentActiveCard: null,
    isShowModalActiveCard: false
  },
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },

    updateCurrentActiveCard: (state, action) => {
      // action.payload: là chuẩn đặt tên nhận dữ liệu vào reducer
      const card = action.payload

      // Xử lý dữ liệu nếu cần thiết
      // ...

      // Update lại dữ liệu của cái currentActiveCard
      state.currentActiveCard = card
    }
  }
  // ExtraReducers: Nơi xử lý bất đồng bộ
})

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const {
  updateCurrentActiveCard,
  clearAndHideCurrentActiveCard,
  showModalActiveCard
} = activeCardSlice.actions

// Selectors: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ redux ra ngoài sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

// cái file này tên là activeCardSlice nhưng chúng ta sẽ export một thứ tên là reducer
// export default activeCardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer
