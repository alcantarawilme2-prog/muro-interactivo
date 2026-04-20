import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import '../css/estilos.css';

function Auth() {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (esRegistro) {
        const resultado = await createUserWithEmailAndPassword(auth, usuario, clave);
        await updateProfile(resultado.user, {
          displayName: `${nombre} ${apellido}`
        });
      } else {
        await signInWithEmailAndPassword(auth, usuario, clave);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio}>
        {esRegistro && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">
          {esRegistro ? 'Registrarse' : 'Entrar'}
        </button>
      </form>
      <p onClick={() => setEsRegistro(!esRegistro)}>
        {esRegistro ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
        <span>{esRegistro ? 'Inicia sesión' : 'Regístrate'}</span>
      </p>
    </div>
  );
}

export default Auth;