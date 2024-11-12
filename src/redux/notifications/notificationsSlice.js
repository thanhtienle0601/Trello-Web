import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Init a slice in redux store

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm extraReducers
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/invitations`
    )
    console.log(response.data)
    return response.data
  }
)

export const updateBoardInvitationsAPI = createAsyncThunk(
  'notifications/updateBoardInvitationsAPI',
  async ({ notificationId, status }) => {
    const response = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${notificationId}`,
      { status }
    )
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',

  // Init start value of a slice in redux
  initialState: {
    currentNotifications: null
  },
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    addNotification: (state, action) => {
      const incomingNotification = action.payload

      state.currentNotifications.unShift(incomingNotification)
    }
  },
  // ExtraReducers: Nơi xử lý bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      // action.payload chính là cái response.data ở trên
      let incomingInvitations = action.payload

      state.currentNotifications = Array.isArray(incomingInvitations)
        ? incomingInvitations.reverse()
        : []
    })
    builder.addCase(updateBoardInvitationsAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload

      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      )
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const {
  updateCurrentNotifications,
  clearCurrentNotifications,
  addNotification
} = notificationsSlice.actions

// Selectors: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ redux ra ngoài sử dụng
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

// cái file này tên là notificationsSlice nhưng chúng ta sẽ export một thứ tên là reducer
// export default notificationsSlice.reducer
export const notificationsReducer = notificationsSlice.reducer
