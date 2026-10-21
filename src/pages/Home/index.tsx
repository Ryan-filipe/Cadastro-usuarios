import { useEffect, useState, useRef } from 'react';
import './style.css';
import Lixo from '../../assets/Trash2.svg';
import api from '../../services/api';

type User = {
  _id: string;
  nome: string;
  email: string;
  idade: number;
};

function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  async function getUsers() {
    try {
      const response = await api.get<User[]>('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);


  async function deleteUsers(id: string) {
    try {
      await api.delete(`/usuarios/${id}`);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Não foi possível excluir o usuário.');
    }
  }


  async function createUser() {
    const nome = inputName.current?.value.trim();
    const email = inputEmail.current?.value.trim();
    const idadeTexto = inputAge.current?.value;

    if (!nome || !email || !idadeTexto) {
      alert('Preencha todos os campos.');
      return;
    }

    const idade = Number(idadeTexto);

    if (!Number.isFinite(idade) || idade < 0) {
      alert('Digite uma idade válida.');
      return;
    }

    try {
      await api.post('/usuarios', {
        nome,
        email,
        idade,
      });

      await getUsers();

      if (inputName.current) inputName.current.value = '';
      if (inputAge.current) inputAge.current.value = '';
      if (inputEmail.current) inputEmail.current.value = '';
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Não foi possível cadastrar. Verifique os dados e tente novamente.');
    }
  }

  return (
    <div className="container">
      <form onSubmit={(event) => event.preventDefault()}>
        <h1>Cadastro</h1>

        <input
          placeholder="Nome"
          name="nome"
          type="text"
          ref={inputName}
        />

        <input
          placeholder="Idade"
          name="idade"
          type="number"
          min="0"
          ref={inputAge}
        />

        <input
          placeholder="Email"
          name="email"
          type="email"
          ref={inputEmail}
        />

        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user._id} className="card">
          <div>
            <p>
              Nome: <span>{user.nome}</span>
            </p>

            <p>
              Idade: <span>{user.idade}</span>
            </p>

            <p>
              Email: <span>{user.email}</span>
            </p>

            <div>
              <button
                type="button"
                onClick={() => deleteUsers(user._id)}
                aria-label={`Excluir ${user.nome}`}
              >
                <img src={Lixo} alt="Excluir usuário" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
