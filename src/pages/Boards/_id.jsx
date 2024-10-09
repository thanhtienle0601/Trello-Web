import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import {
  createCardAPI,
  createColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardAPI
} from '~/apis/index'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '~/utils/formatters'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '66fbccd45370a6270fe3467a'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (columnData) => {
    const createdColumn = await createColumnAPI({
      ...columnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (cardData) => {
    const createdCard = await createCardAPI({
      ...cardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    await updateBoardAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
