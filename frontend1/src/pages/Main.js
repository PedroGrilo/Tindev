import React, { useEffect ,useState} from 'react';
import './Main.css';
import {Link} from 'react-router-dom'

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';


export default function Main({ match }) {

const [users,setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs',
                {
                    headers: {
                        user: match.params.id
                    }
                })
                setUsers(response.data);
            //console.log(response.data)
        }
        loadUsers();
    }, [match.params.id]);

async function handleLike(id){
    await api.post(`/devs/${id}/likes`,null,{headers:
        {user:match.params.id},
    });
    setUsers(users.filter(user=> user._id !== id))
}

async function handledisLike(id){
    await api.post(`/devs/${id}/dislikes`,null,{headers:
    {user:match.params.id},
});
setUsers(users.filter(user=> user._id !== id))
}

    return (
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="tindev" />
            </Link>
            <ul>
                {users.length > 0 ? (
                    users.map(user=>(
                        <li key={user._id}>
                        <img src={user.avatar} alt={user.name}></img>
                        <footer>
                            <strong>
                                {user.name}
                            </strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick ={() => handledisLike(user._id)}>
                                <img src={dislike} alt="Dislike">
                                </img>
                            </button>
                            <button type="button" onClick ={() => handleLike(user._id)} >
                                <img src={like} alt="Like">
                                </img>
                            </button>
                        </div>
                    </li>
                    ))
                ) : <div className="empty">Não há mais pessoas :( </div> }
                
            
            </ul>
        </div>

    );
}