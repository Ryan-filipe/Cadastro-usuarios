import './style.css'
import Lixo from '../../assets/Trash.svg'

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
};
function Home() {

  const users: User[] = [
    {
      id: '01',
      name: 'RyanDev',
      age: 22,
      email: 'Ryanfiliperocha@gmail.com',
    },
    {
      id: '02',
      name: 'AGAINDev',
      age: 777,
      email: 'AGAINDEV777@gmail.com',
    },
  ]

  return (
    <div className="container">
      <form>
        <h1>Cadastro</h1>
        <input placeholder="Nome" name="Nome" type="text" />
        <input placeholder="Idade" name="Idade" type="number"/>
        <input placeholder="Email" name="Email" type="email" />
        <button type='button'>Cadastrar</button>
      </form>
      {users.map(user => (
        <div key={user.id}>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
            <div>
              <button>
                <img src={Lixo} />
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Home
