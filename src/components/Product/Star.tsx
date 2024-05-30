import {Dispatch, SetStateAction} from 'react'

type StarProps={
    val:number;
    setRating:Dispatch<SetStateAction<number>>
}

function Star({val, setRating}:StarProps) {
  return (
    <div>Star</div>
  )
}

export default Star