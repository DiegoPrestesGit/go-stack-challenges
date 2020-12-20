import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    })
  }, [])

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      title: `Repositorio do dia ${Date.now()}`,
      url: "dele",
      techs: ["dale", "doly"]
    })

    setRepositories([...repositories, resp.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
