import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ComingSoon() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Full-screen confetti shower sequence
        const duration = 2 * 1000; // 2 seconds
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 500,
            zIndex: 999,
            gravity: 0.8,
            scalar: 2,
            shapes: ["square"],
            colors: ["#ffffff", "#eeeeee", "#cccccc","#4e21be", "#3a66ea"],
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            confetti({
                ...defaults,
                particleCount: 10,
                origin: {
                    x: randomInRange(0.1, 0.9),
                    y: Math.random() * 0.2,
                },
            });
        }, 50); // continuous bursts every 100ms

        // Countdown timer
        const targetDate = new Date("2025-09-01T00:00:00");

        const countdown = setInterval(() => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                clearInterval(countdown);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(countdown);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold mb-4"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Something Awesome is Coming Soon
            </motion.h1>

            <motion.p
                className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                We’re working hard to launch the best experience for you. Stay tuned!
            </motion.p>

            <motion.div
                className="flex gap-4 text-2xl font-semibold mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <TimeBox label="Days" value={timeLeft.days} />:
                <TimeBox label="Hours" value={timeLeft.hours} />:
                <TimeBox label="Minutes" value={timeLeft.minutes} />:
                <TimeBox label="Seconds" value={timeLeft.seconds} />
            </motion.div>

            <motion.button
                className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
            >
                Notify Me
            </motion.button>

            <motion.div
                className="mt-10 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
            </motion.div>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold">{String(value).padStart(2, "0")}</span>
            <span className="text-sm text-gray-400 uppercase">{label}</span>
        </div>
    );
}
