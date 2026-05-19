import styles from "@/components/LoginContent/LoginContent.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "@/services/authService";

const LoginContent = () => {
  const router = useRouter();
  // criando os estados do email e da senha
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    // Aqui irá a autenticação
    const result = await login(email,password)
    // Verificando se o login foi bem sucedido
    if(result.success){
      alert("Login realizado com sucesso!")
      // só direciona para a Home se o login for realizado com sucesso
      router.push("/home");
    } else{
      alert("Falha ao realizar o Login. Tente Novamente!")
    }
  };

  return (
    <div className={styles.loginContent}>
      {/* LOGO */}
      <div className={styles.logo}>
        <img
          src="/images/thegames_logo.png"
          className={styles.logoImg}
          alt="The Games"
        />
      </div>
      {/* LOGIN CARD */}
      <div className={styles.loginCard}>
        {/* LOGIN CARD HEADER */}
        <div className={styles.loginCardHeader}>
          <h3>Faça seu login:</h3>
        </div>
        {/* LOGIN CARD BODY */}
        <div className={styles.loginCardBody}>
          <form className="formPrimary" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              className={`${styles.input} ${"inputPrimary"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              className={`${styles.input} ${"inputPrimary"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={`${styles.input} ${"btnPrimary"}`}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
