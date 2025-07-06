import React from "react";

const bounceContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: 270,
  position: 'relative',
};

const svgStyle = {
  width: 120,
  height: 120,
  display: 'block',
  zIndex: 2,
  animation: 'svgBounce 2s infinite cubic-bezier(.5,0,.5,1)'
};

const shadowStyle = {
  width: 70,
  height: 18,
  background: 'rgba(0,0,0,0.18)',
  borderRadius: '50%',
  marginTop: -22,
  zIndex: 1,
  filter: 'blur(1.5px)',
  animation: 'shadowSquash 2s infinite cubic-bezier(.5,0,.5,1)'
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: 'Segoe UI, Arial, sans-serif',
  background: '#fff'
};

const textStyle = {
  color: "#ffb07c",
  fontWeight: 700,
  fontSize: 24,
  marginTop: 24
};

const basketballStyle = {
  position: 'relative',
  height: 270,
  width: 200,
  overflow: 'visible', // allow ball to move out of box
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

export default function LoadingPage() {
  return (
    <div style={containerStyle}>
      <div style={basketballStyle}>
        <div style={bounceContainerStyle}>
          <img
          src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/share/1f3c0.jpg"
          alt="Bouncing Basketball"
          style={{
            ...svgStyle,
            width: 120,
            height: 120,
            objectFit: 'contain',
            animation: 'svgBounce 1.2s infinite cubic-bezier(.5,0,.5,1)'
          }}
        />
          <div style={shadowStyle}></div>
        </div>
      </div>
      <div style={textStyle}>Loading...</div>
      <style>{`
        @keyframes svgBounce {
  0% {
    transform: translateY(0) scaleY(1) scaleX(1);
  }
  15% {
    transform: translateY(-110px) scaleY(1.08) scaleX(0.93);
  }
  30% {
    transform: translateY(0) scaleY(0.93) scaleX(1.08);
  }
  36% {
    transform: translateY(-30px) scaleY(1.04) scaleX(0.96);
  }
  41% {
    transform: translateY(0) scaleY(0.98) scaleX(1.03);
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
  }
} 
        @keyframes shadowSquash {
  0%, 100% {
    transform: scaleX(1) scaleY(1);
    opacity: 1;
  }
  15% {
    transform: scaleX(0.93) scaleY(1.1);
    opacity: 0.7;
  }
  30% {
    transform: scaleX(1.18) scaleY(0.7);
    opacity: 0.5;
  }
  36% {
    transform: scaleX(0.98) scaleY(1.05);
    opacity: 0.8;
  }
  41% {
    transform: scaleX(1.08) scaleY(0.92);
    opacity: 0.6;
  }
  100% {
    transform: scaleX(1) scaleY(1);
    opacity: 1;
  }
}
      `}</style>
    </div>
  );
}
