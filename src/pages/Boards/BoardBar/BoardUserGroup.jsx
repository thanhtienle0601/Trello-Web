import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardUserGroup({ boardUsers = [], limit = 5 }) {
  /**
   * Xử lý Popover để ẩn hoặc hiện toàn bộ user trên một cái popup, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Hiển thị giới hạn số lượng user theo số limit */}
      <Box
        sx={{
          display: 'flex',
          transform: 'translate(25%, 0)',
          zIndex: 0 // Để Avatar đầu tiên hiển thị trên cùng
        }}
      >
        {boardUsers.map((user, index) => {
          if (index < limit) {
            return (
              <Tooltip title={user?.displayName} key={index}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    cursor: 'pointer',
                    translate: index === 0 ? '0 0' : `${-25 * index}% 0`,
                    zIndex: `${index + 1}`
                  }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Tooltip>
            )
          }
        })}
      </Box>

      {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
      {boardUsers.length > limit && (
        <Tooltip title="Show more">
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be',
              zIndex: 1
            }}
          >
            +{boardUsers.length - limit}
          </Box>
        </Tooltip>
      )}

      {/* Khi Click vào +number ở trên thì sẽ mở popover hiện toàn bộ users, sẽ không limit nữa */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {boardUsers.map((user, index) => (
            <Tooltip title={user?.displayName} key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user?.displayName}
                src={user?.avatar}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default BoardUserGroup
