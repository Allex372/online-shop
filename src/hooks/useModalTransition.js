import { useEffect, useState } from 'react';

/**
 * Keeps modal mounted during exit animation.
 * @returns {{ shouldRender: boolean, phase: 'open' | 'closing' | 'closed' }}
 */
export const useModalTransition = (isOpen, durationMs = 280) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [phase, setPhase] = useState(isOpen ? 'open' : 'closed');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setPhase('closed');
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('open'));
      });
      return () => cancelAnimationFrame(frame);
    }

    if (shouldRender) {
      setPhase('closing');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setPhase('closed');
      }, durationMs);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isOpen, shouldRender, durationMs]);

  return { shouldRender, phase };
};
