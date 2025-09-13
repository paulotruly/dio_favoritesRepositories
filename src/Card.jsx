
function Card({card, onRemove}) {

  if (!card) {
    return null
  }

  const titleLimit = 15;
  const characterLimit = 120;
  const tuncratedTitle = card.name && card.name.length > titleLimit ? `${card.name.substring(0, titleLimit)}...` : card.name;
  const tuncratedDescription = card.description && card.description.length > characterLimit ? `${card.description.substring(0, characterLimit)}...` : card.description;

  return (
    <div>
        <div className="flex flex-col p-5 w-[220px] h-[290px] rounded-md overflow-hidden bg-card border-2 border-cardborder text-white">
            <div className="flex-grow w-auto break-words">
              <img className="w-8 h-8 rounded-full mb-2 object-contain overflow-hidden" src={card.owner.avatar_url} alt="" />
              <h3 className="text-lg font-bold"> {tuncratedTitle} </h3>
              <p className="font-light text-sm"> {card.owner.login} </p>
              <p className="font-normal text-sm mt-2">{tuncratedDescription || 'Sem descrição.'}</p>
            </div>            
            <button
            onClick={() => onRemove(card.id)} 
            className="h-auto w-auto mt-5 self-end bg-card border-2 border-cardborder text-deletered px-3 py-1 rounded text-xs font-bold"
            >
            Delete
            </button>
        </div>   
    </div>
  )
}

export default Card
