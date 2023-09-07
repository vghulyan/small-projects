import { render } from '@testing-library/react'

import { App } from './app'

describe('App', () => {
  it('Should have text in document', () => {
    // A really simple example worthless test!
    const screen = render(<App />)
    expect(screen.getByText('Please wait while we fetch the data from the WebSocket')).toBeInTheDocument()
  })
})
