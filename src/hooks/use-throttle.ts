import { useCallback, useRef } from 'react';

/**
 * Hook para throttle de funções usando requestAnimationFrame
 * Previne forced reflow ao limitar execuções de funções
 * 
 * @param callback - Função a ser executada com throttle
 * @returns Função com throttle aplicado
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T
): T {
  const rafRef = useRef<number | null>(null);
  const lastArgs = useRef<any[]>([]);

  const throttled = useCallback(
    (...args: any[]) => {
      lastArgs.current = args;
      
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          callback(...lastArgs.current);
          rafRef.current = null;
        });
      }
    },
    [callback]
  );

  return throttled as T;
}

/**
 * Hook para debounce de funções
 * Útil para eventos que disparam muito frequentemente
 * 
 * @param callback - Função a ser executada com debounce
 * @param delay - Delay em milissegundos (padrão: 300ms)
 * @returns Função com debounce aplicado
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounced as T;
}

/**
 * Hook para cachear DOMRect e evitar múltiplas chamadas de getBoundingClientRect
 * 
 * @param ref - Referência ao elemento DOM
 * @returns DOMRect cacheado e função para atualizar
 */
export function useCachedRect<T extends HTMLElement>() {
  const rectRef = useRef<DOMRect | null>(null);
  const elementRef = useRef<T | null>(null);

  const updateRect = useCallback(() => {
    if (elementRef.current) {
      rectRef.current = elementRef.current.getBoundingClientRect();
    }
  }, []);

  const setRef = useCallback((node: T | null) => {
    if (node) {
      elementRef.current = node;
      updateRect();
    }
  }, [updateRect]);

  return {
    ref: setRef,
    rect: rectRef.current,
    updateRect,
  };
}


