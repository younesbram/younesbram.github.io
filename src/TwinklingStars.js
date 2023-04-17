import React, { useEffect, useRef } from 'react';
import './TwinklingStars.css';

const TwinklingStars = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const stars = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < 400; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random(),
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                opacity: Math.random(),
                opacityChange: Math.random() * 0.005,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                star.x += star.speedX;
                star.y += star.speedY;
                star.opacity += star.opacityChange;

                if (star.x < 0 || star.x > canvas.width) {
                    star.speedX = -star.speedX;
                }

                if (star.y < 0 || star.y > canvas.height) {
                    star.speedY = -star.speedY;
                }

                if (star.opacity <= 0 || star.opacity >= 1) {
                    star.opacityChange = -star.opacityChange;
                }
            });

            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <canvas className='twinkling-stars' ref={canvasRef}></canvas>;
};

export default TwinklingStars;
