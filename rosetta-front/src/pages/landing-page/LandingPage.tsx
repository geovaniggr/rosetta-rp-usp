import {
  Topbar,
  Container,
  Image,
  Banner,
  Button,
} from "./../../components/index";

import { Dialog } from '@headlessui/react';

import imgLandingPage0 from "./../../assets/images/land_page_community.svg";

import imgLandingPagePessoa0 from "./../../assets/images/land_page_pessoa0.png";
import imgLandingPagePessoa1 from "./../../assets/images/land_page_pessoa1.png";
import imgLandingPagePessoa2 from "./../../assets/images/land_page_pessoa2.png";

import { MdTranslate, MdTrendingUp, MdOutlineFactCheck } from "react-icons/md";
import { ChangeEvent, useContext, useState } from "react";
import { Input } from "../../components/common/input/Input";

import {
  useNavigate
} from 'react-router-dom'

export default function LandingPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isOpen, setIsOpen] = useState(false)

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    const body = { email, password }
    fetch("http://localhost:3000/api/auth/login", { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.error !== undefined) {
          return alert("Usuário ou Senha Incorretas")
        }

        localStorage.setItem("token", response.token)
        return navigate("/perfil")
      })
  }

  const itemsList = [
    {
      title: "Solicite traduções",
      icon: MdTranslate,
    },
    {
      title: "Treine seu idioma",
      icon: MdTrendingUp,
    },
    {
      title: "Realize projetos",
      icon: MdOutlineFactCheck,
    },
  ];

  const imgsList = [
    imgLandingPagePessoa0,
    imgLandingPagePessoa1,
    imgLandingPagePessoa2,
  ];

  return (
    <Container>
      <Topbar nonAuth
        handleLogin={() => setIsOpen(true)}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-secondary-500 p-8 text-white">
            <Dialog.Title className="text-3xl font-bold text-center uppercase mb-8">Bem Vindo Novamente</Dialog.Title>
            <Dialog.Description className="flex flex-col items-center gap-4">
              <Input
                name="email"
                id="email"
                type="text"
                placeholder="Digite seu email"
                inputClassName="text-black w-full"
                containerClassName="w-full"
                value={email}
                onChange={handleChangeEmail}
              />
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Digite sua senha"
                containerClassName="w-full"
                inputClassName="text-black w-full"
                onChange={handleChangePassword}
              />
              <Button
                className="bg-primary-500 text-lg font-bold"
                fullWidth={true}
                onClick={handleLogin}>
                Entrar
              </Button>
              <Container className="text-center">
                <a href="/forgot" className="block text-white text-sm">Esqueceu sua senha?</a>
                <a href="/forgot" className="text-white text-sm mt-4">Criar conta?</a>
              </Container>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Container className="flex items-center h-full w-full max-w-7xl mx-auto">
        <Container className="flex  w-full ml-40 pt-16">
          <Container>
            <h1 className="flex items-left text-3xl font-bold text-gray-700 w-80">
              Entre na comunidade de tradutores online
            </h1>
            <p className="text-gray-600 mx-0 w-60 ml-8 pt-4">
              Entre em uma plataforma livre e compartilhe traduções fluentes nas
              mais diversas línguas.
            </p>
          </Container>

          <Image
            src={imgLandingPage0}
            alt="landing-page-img0"
            className="h-76 w-4/12 mr-40"
          />
        </Container>
      </Container>

      <Banner itemsList={itemsList} />

      <Container className="flex items-center h-full w-full max-w-7xl mx-auto">
        <Container className="flex  w-full ml-40 pt-16 mr-40">
          <Container>
            <h1 className="flex items-left text-3xl font-bold text-gray-700 w-80">
              Escreva textos com
            </h1>
            <span className="flex items-left text-3xl font-bold text-white w-80 bg-default">
              Coesão e coerência
            </span>
            <h1 className="flex items-left text-3xl font-bold text-gray-700 w-80">
              nativa
            </h1>
          </Container>

          <Container className="flex flex-col h-full">
            <Container className="flex items-center justify-center w-full mr-40">
              {imgsList.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="landing-page-img0"
                  className="h-40 w-80 ml-8 mr-8"
                />
              ))}
            </Container>

            <Button
              append="self-center w-60 mt-8 mb-8"
              className="bg-secundary bg-secundary-hover"
              onClick={() => console.log("Clicou em ver tradutores")}
            >
              Ver tradutores
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
