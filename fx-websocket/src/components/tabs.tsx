import { useState, useEffect } from 'react'
import { useFXData } from '../context/contextHooks'
import DateObject from './DateObject'
import crossIcon from '../assets/cross.svg'

type TabOption = 'Passed' | 'Failed'

type Notification = {
  message: string
  date: number
}

interface TabsProps {
  setHasMessages: React.Dispatch<React.SetStateAction<boolean>>
  setHasFailedMessages: React.Dispatch<React.SetStateAction<boolean>>
}

export const Tabs = ({ setHasMessages, setHasFailedMessages }: TabsProps) => {
  const [state] = useFXData()
  const [selectedTab, setSelectedTab] = useState<TabOption>('Passed')
  const [passedNotifications, setPassedNotifications] = useState<Notification[]>([])
  const [failedNotifications, setFailedNotifications] = useState<Notification[]>([])

  const resetPassed = () => {
    setPassedNotifications([])
  }

  const resetFailed = () => {
    setFailedNotifications([])
  }

  const checkConditions = () => {
    const tempPassedNotifications: Notification[] = []
    const tempFailedNotifications: Notification[] = []

    const gbpUsdValue = state['GBPUSD']
    const eurUsdValue = state['EURUSD']

    const usdJpyValue = state['USDJPY']

    if (gbpUsdValue !== undefined && eurUsdValue !== undefined) {
      if (gbpUsdValue > eurUsdValue) {
        // Condition passed: GBPUSD is greater than EURUSD
        tempPassedNotifications.push({
          message: `GBPUSD (${gbpUsdValue}) is greater than EURUSD (${eurUsdValue})`,
          date: Date.now(),
        })
      } else {
        // Condition failed: GBPUSD is not greater than EURUSD
        tempFailedNotifications.push({
          message: `GBPUSD (${gbpUsdValue}) is not greater than EURUSD (${eurUsdValue})`,
          date: Date.now(),
        })
      }
    }

    if (gbpUsdValue !== undefined && usdJpyValue !== undefined) {
      if (gbpUsdValue > usdJpyValue) {
        // Condition passed: GBPUSD is greater than USDJPY
        tempPassedNotifications.push({
          message: `GBPUSD (${gbpUsdValue}) is greater than USDJPY (${usdJpyValue})`,
          date: Date.now(),
        })
      } else {
        // Condition failed: GBPUSD is not greater than USDJPY
        tempFailedNotifications.push({
          message: `GBPUSD (${gbpUsdValue}) is not greater than USDJPY (${usdJpyValue})`,
          date: Date.now(),
        })
      }
    }
    // More logic can go here

    if (tempPassedNotifications.length > 0) {
      setPassedNotifications((prev) => [...prev, ...tempPassedNotifications])
    }
    if (tempFailedNotifications.length > 0) {
      setFailedNotifications((prev) => [...prev, ...tempFailedNotifications])
    }
  }

  useEffect(() => {
    checkConditions()
  }, [state])

  useEffect(() => {
    if (passedNotifications.length > 0 || failedNotifications.length > 0) {
      setHasMessages(true)
    }

    if (failedNotifications.length > 0) {
      setHasFailedMessages(true)
    }
  }, [passedNotifications, failedNotifications])

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-200 ml-14 h-full p-12 rounded-l-lg overflow-y-auto">
      <div className="flex space-x-4 mb-4">
        <div
          onClick={() => setSelectedTab('Passed')}
          className={`flex items-center tab ${selectedTab === 'Passed' ? 'tab-active' : ''}`}
        >
          <span>Passed</span>
          {passedNotifications.length > 0 && (
            <div className="flex items-center ml-2">
              <span>({passedNotifications.length})</span>
              <img src={crossIcon} alt="Reset" onClick={resetPassed} className="ml-2 cursor-pointer" />
            </div>
          )}
        </div>
        <div
          onClick={() => setSelectedTab('Failed')}
          className={`flex items-center tab ${selectedTab === 'Failed' ? 'tab-active' : ''}`}
        >
          <span>Failed</span>
          {failedNotifications.length > 0 && (
            <div className="flex items-center ml-2">
              <span>({failedNotifications.length})</span>
              <img src={crossIcon} alt="Reset" onClick={resetFailed} className="ml-2 cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 overflow-y-auto h-[80%]">
        {' '}
        {selectedTab === 'Passed' ? (
          <div>
            {passedNotifications.length === 0 ? (
              <p>No passed expressions to display.</p>
            ) : (
              passedNotifications.map((note, index) => (
                <p key={index}>
                  {note.message} <DateObject />
                </p>
              ))
            )}
          </div>
        ) : (
          <div>
            {failedNotifications.length === 0 ? (
              <p>No failed expressions to display.</p>
            ) : (
              failedNotifications.map((note, index) => (
                <p key={index}>
                  {note.message} <DateObject />
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
