/* eslint-disable react/jsx-no-comment-textnodes */
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
// import { mockData } from '~/apis/mock-data'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardDifferenceColumnsAPI
} from '~/apis/index'
import { useEffect } from 'react'
import { cloneDeep } from 'lodash'

import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'

const Board = () => {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const activeCard = useSelector(selectCurrentActiveCard)

  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '66fbccd45370a6270fe3467a'
    // fetchBoardDetailsAPI(boardId).then((board) => {
    //   board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
    //   board.columns.forEach((column) => {
    //     if (isEmpty(column.cards)) {
    //       column.cards = [generatePlaceHolderCard(column)]
    //       column.cardOrderIds = [generatePlaceHolderCard(column)._id]
    //     } else {
    //       column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    //     }
    //   })

    //   setBoard(board)
    // })
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

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
    // Trường hợp này do nested object cards nằm sâu trong column nên phải dùng deep copy
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

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
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

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

  if (!board) {
    return <LoadingSpinner caption={'Loading board'} />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {activeCard && <ActiveCard />}
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        //
        // createNewColumn={createNewColumn}
        // createNewCard={createNewCard}
        // deleteColumn={deleteColumn}
        //
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardDifferenceColumns={moveCardDifferenceColumns}
      />
    </Container>
  )
}

export default Board
