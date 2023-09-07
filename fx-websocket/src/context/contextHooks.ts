import { useContext } from 'react'
import { FXDataContext } from './FXDataContext'

export const useFXData = () => {
  const context = useContext(FXDataContext)
  if (!context) {
    throw new Error('useFXData must be used within a FXDataProvider')
  }
  return context
}
