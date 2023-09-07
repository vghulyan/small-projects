import React from 'react'

type DateObjectProps = {
  dt?: number
  localString?: string
}

const DateObject: React.FC<DateObjectProps> = ({ dt = Date.now(), localString = 'en-GB' }) => {
  const dateObject = new Date(dt).toLocaleString(localString, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return <span className="font-bold text-black">{dateObject}</span>
}

export default DateObject
