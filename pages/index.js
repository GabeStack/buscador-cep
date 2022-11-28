import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './api/api';
import styles from './index.module.css';

export default function index() {
  const[input, setInput] = useState('')
  const [Cep, setCep] = useState({});
  const handleSearch =async () =>{
    if(input === ''){
      alert('Preenchar algum cep!')
      return;
    }
    try{

      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    }catch{
      alert('Ops erro ao buscar o cep');
      setInput('')
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>buscador CEP</h1>
      <div className={styles.containerInput}>
        <input type="text" placeholder="Digite seu cep..." 
        value={input}
        onChange={(event)=> setInput(event.target.value)}
        />
        <button className={styles.buttonSearch}  onClick={handleSearch}>
          <FiSearch  
          size={25} color='#fff'/></button>
      </div>
      {Object.keys(Cep).length > 0 && (
      <main className={styles.main}>
        <h2>CEP: {Cep.cep}</h2>

        <span>Rua: {Cep.logradouro}</span>
        <span>complemento: {Cep.complemento}</span>
        <span>Bairro: {Cep.bairro}</span>
        <span>Cidade: {Cep.localidade} - {Cep.uf}</span>
      </main>
      ) }
    </div>
  );
}