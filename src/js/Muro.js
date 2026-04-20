import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../css/estilos.css';

function Muro({ usuario }) {
  const [posts, setPosts] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
    const cancelar = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(lista);
    });
    return () => cancelar();
  }, []);

  const publicar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    await addDoc(collection(db, 'posts'), {
      texto,
      autor: usuario.displayName || usuario.email,
      fecha: serverTimestamp()
    });
    setTexto('');
  };

  const cerrarSesion = () => {
    signOut(auth);
  };

  return (
    <>
      <header>
        <h1>Muro Interactivo</h1>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>
      <div className="contenedor">
        {usuario && (
          <div className="formulario">
            <form onSubmit={publicar}>
              <textarea
                placeholder="¿Qué estás pensando?"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
              />
              <button type="submit">Publicar</button>
            </form>
          </div>
        )}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h4>{post.autor}</h4>
            <p>{post.texto}</p>
            <span>
              {post.fecha?.toDate().toLocaleString('es-DO') || 'Ahora mismo'}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Muro;