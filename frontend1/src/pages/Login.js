import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from "../services/api";

export default function Login({history}) {

    const [username,setUsername] = useState('');

    async function handlerSubmit(e){
        e.preventDefault();
        
        const response = await  api.post('/devs',{
            username,
        });
        const {_id} = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handlerSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                 placeholder="Digite o nome do GitHub"
                 value={username}
                 onChange={e => setUsername(e.target.value)}></input>
                <button type="submit">Seguinte</button>
            </form>
        </div>
    );
}