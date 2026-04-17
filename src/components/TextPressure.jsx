import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
    const t = Math.min(Math.max(1 - distance / maxDist, 0), 1);
    const eased = Math.pow(t, 2.2);
    return minVal + (maxVal - minVal) * eased;
};

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const TextPressure = ({
    text = 'LEGION',
    fontFamily = 'LEGION',
    fontUrl = '/fonts/LEGION.otf',
    stroke = true,
    textColor = '#FFFFFF',
    strokeColor = 'rgba(0, 74, 201, 0.4)',
    strokeWidth = 2,
    className = '',
    minFontSize = 80
}) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const spansRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);

    const chars = useMemo(() => text.split(''), [text]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };

        const handleTouchMove = (e) => {
            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const setSize = useCallback(() => {
        if (!containerRef.current || !titleRef.current) return;

        const { width: containerW, height: containerH } =
            containerRef.current.getBoundingClientRect();

        let newFontSize = containerW / (chars.length * 0.85);
        newFontSize = Math.max(newFontSize, minFontSize);

        setFontSize(newFontSize);

        // Scale vertically to fill container height if needed
        requestAnimationFrame(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();
            if (textRect.height > 0 && containerH > 0) {
                const yRatio = containerH / textRect.height;
                setScaleY(Math.min(yRatio, 1.2));
                setLineHeight(yRatio);
            }
        });
    }, [chars.length, minFontSize]);

    useEffect(() => {
        const debouncedSetSize = debounce(setSize, 100);
        debouncedSetSize();
        window.addEventListener('resize', debouncedSetSize);
        return () => window.removeEventListener('resize', debouncedSetSize);
    }, [setSize]);

    useEffect(() => {
        let rafId;

        const animate = () => {
            // Lerp mouse follow
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = Math.max(titleRect.width / 2, 300);

                spansRef.current.forEach((span) => {
                    if (!span) return;

                    const rect = span.getBoundingClientRect();
                    const charCenter = {
                        x: rect.x + rect.width / 2,
                        y: rect.y + rect.height / 2
                    };

                    const d = dist(mouseRef.current, charCenter);

                    const stretchX = getAttr(d, maxDist, 1, 1.6);
                    const squashY = getAttr(d, maxDist, 1, 0.85);
                    const translateY = getAttr(d, maxDist, 0, -40);
                    const skewX = getAttr(d, maxDist, 0, 20) * (mouseRef.current.x > charCenter.x ? 1 : -1);

                    const transform = `translateY(${translateY.toFixed(2)}px) scaleX(${stretchX.toFixed(2)}) scaleY(${squashY.toFixed(2)}) skewX(${skewX.toFixed(2)}deg)`;

                    if (span.style.transform !== transform) {
                        span.style.transform = transform;
                    }
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, []);

    const styleElement = useMemo(() => {
        return (
            <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .text-pressure-title span {
          display: inline-block;
          transition: transform 0.1s ease-out;
          will-change: transform;
        }

        .stroke span {
          position: relative;
          color: ${textColor};
        }

        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
          font-family: inherit;
        }
      `}</style>
        );
    }, [fontFamily, fontUrl, textColor, strokeColor, strokeWidth]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full bg-transparent ${className}`}
        >
            {styleElement}

            <h1
                ref={titleRef}
                className={`text-pressure-title flex justify-center md:justify-start ${stroke ? 'stroke' : ''} uppercase cursor-default select-none`}
                style={{
                    fontFamily,
                    fontSize,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    color: stroke ? undefined : textColor,
                    whiteSpace: 'nowrap'
                }}
            >
                {chars.map((char, i) => (
                    <span
                        key={`${i}-${char}`}
                        ref={(el) => {
                            spansRef.current[i] = el;
                        }}
                        data-char={char}
                    >
                        {char}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default TextPressure;