import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Usa requestAnimationFrame para evitar forced reflow
    requestAnimationFrame(() => {
      // Se houver uma âncora (#section), rolar para ela
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Usa scrollIntoView nativo com comportamento suave
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      } else {
        // Caso contrário, rolar para o topo instantaneamente
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
    });
  }, [pathname, hash]);

  return null;
}

