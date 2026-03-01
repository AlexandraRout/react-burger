import {
  useCallback, useEffect, useRef, RefObject,
} from 'react';

interface IUseScrollTabsCallbackParams {
  scrollContainer: RefObject<HTMLDivElement | null>;
  sections: Record<string, RefObject<HTMLElement | null>>;
  onChange: (type: string) => void;
}

export default function useScrollTabsCallback({
  scrollContainer,
  sections,
  onChange,
}: IUseScrollTabsCallbackParams): () => void {
  const rafId = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;

      const container = scrollContainer.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top;

      let closestType = Object.keys(sections)[0];
      let minDistance = Infinity;

      Object.entries(sections).forEach(([type, ref]) => {
        if (!ref.current) return;

        const distance = Math.abs(
          ref.current.getBoundingClientRect().top - containerTop,
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestType = type;
        }
      });

      onChange(closestType);
    });
  }, [scrollContainer, sections, onChange]);

  useEffect(() => () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
  }, []);

  return onScroll;
}
