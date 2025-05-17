import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, useTexture, MeshDistortMaterial } from '@react-three/drei';

// Modern floating particles with trails
const Particles = () => {
  const particlesCount = 80; // Reduced for better performance
  const particlesRef = useRef([]);
  
  // Initialize particles with modern positioning and properties
  useEffect(() => {
    particlesRef.current = Array.from({ length: particlesCount }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ],
      size: Math.random() * 0.15 + 0.05, // Smaller particles for more modern look
      speed: Math.random() * 0.015 + 0.005,
      offset: Math.random() * Math.PI * 2 // For varied animation
    }));
  }, []);
  
  // Animate particles with trails
  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      // Create smooth flowing motion with sine/cosine waves
      particle.position[0] += Math.sin(state.clock.elapsedTime * 0.3 + particle.offset) * 0.005;
      particle.position[1] += Math.cos(state.clock.elapsedTime * 0.2 + particle.offset) * 0.005;
      particle.position[2] += Math.sin(state.clock.elapsedTime * 0.1 + particle.offset) * 0.005;
    });
  });
  
  return (
    <>
      {particlesRef.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#ff4d4d" : i % 3 === 1 ? "#ff9900" : "#ffffff"} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
};

// Modern 3D Object with distortion effect
const ModernAnimatedObject = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smoother rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Modern pulsing effect
      if (hovered) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.08 + 1;
        meshRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        <MeshDistortMaterial
          color="#ff4d4d"
          emissive="#ff9900"
          emissiveIntensity={hovered ? 1.5 : 0.8}
          metalness={0.9}
          roughness={0.1}
          distort={hovered ? 0.4 : 0.2} // Modern distortion effect
          speed={3}
        />
      </mesh>
      
      <Float 
        speed={3} 
        rotationIntensity={0.2} 
        floatIntensity={1.5}
        position={[0, -2.5, 0]}
      >
        <Text
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Montserrat-Bold.woff" // Make sure this font path is correct
          material-toneMapped={false}
          material-emissive="#ffffff"
          material-emissiveIntensity={0.5}
        >
          Discover Perfect Gifts
        </Text>
      </Float>
    </group>
  );
};

// Modern glowing plane beneath the object
const GlowingPlane = () => {
  const planeRef = useRef();
  
  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial 
        color="#ff4d4d"
        transparent
        opacity={0.3}
        side={2} // Double-sided
      />
    </mesh>
  );
};

const HeroSection = () => {
  // Use ref instead of state to track scroll position
  const scrollYRef = useRef(0);
  // Keep a state for initial render, but don't update it on every scroll
  const [initialRender, setInitialRender] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Update ref value instead of state - doesn't trigger re-renders
      scrollYRef.current = window.scrollY;
      
      // Only force a re-render once to ensure initial animations display properly
      if (initialRender && window.scrollY > 10) {
        setInitialRender(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialRender]);
  
  // Text animation variants for staggered effect
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };
  
  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Modern easing
    }
  };
  
  // Use Framer Motion's useTransform for scroll-based animations
  // or use the scrollYRef.current in your style calculations
  
  return (
    <div className="hero-section">
      <div 
        className="gradient-overlay"
        style={{
          opacity: 1 - (scrollYRef.current / 500),
          backgroundSize: `${200 + scrollYRef.current * 0.1}% ${200 + scrollYRef.current * 0.1}%`,
          // Modern gradient with better blending
          background: `radial-gradient(circle at 30% 30%, rgba(255, 77, 77, 0.2), transparent 60%), 
                       radial-gradient(circle at 70% 70%, rgba(255, 153, 0, 0.2), transparent 60%),
                       linear-gradient(45deg, rgba(18, 18, 24, 0.8), rgba(30, 30, 40, 0.9))`
        }}
      ></div>
      
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff9900" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff4d4d" />
          <GlowingPlane />
          <ModernAnimatedObject />
          <Particles />
          <Stars radius={80} depth={50} count={2000} factor={5} saturation={1} fade speed={1.5} />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            dampingFactor={0.05} // Smoother controls
          />
        </Canvas>
      </div>
      
      <div className="hero-content">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="visible"
          className="text-content"
        >
          <motion.h1 
            variants={textItem}
            className="hero-title"
            style={{ 
              transform: `translateY(${scrollYRef.current * 0.3}px)`,
              background: 'linear-gradient(to right, #ffffff, #ff9900)', // Improved text gradient
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255, 153, 0, 0.5)'
            }}
          >
            Gift Idea Generator
          </motion.h1>
          
          <motion.p 
            variants={textItem}
            className="hero-subtitle"
            style={{ 
              transform: `translateY(${scrollYRef.current * 0.2}px)`,
              color: '#e6e6ff' // Improved text color for better visibility
            }}
          >
            Find the perfect gift for any occasion
          </motion.p>
          
          <motion.div 
            variants={textItem}
            className="cta-container"
          >
            <motion.button 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(255, 77, 77, 0.9)',
                background: 'linear-gradient(45deg, #ff9900, #ff4d4d 80%)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }} // Modern spring animation
              className="cta-button"
            >
              Get Started
            </motion.button>
            
            <motion.div
              className="button-glow"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span style={{ color: '#e6e6ff' }}>Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="#e6e6ff"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;