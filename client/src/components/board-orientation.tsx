import { JSX, RefObject, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Orientation = 'white' | 'black';

interface BoardOrientationProps {
  boardRef: RefObject<HTMLDivElement | null>;
  orientation: Orientation;
  onRotate: (orientation: Orientation) => void;
}

function BoardOrientation({ boardRef, orientation, onRotate }: BoardOrientationProps): JSX.Element {
  const darkOverlayRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const flashOverlayRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const timelineRef: RefObject<gsap.core.Timeline | null> = useRef<gsap.core.Timeline | null>(null);
  const targetRef: RefObject<Orientation> = useRef<Orientation>(orientation);

  useGSAP(
    (): void => {
      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(
          boardRef.current,
          {
            scale: 1.25,
            z: 120,
            duration: 0.9,
            ease: 'power2.in',
            force3D: true,
          },
          0
        )
        .to(
          boardRef.current,
          {
            rotationY: 180,
            duration: 1.1,
            ease: 'power2.inOut',
            force3D: true,
          },
          0
        )
        .to(darkOverlayRef.current, { autoAlpha: 1, duration: 1.0, ease: 'power1.in' }, 0.2)
        .fromTo(flashOverlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 1.4)
        .call(
          (): void => {
            onRotate(targetRef.current);
            gsap.set(boardRef.current, { rotationY: 0 });
          },
          undefined,
          1.55
        )
        .to(flashOverlayRef.current, { autoAlpha: 0, duration: 0.3 }, 1.7)
        .to(darkOverlayRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 1.6)
        .to(
          boardRef.current,
          { scale: 1, z: 0, rotationY: 0, duration: 0.7, ease: 'power2.out', force3D: true },
          1.6
        );

      timelineRef.current = timeline;
    },
    { dependencies: [onRotate] }
  );

  const handleRotate: (target: Orientation) => void = (target: Orientation): void => {
    if (target === orientation || timelineRef.current === null || timelineRef.current.isActive()) {
      return;
    }
    targetRef.current = target;
    timelineRef.current.restart();
  };

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        <button
          type="button"
          onClick={(): void => handleRotate('black')}
          aria-label="Rotate to black side"
          className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-white/40 bg-black text-white shadow-lg transition-transform hover:scale-110 ${orientation === 'black' ? 'ring-2 ring-white' : ''}`}
        >
          ♟
        </button>
        <button
          type="button"
          onClick={(): void => handleRotate('white')}
          aria-label="Rotate to white side"
          className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-black/40 bg-white text-black shadow-lg transition-transform hover:scale-110 ${orientation === 'white' ? 'ring-2 ring-black' : ''}`}
        >
          ♟
        </button>
      </div>
      <div ref={darkOverlayRef} className="board-orientation-overlay-dark" />
      <div ref={flashOverlayRef} className="board-orientation-overlay-flash" />
    </>
  );
}

export default BoardOrientation;
export type { Orientation };
