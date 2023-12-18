import React, { useEffect, useState } from "react";

const FloatingText: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const floatingElement = document.getElementById("floating-text");

    const moveElement = () => {
      if (floatingElement && visible) {
        const newPositionX = Math.random() * window.innerWidth;
        const newPositionY = Math.random() * window.innerHeight;

        floatingElement.style.left = `${newPositionX}px`;
        floatingElement.style.top = `${newPositionY}px`;
      }
    };

    const handleClick = () => {
      alert("Acho que eu mereço eles agora");
      openYouTubeVideo();
    };

    const openYouTubeVideo = () => {
      const videoId = 'izGwDsrQ1eQ'; // ID do vídeo específico
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      window.open(url, '_blank');
    };

    const interval = setInterval(moveElement, 2000);

    if (floatingElement) {
      floatingElement.addEventListener("click", handleClick);
    }

    setTimeout(() => {
      setVisible(false);
      clearInterval(interval);
    }, 20000); // Desaparece após 20 segundos

    return () => {
      clearInterval(interval);
      if (floatingElement) {
        floatingElement.removeEventListener("click", handleClick);
      }
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <div
          id="floating-text"
          style={{
            position: "absolute",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
            color: "rgb(var(--foreground-rgb))", // Altere para a cor desejada
            background: "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "left 1s, top 1s",
            pointerEvents: "auto",
          }}
        >
          Lembra dos meus 2 pontos professor?
        </div>
      )}
    </>
  );
};

export default FloatingText;
