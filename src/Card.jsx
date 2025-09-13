
function Card({card}) {

  if (!card) {
    return null
  }

  return (
    <div>
        <div className="flex flex-col p-6 w-auto h-[200px] rounded-md bg-yellow-300">
            <h3 className="text-lg font-bold"> Repository title </h3>
            <p className="font-light text-md"> Owner username </p>
                        
            <button className="h-auto w-auto mt-auto self-end bg-red-900 text-white px-3 py-1 rounded text-xs"> REMOVE </button>
        </div>   
    </div>
  )
}

export default Card
