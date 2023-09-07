import React, { createContext, useReducer } from 'react'

type FXDataState = {
  [ticker: string]: number
}

const initialState: FXDataState = {}

export const FXDataContext = createContext<[FXDataState, React.Dispatch<FXDataAction>] | undefined>(undefined)

type FXDataAction = {
  type: string
  payload: {
    ticks: { ticker: string; value: number }[]
  }
}

const fxDataReducer = (state: FXDataState, action: FXDataAction): FXDataState => {
  switch (action.type) {
    case 'UPDATE_DATA': {
      const newTicks = action.payload.ticks.reduce(
        (acc, { ticker, value }) => {
          acc[ticker] = value
          return acc
        },
        { ...state },
      )

      return newTicks
    }

    default:
      return state
  }
}

type FXDataProviderProps = {
  children: React.ReactNode
}

export const FXDataProvider: React.FC<FXDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(fxDataReducer, initialState)
  return <FXDataContext.Provider value={[state, dispatch]}>{children}</FXDataContext.Provider>
}
