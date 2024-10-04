import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis/index'
import { useEffect, useState } from 'react'

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '66fbccd45370a6270fe3467a'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default Board
