import { useEffect, useState } from 'react'
import Nav from '../components/nav'
import { Tabs } from '../components/tabs'
import { FXDataProvider } from '../context/FXDataContext'
import { useFXData } from '../context/contextHooks'

const AppContent = () => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [_, dispatch] = useFXData()

  const [hasMessages, setHasMessages] = useState<boolean>(false)
  const [hasFailedMessages, setHasFailedMessages] = useState<boolean>(false)

  useEffect(() => {
    // Initialize WebSocket
    const websocket = new WebSocket('wss://fxspot.exercise.validus-technology.com/?token=1N5FpM5Xp6FFyqomOOEZ9fuY')

    websocket.onopen = () => {
      console.log('WebSocket is connected')
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch({ type: 'UPDATE_DATA', payload: data })
    }

    websocket.onerror = (error) => {
      console.error('WebSocket Error: ', error)
    }

    websocket.onclose = () => {
      console.log('WebSocket is closed')
    }

    setWs(websocket)
    // Clean up the WebSocket when the component is unmounted
    return () => {
      websocket.close()
    }
  }, [dispatch])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr from-sky-300 to-violet-700">
      <Nav hasFailedMessages={hasFailedMessages} />
      <div className="flex flex-1 overflow-y-auto p-8">
        <div className="w-1/4 mr-4">
          <h1 className="text-2xl font-extrabold text-white">
            {!hasMessages
              ? 'Please wait while we fetch the data from the WebSocket'
              : 'Our super awesome real-time expression parser, with some super awesome gradients.'}
          </h1>
        </div>
        <div className="w-3/4">
          <Tabs setHasMessages={setHasMessages} setHasFailedMessages={setHasFailedMessages} />
        </div>
      </div>
    </div>
  )
}

export const App = () => (
  <FXDataProvider>
    <AppContent />
  </FXDataProvider>
)
