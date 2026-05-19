import axios from "axios";

// função que coleta o token no localStorage
export const getAxiosConfig = () => ({
    headers: {
        // verificando se esse cabeçalho ta vindo de uma requisição feita no navegador
        Authorization: `Bearer ${ typeof window !== "undefined" ? (localStorage.getItem ("token") ?? "") : "" }`,
    }
});

// Função para realizar o login
// precisa pegar o token que a API retorna para o usuario
// para a API verificar se o usuario foi autenticado
// o token fica armazenado na url do site

export const login = async (email, password) => {
    try{
        const response = await axios.post("http://localhost:4000/auth", {
            email,
            password
        })
        // após o login a API retorna o token
        // coletando o token
        // todo o retorno da API fica no {response}
        const token = response.data.token
        // localstorage -> onde fica armazenado as coisas no navegador
        // armazenando token no localStorage do navegador
        localStorage.setItem("token", token)
        return {success: true}

    } catch(error) {
        return {success: false, message: error.message}
        // se der erro vai retornar um objeto
    }
}