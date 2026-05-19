import styles from "@/components/CreateContent/CreateContent.module.css";
import { useState } from "react";
import {useRouter} from "next/router";
import axios from "axios";

const CreateContent = () => {
  const router = useRouter();

  // estado para armazenar os dados cadastrados
  const [title, setTitle] = useState("")
  const [platform, setPlatform] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [year, setYear] = useState("")
  const [price, setPrice] = useState("")

  // função para cadastrar um jogo
  const handleSubmit = async (event) => {
    // abortando o recarregamento da página ao enviar o formulário
    event.preventDefault();

    // verificando se todos os campos foram preenchidos
    if(title && platform && genre && rating && year && price !== ""){
      try{
        // criando um json(OBJETO) com as informações do jogo
        const game = {
          title: title,
          year: year,
          price: price,
          descriptions: {
            platform: platform,
            genre: genre,
            rating: rating
          }
        }

        // cadastrando a API
        // o game no final é o json que a API vai receber para cadastrar o jogo
        const response = await axios.post("http://localhost:4000/games", game)
        // verificando o retorno da API
        if (response.status === 201){
          alert("Jogo cadastrado com sucesso!")
          router.push("/home")
        }
        else{
          alert("Ocorreu um erro ao cadastrar o jogo.")
        }
      }catch(error){
        console.log(error)
      }
    }else{
      alert("Por Favor, preencha todos os campos!")
    }

  }

  return (
    <div className={styles.createContent}>
      <div className="title">
        <h2>Cadastrar novo jogo</h2>
      </div>
      <form id="createForm" className="formPrimary" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Insira o título do jogo"
          className="inputPrimary"
          value={title}
          // onChange percebe quando tem uma mudança no valor da Input
          // e.target.value -> puxa o valor da input e armazena esse valor na variavel criada
          // atualizando o estado com o valor digitado na input
          onChange={(e) => setTitle(e.target.value)}

        />
        <input
          type="text"
          name="platform"
          id="platform"
          placeholder="Insira a plataforma do jogo"
          className="inputPrimary"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
         <input
          type="text"
          name="genre"
          id="genre"
          placeholder="Insira o gênero do jogo"
          className="inputPrimary"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
         <input
          type="text"
          name="rating"
          id="rating"
          placeholder="Insira a classificação do jogo"
          className="inputPrimary"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="number"
          name="year"
          id="year"
          placeholder="Insira o ano do jogo"
          className="inputPrimary"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Insira o preço do jogo"
          className="inputPrimary"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="submit"
          value="Cadastrar"
          id="createBtn"
          className="btnPrimary"
        />
      </form>
    </div>
  );
};

export default CreateContent;
