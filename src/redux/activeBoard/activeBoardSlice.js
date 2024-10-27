import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sort'

// Init a slice in redux store

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )
    return response.data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',

  // Init start value of a slice in redux
  initialState: {
    currentActiveBoard: null
  },
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload: là chuẩn đặt tên nhận dữ liệu vào reducer
      const board = action.payload

      // Xử lý dữ liệu nếu cần thiết
      // ...

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducers: Nơi xử lý bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload chính là cái response.data ở trên
      let board = action.payload

      // Xử lý dữ liệu nếu cần thiết
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ redux ra ngoài sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// cái file này tên là activeBoardSlice nhưng chúng ta sẽ export một thứ tên là reducer
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer
