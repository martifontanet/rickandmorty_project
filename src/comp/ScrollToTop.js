import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function ScrollToTop() {
  const history = useHistory();

  useEffect(() => {
    // Establecemos un listener para las actualizaciones de historial (cambio de ruta)
    const unlisten = history.listen(() => {
      // Cuando detectamos un cambio en la ruta, desplaza la ventana hacia la parte superior
      window.scrollTo(0, 0);
    });

    // Limpiamos el listener cuando el componente se desmonta o cuando cambia la ruta
    return () => {
      unlisten();
    };
  }, [history]);

  return null; //no renderizamos
}