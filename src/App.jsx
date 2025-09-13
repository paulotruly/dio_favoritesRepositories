import { useEffect, useState} from "react"
import GitHub from "./assets/GitHub"
import Card from "./Card"
import Search from "./assets/Search"

function App() {

  // COISAS PRA ADICIONAR: NÃO PODER ADICIONAR REPOSITORIO DUPLICADO, HOVER, SOMBRAS, CADA CARD LINKADO COM O LINK E HOVER TAMBÉM

  // valor atual     definir novo valor
  const [linkValue, setlinkValue] = useState('');
  const [cards, setCards] = useState([]);

  // aqui ele guarda os cards salvos quando recarregar a aplicaçãp
  useEffect(() => {
    const savedCards = localStorage.getItem("cards")
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])
  // roda 1 vez quando o componente monta pela primeira vez
  
  // aqui ele salva o card toda vez que a lista de cards passa por mudanças
  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem("cards", JSON.stringify(cards))
  }
  }, [cards])
  // roda toda vez que cards mudar

  async function handleSubmit(event) {
    event.preventDefault()

    const fullLink = linkValue.split('/')
    const ownerName = fullLink[fullLink.length - 2]
    const repoName = fullLink[fullLink.length - 1]
    const ownerAndRepo = `${ownerName}/${repoName}`

    try{
      const apiUrl = `https://api.github.com/repos/${ownerAndRepo}`
      // faz a requisição da API e espera a resposta
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error('Repositório não encontrado!')
      }
      
      // converte o objeto para JSON
      const data = await response.json()
      console.log(data)
      setCards(prevCards => [...prevCards, data])
      setlinkValue('');

    } catch (error) {
      console.log("Ocorreu um erro: ", error)
    }
  }

  function removeCard(id) {
    // cria uma lista que exclui o card com o id correspondente
    //                               arrow function verifica se o id do card é diferente de uma variável id
    const updateCards = cards.filter(card => card.id !== id)
    setCards(updateCards)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white">

      <div className="flex flex-col items-center w-1/2 h-auto m-10 p-10 rounded-lg bg-container">
        
        <GitHub> </GitHub>
        <h1 className="text-lg font-extrabold m-5"> My favorite GitHub repositories </h1>

        <form className="flex flex-row items-center" onSubmit={handleSubmit}>
          <label className="text-md" htmlFor=""> <Search color="fill-cardborder"> </Search> </label>
          <input className="ml-3 rounded-[20px] w-auto p-3 text-cardborder border-2 border-cardborder bg-background"
                 type="text"
                 placeholder="Paste the repository link"
                 value={linkValue}
                //  serve pra enquanto o usuário digita ele salva automaticamente no value antes do botão ser disparado
                 onChange={e => setlinkValue(e.target.value)}
                 />
          <button className="bg-bluebutton rounded-[20px] ml-3 p-3 text-sm px-5" type="submit"> Send </button>
        </form>

        <div className="grid grid-cols-3 gap-5 m-10 w-full">
          {cards.map((card, index) =>
            <Card key={index} card={card} onRemove={removeCard}> </Card>
          )}
        </div>
        
      </div>

    </div>
  )
}

export default App