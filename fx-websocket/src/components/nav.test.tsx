import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Nav from './nav'

describe('Nav Component', () => {
  it('should not display bell icon when there are no failed messages', () => {
    const { queryByTitle } = render(<Nav hasFailedMessages={false} />)
    expect(queryByTitle('You have failed notifications')).not.toBeInTheDocument()
  })

  it('should display bell icon when there are failed messages', () => {
    const { getByTitle } = render(<Nav hasFailedMessages={true} />)
    expect(getByTitle('You have failed notifications')).toBeInTheDocument()
  })
})
