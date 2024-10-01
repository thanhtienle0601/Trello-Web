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
    const boardId = '66fa2929cc6d6f02d0956a0d'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
