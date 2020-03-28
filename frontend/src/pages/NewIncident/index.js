import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api'

import './style.css';

import logoImg from '../../assets/logo.svg';


export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescript] = useState();
  const [value, setValue] = useState();

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', data, {
        headers:{
          Authorization: ongId,
        }
      })
      console.log(data);
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar um caso, tente novamente');
    }
  }

  return (
    <div className="register-container"> 
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
        
          <h1>Cadastrar novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resilver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02441"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescript(e.target.value)}
          />
    
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}