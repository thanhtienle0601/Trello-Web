import { Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
// import { mockData } from '~/apis/mock-data'
import {
  createCardAPI,
  createColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardDifferenceColumnsAPI,
  deleteColumnDetailsAPI
} from '~/apis/index'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sort'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '66fbccd45370a6270fe3467a'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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
      if (columnToUpdate.cards.some((card) => card.FE_placeHolderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  const moveCardsInSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // update board state
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Update to database
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds
    })
  }

  const moveCardDifferenceColumns = (
    currentCardId,
    oldColumnId,
    newColumnId,
    dndOrderedColumns
  ) => {
    // Update board state
    const newBoard = { ...board }
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)
    // Update database

    let oldColumnCardOrderIds = dndOrderedColumns.find(
      (col) => col._id === oldColumnId
    )?.cardOrderIds
    if (oldColumnCardOrderIds[0].includes('placeholder-card'))
      oldColumnCardOrderIds = []

    moveCardDifferenceColumnsAPI({
      currentCardId,
      oldColumnId,
      oldColumnCardOrderIds,
      newColumnId,
      newColumnCardOrderIds: dndOrderedColumns.find(
        (col) => col._id === newColumnId
      )?.cardOrderIds
    })
  }

  const deleteColumn = (columnId) => {
    // Update board state
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(
      (column) => column._id !== columnId
    )
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    )
    setBoard(newBoard)
    // Call api to delete column and cards
    deleteColumnDetailsAPI(columnId).then((res) => {
      if (res.status === 'success') {
        toast.success(res.message)
        // updateBoardDetailsAPI(newBoard._id, {
        //   columnOrderIds: newBoard.columnOrderIds.filter(
        //     (_id) => _id !== columnId
        //   )
        // })
      }
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          gap: 2,
          width: '100vh',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading board...</Typography>
      </Box>
    )
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
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardDifferenceColumns={moveCardDifferenceColumns}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
