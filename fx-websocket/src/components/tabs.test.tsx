import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Tabs } from '../components/tabs' // adjust the import to your file structure
import { FXDataProvider } from '../context/FXDataContext'

jest.mock('../context/contextHooks', () => ({
  useFXData: jest.fn().mockReturnValue([{ GBPUSD: 1.3, EURUSD: 1.2, USDJPY: 1.1 }, jest.fn()]),
}))

describe('Tabs Component', () => {
  it('should correctly render the passed and failed notifications based on the context data', () => {
    const setHasMessages = jest.fn()
    const setHasFailedMessages = jest.fn()

    const { getByText } = render(
      <FXDataProvider>
        <Tabs setHasMessages={setHasMessages} setHasFailedMessages={setHasFailedMessages} />
      </FXDataProvider>,
    )

    expect(getByText('GBPUSD (1.3) is greater than EURUSD (1.2)')).toBeInTheDocument()
    expect(getByText('GBPUSD (1.3) is greater than USDJPY (1.1)')).toBeInTheDocument()
  })

  it('should correctly handle the "Reset" functionality for passed and failed notifications', () => {
    const setHasMessages = jest.fn()
    const setHasFailedMessages = jest.fn()

    const { getByText, queryByText } = render(
      <FXDataProvider>
        <Tabs setHasMessages={setHasMessages} setHasFailedMessages={setHasFailedMessages} />
      </FXDataProvider>,
    )

    fireEvent.click(getByText('(2)')) // Click on the reset button for passed notifications
    expect(queryByText('GBPUSD (1.3) is greater than EURUSD (1.2)')).not.toBeInTheDocument()
    expect(queryByText('GBPUSD (1.3) is greater than USDJPY (1.1)')).not.toBeInTheDocument()
  })
})

// import { render, fireEvent } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import { Tabs } from './tabs'
// import { App } from '../pages/app'

// describe('App Component', () => {
//   it('should display the initial message', () => {
//     const { getByText } = render(<App />)
//     expect(getByText('Please wait while we fetch the data from the WebSocket')).toBeInTheDocument()
//   })

//   it('should display the new message when hasMessages becomes true', () => {
//     const { getByText } = render(<App />)
//     fireEvent.click(getByText('Mock Tabs')) // This will call setHasMessages(true)
//     expect(
//       getByText('Our super awesome real-time expression parser, with some super awesome gradients.'),
//     ).toBeInTheDocument()
//   })
// })
