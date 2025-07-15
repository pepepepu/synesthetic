'use client';

import * as React from 'react';
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from 'motion/react';

// Importe o seu novo arquivo CSS
import './styles.css';

type BubbleBackgroundProps = React.ComponentProps<'div'> & {
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
};

// OTIMIZAÇÃO 1: Usando React.memo para evitar re-renderizações desnecessárias.
// Adicionamos um nome de função para melhor depuração (React DevTools).
export const BubbleBackground = React.memo(function BubbleBackground({
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    first: '148,183,255',  // pastel do azul original
    second: '233,168,255',  // pastel do rosa-violeta
    third: '170,235,255',  // pastel do ciano
    fourth: '255,170,170',  // pastel do vermelho
    fifth: '240,240,170',  // pastel do amarelo
    sixth: '200,180,255',
  },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // O `ref` foi removido da desestruturação e é tratado pelo React.forwardRef
  // implicitamente ao usar React.memo com uma função nomeada que aceita ref.

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  // OTIMIZAÇÃO 2: `useCallback` para memorizar a função do event listener.
  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const rect = currentContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]); // A dependência do ref não é necessária

  React.useEffect(() => {
    if (!interactive) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    currentContainer.addEventListener('mousemove', handleMouseMove);
    return () =>
      currentContainer.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, handleMouseMove]);

  // OTIMIZAÇÃO 3: `useMemo` para memorizar as bolhas estáticas, evitando que sejam recriadas.
  const staticBubbles = React.useMemo(() => (
    <>
      <motion.div
        className="bubble bubble-1"
        animate={{ y: [-50, 50, -50] }}
        transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="rotating-container rotator-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        <div className="bubble bubble-2" />
      </motion.div>
      <motion.div
        className="rotating-container rotator-2"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        <div className="bubble bubble-3" />
      </motion.div>
      <motion.div
        className="bubble bubble-4"
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 40, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="rotating-container rotator-3"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        <div className="bubble bubble-5" />
      </motion.div>
    </>
  ), []); // Array de dependências vazio significa que só será criado uma vez.

  const containerClassName = `bubble-background-container ${className || ''}`.trim();

  return (
    <div
      data-slot="bubble-background"
      className={containerClassName}
      {...props}
    >
      <style>
        {`
          :root {
            --first-color: ${colors.first};
            --second-color: ${colors.second};
            --third-color: ${colors.third};
            --fourth-color: ${colors.fourth};
            --fifth-color: ${colors.fifth};
            --sixth-color: ${colors.sixth};
          }
        `}
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" className="goo-svg-filters">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="goo-wrapper"
        style={{ filter: 'url(#goo) blur(40px)' }}
      >
        {staticBubbles}

        {interactive && (
          <motion.div
            className="bubble bubble-interactive"
            style={{ x: springX, y: springY }}
          />
        )}
      </div>

      {children}
    </div>
  );
});