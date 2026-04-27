import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';
import { FileText, Circle, Layers, Layout, Code } from 'lucide-react';

const DEFAULT_ITEMS = [
    {
        title: 'Text Animations',
        description: 'Cool text animations for your projects.',
        id: 1,
        icon: <FileText className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Animations',
        description: 'Smooth animations for your projects.',
        id: 2,
        icon: <Circle className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Components',
        description: 'Reusable components for your projects.',
        id: 3,
        icon: <Layers className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Backgrounds',
        description: 'Beautiful backgrounds and patterns for your projects.',
        id: 4,
        icon: <Layout className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Common UI',
        description: 'Common UI components are coming soon!',
        id: 5,
        icon: <Code className="h-[16px] w-[16px] text-white" />
    }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`relative shrink-0 flex flex-col ${round
                    ? 'items-center justify-center text-center bg-[#120F17] border-0'
                    : 'items-start justify-between bg-[#0A0A0F]/80 backdrop-blur-3xl border border-white/10 rounded-[24px]'
                } overflow-hidden cursor-grab active:cursor-grabbing group`}
            style={{
                width: itemWidth,
                height: '100%',
                rotateY: rotateY,
                ...(round && { borderRadius: '50%', height: itemWidth })
            }}
            transition={transition}
        >
            {/* Background Image if available */}
            {item.image && (
                <div className="absolute inset-0 z-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent" />
                </div>
            )}

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className={`${round ? 'p-0 m-0' : 'mb-4'}`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 shadow-lg">
                        {item.icon}
                    </span>
                </div>
                <div>
                    <div className="mb-2 font-black text-2xl text-white uppercase tracking-tighter leading-none">{item.title}</div>
                    <p className="text-sm text-white/40 font-medium leading-relaxed">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false
}) {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const itemWidth = Math.max(containerWidth, 0);
    const trackItemOffset = itemWidth + GAP;
    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        if (containerWidth > 0) {
            const startingPosition = loop ? 1 : 0;
            setPosition(startingPosition);
            x.set(-startingPosition * trackItemOffset);
        }
    }, [items.length, loop, trackItemOffset, x, containerWidth]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden h-full w-full ${round ? 'rounded-full border border-white' : 'rounded-[2rem] border border-white/10'
                }`}
        >
            <motion.div
                className="flex h-full"
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth}
                        round={round}
                        trackItemOffset={trackItemOffset}
                        x={x}
                        transition={effectiveTransition}
                    />
                ))}
            </motion.div>
            <div className={`flex w-full justify-center pb-2 ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : 'absolute bottom-6 left-0'}`}>
                <div className="flex gap-2 bg-black/40 backdrop-blur-lg px-4 py-2 rounded-full border border-white/5">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index
                                    ? 'w-6 bg-cyan-400'
                                    : 'w-1.5 bg-white/20'
                                }`}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
