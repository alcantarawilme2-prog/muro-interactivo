import React, { useState, useEffect } from 'react';
import { auth } from './js/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './js/Auth';
import Muro from './js/Muro';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => cancelar();
  }, []);

  if (cargando) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Cargando...</p>;

  return (
    <div>
      {usuario ? <Muro usuario={usuario} /> : <Auth />}
    </div>
  );
}

export default App;