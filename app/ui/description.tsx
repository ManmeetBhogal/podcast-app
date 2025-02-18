"use client"

import React, { useState, useEffect, useRef } from "react";
import { Podcast } from "../lib/types";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";
import styles from "./description.module.css";

interface descriptionProps {
    podcast?: Podcast | null;
    error?: string | null;
}

export function Description({ podcast, error }: descriptionProps) {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.8', 'start 0.2']
    });

    // log the scrollYProgress value
    useEffect(() => {
        scrollYProgress.on("change", e => console.log(e));
    }, [scrollYProgress]);

    const [lineHeight, setLineHeight] = useState('2rem');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateLineHeight = () => {
                if (window.innerWidth >= 768) {
                    setLineHeight('2rem'); // medium devices and up
                } else {
                    setLineHeight('1rem'); // default
                }
            };
            updateLineHeight();
            window.addEventListener('resize', updateLineHeight);
            return () => window.removeEventListener('resize', updateLineHeight);
        }
    }, []);

    // Handle the case where podcast data is unavailable
    if (!podcast || !podcast.description) {
        return (
            <div>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <p>No podcast data available. Please try again later.</p>
                )}
            </div>
        );
    }

    // cleaned Description after removing the link
    const cleanedDescription = podcast.description.replace(
        '<a href="https://msha.ke/brainstempodcast/" target="_blank">Follow us and email us!</a><p></p>', '');

    // split Description to word by word array
    const words = cleanedDescription.split(' ');

    return (
        <div className="description-container bg-black pb-40 md:pb-40 lg:pb-60 pl-20 md:pl-40 lg:pl-60 pr-20 lg:pr-60"
            style={{ position: 'relative', minHeight: '300px' }}
            ref={element}>
            <p className={`${styles['description-text']} description-text text-2xl md:text-3xl lg:text-3xl font-bold text-left text-white`}
                style={{ lineHeight }}>
                {
                    words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        // console.log([start, end]);
                        return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word} </Word>
                    })
                }
            </p>
        </div>
    );
}

const Word: React.FC<{ children: React.ReactNode, range: number[], progress: MotionValue<number> }> = ({ children, range, progress }) => {
    const adjustedRange = [range[0] - 0.1, range[1] + 0.01];
    const opacity = useTransform(progress, adjustedRange, [0, 1]);
    return (
        <span className={styles.words}>
            <span className={styles.shadow}>{children}</span>
            <motion.span
                style={{ opacity }}
            >
                {children}
            </motion.span>
        </span>
    );
}