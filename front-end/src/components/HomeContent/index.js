import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// Importando o AXIOS
import axios from "axios" // Biblioteca que permite consumir a API
// Importando os hooks useState e useEffect
import { useState, useEffect } from "react";
import EditContent from "../EditContent";


const HomeContent = () => {
  // Criando um estado para lista de jogos
  const [games, setGames] = useState([]); // Estado inicial array vazio

  // criando um estado para o jogo que sera alterado
  const [selectedGame, setSelectedGame] = useState(null)

  // Criando um estado para controlar o CARREGAMENTO
  const [loading, setLoading] = useState(true);

  // hook useEffect -> efeito colateral do componente
  useEffect(() => {
    // Aqui vai a lógica do useEffect
    // Função para buscar os jogos na API
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        console.log(response)
        // Passando a lista de jogos para o estado
        setGames(response.data.games)
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 3000); 
      }
    }
    // Invocando a função
    fetchGames();
  }, []) // dependência do useEffect

  // Função de exclusão
  // pega o id para conseguir saber qual jogo tem que ser deletado
  const deleteGame = async(gameId) => {
    try{
      const response = await axios.delete(`http://localhost:4000/games/${gameId}`); // -> ta pegando a variavel que tem o id e colocando no endpoint
      if(response.status === 204) // se retornar 204 significa que o jogo foi excluído com sucesso
        alert("O Jogo foi excluído com sucesso!")
        // Atualizando o estado removendo o jogo excluído
        // percorre a lista de jogos e quando ele achar um id que bata com o que foi deletado ele tira ele da lista
          setGames(games.filter((game) => game._id !== gameId))
    }catch(error){
      console.log(error);
    }
  }

  // Função para abrir o modal de edição
  const openEditModal = (game) => {
    // Atualizando o estado do jogo que será alterado
    setSelectedGame(game);
  }

  // Função para quando o modal for fechado
  const closeEditModal = () =>{
    // Limpando o estado do jogo selecionado
    setSelectedGame(null)
  }


  // função que atualiza a lista de jogos com o jogo alterado
  const handleUpdate = (updatedGame) =>{
    setGames(
      // cria um novo array com o jogo atualizado
      // ve se o id do jogo da lista é igual o id do jogo alterado ele atualiza o jogo
      games.map((game) => (game._id === updatedGame._id ? updatedGame : game))
    )
    closeEditModal();
  }

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>

          {loading ? ( <Loading loading={loading} />  
          ) : (    
              
          <div className={styles.games} id={styles.games}>
            {/* Lista de jogos irá aqui */}
            {/* Percorrendo a lista de jogos */}
            {games.map((game) => (
              <ul className={styles.listGames} key={game._id}>
                <div className={styles.gameImg}>
                  <img src="images/game_cd_cover.png" alt="Jogo em estoque" />
                </div>
                {/* Informações do jogo */}
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.descriptions.platform}</li>
                  <li>Gênero: {game.descriptions.genre}</li>
                  <li>Classificação: {game.descriptions.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>Preço: {game.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}</li>
                  {/* Botão de Deletar */}
                  <button className={styles.btnDel} onClick={() => {
                    // window.confirm -> pop up do js
                    const confirmacao = window.confirm(
                      "Deseja mesmo excluir o jogo?"
                    );
                    // se o valor for verdadeiro
                    if(confirmacao){
                      // invocar a função de deletar
                      deleteGame(game._id) // passa o id que a API devolve (MONGODB)
                    }
                  }}>
                    Deletar
                  </button>
                  {/* botão de editar */}
                  <button 
                    className={styles.btnEdit}
                    onClick={() => openEditModal(game)}
                  >
                    Editar
                  </button>
                </div>
              </ul>
            ))}
          </div>
          )}
        </div>
        {/* Renderização condicional para exibir o modal de edição */}
        {selectedGame && (
          <EditContent 
          // mandando como props para o editContent
            game={selectedGame}
            onClose={closeEditModal}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </>
  );
};

export default HomeContent;
