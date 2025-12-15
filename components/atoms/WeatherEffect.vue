<template>
  <div class="fixed inset-0 pointer-events-none z-40 overflow-hidden">
    <!-- Snow Effect -->
    <div v-if="weatherEffect === 'snow'" class="absolute inset-0">
      <div
        v-for="flake in snowflakes"
        :key="flake.id"
        class="snowflake"
        :style="{
          left: flake.left + '%',
          animationDuration: flake.duration + 's',
          animationDelay: flake.delay + 's',
          fontSize: flake.size + 'px',
          opacity: flake.opacity
        }"
      >
        ❄
      </div>
    </div>

    <!-- Rain Effect -->
    <div v-if="weatherEffect === 'rain'" class="absolute inset-0">
      <div
        v-for="drop in raindrops"
        :key="drop.id"
        class="raindrop"
        :style="{
          left: drop.left + '%',
          animationDuration: drop.duration + 's',
          animationDelay: drop.delay + 's',
          opacity: drop.opacity
        }"
      ></div>
    </div>

    <!-- Sunshine Effect -->
    <div v-if="weatherEffect === 'sun'" class="absolute inset-0">
      <div
        v-for="sun in sunIcons"
        :key="sun.id"
        :class="['sun-icon', `sun-move-${sun.animationType}`]"
        :style="{
          left: sun.left + '%',
          top: sun.top + '%',
          animationDuration: sun.duration + 's',
          animationDelay: sun.delay + 's',
          fontSize: sun.size + 'px',
          opacity: sun.opacity
        }"
      >
        ☀️
      </div>
    </div>

    <!-- Dust/Pollution Effect -->
    <div v-if="weatherEffect === 'dust'" class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/5 to-transparent">
      <div
        v-for="particle in dustParticles"
        :key="particle.id"
        :class="['dust-particle', `dust-move-${particle.animationType}`]"
        :style="{
          left: particle.left + '%',
          top: particle.top + '%',
          animationDuration: particle.duration + 's',
          animationDelay: particle.delay + 's',
          width: particle.size + 'px',
          height: particle.size + 'px',
          opacity: particle.opacity,
          backgroundColor: particle.color
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  weatherEffect?: 'snow' | 'rain' | 'sun' | 'dust' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  weatherEffect: 'none'
})

// Generate snowflakes
const snowflakes = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 10 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.7
  }))
)

// Generate raindrops
const raindrops = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 0.5 + Math.random() * 0.5,
    delay: Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5
  }))
)

// Generate sun icons with random starting positions
const sunIcons = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 8,
    size: 10 + Math.random() * 12,
    opacity: 0.25 + Math.random() * 0.35,
    animationType: i % 4 // 4 different movement patterns
  }))
)

// Generate dust particles with different colors
const dustParticles = ref(
  Array.from({ length: 100 }, (_, i) => {
    const colors = [
      'rgba(139, 137, 137, 0.7)',  // Gray dust
      'rgba(160, 160, 160, 0.6)',  // Light gray
      'rgba(120, 120, 120, 0.7)',  // Dark gray
      'rgba(169, 169, 169, 0.5)',  // Medium gray
      'rgba(105, 105, 105, 0.8)'   // Dim gray
    ]
    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      size: 3 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationType: i % 3 // 3 different movement patterns
    }
  })
)
</script>

<style scoped>
/* Snowflake Animation */
.snowflake {
  position: absolute;
  top: -10%;
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  animation: fall linear infinite;
  user-select: none;
}

@keyframes fall {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    top: 110%;
    transform: translateX(50px) rotate(360deg);
  }
}

/* Raindrop Animation */
.raindrop {
  position: absolute;
  top: -5%;
  width: 2px;
  height: 30px;
  background: linear-gradient(transparent, rgba(173, 216, 230, 0.8));
  animation: rain linear infinite;
}

@keyframes rain {
  0% {
    top: -5%;
    transform: translateX(0);
  }
  100% {
    top: 110%;
    transform: translateX(-20px);
  }
}

/* Sun Icon Animation */
.sun-icon {
  position: absolute;
  filter: drop-shadow(0 0 10px rgba(255, 220, 100, 0.8));
  user-select: none;
}

/* Circular movement clockwise */
.sun-move-0 {
  animation: sunCircle1 linear infinite;
}

@keyframes sunCircle1 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(150px, -100px) rotate(90deg) scale(1.2);
  }
  50% {
    transform: translate(200px, 50px) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(100px, 150px) rotate(270deg) scale(0.9);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

/* Circular movement counter-clockwise */
.sun-move-1 {
  animation: sunCircle2 linear infinite;
}

@keyframes sunCircle2 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-150px, 100px) rotate(-90deg) scale(0.9);
  }
  50% {
    transform: translate(-200px, -50px) rotate(-180deg) scale(1.2);
  }
  75% {
    transform: translate(-100px, -150px) rotate(-270deg) scale(1);
  }
  100% {
    transform: translate(0, 0) rotate(-360deg) scale(1);
  }
}

/* Figure-8 movement */
.sun-move-2 {
  animation: sunFigure8 ease-in-out infinite;
}

@keyframes sunFigure8 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(120px, -80px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(0, 0) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(-120px, 80px) rotate(270deg) scale(1.1);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

/* Zigzag movement */
.sun-move-3 {
  animation: sunZigzag linear infinite;
}

@keyframes sunZigzag {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  12.5% {
    transform: translate(80px, -60px) rotate(45deg) scale(1.15);
  }
  25% {
    transform: translate(160px, 0) rotate(90deg) scale(1);
  }
  37.5% {
    transform: translate(80px, 60px) rotate(135deg) scale(0.9);
  }
  50% {
    transform: translate(0, 120px) rotate(180deg) scale(1.1);
  }
  62.5% {
    transform: translate(-80px, 60px) rotate(225deg) scale(1);
  }
  75% {
    transform: translate(-160px, 0) rotate(270deg) scale(0.95);
  }
  87.5% {
    transform: translate(-80px, -60px) rotate(315deg) scale(1.05);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

/* Dust Particle Animation */
.dust-particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.4);
}

/* Floating dust movement */
.dust-move-0 {
  animation: dustFloat1 linear infinite;
}

@keyframes dustFloat1 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(40px, -30px) scale(1.3);
  }
  50% {
    transform: translate(80px, 20px) scale(0.9);
  }
  75% {
    transform: translate(40px, 60px) scale(1.1);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* Drifting dust movement */
.dust-move-1 {
  animation: dustFloat2 ease-in-out infinite;
}

@keyframes dustFloat2 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(-50px, 40px) rotate(120deg) scale(1.2);
  }
  66% {
    transform: translate(30px, -20px) rotate(240deg) scale(0.8);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

/* Slow drifting dust */
.dust-move-2 {
  animation: dustFloat3 ease-in-out infinite;
}

@keyframes dustFloat3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  20% {
    transform: translate(60px, 40px) scale(1.1);
  }
  40% {
    transform: translate(-30px, 70px) scale(0.9);
  }
  60% {
    transform: translate(-60px, -30px) scale(1.3);
  }
  80% {
    transform: translate(30px, -60px) scale(0.85);
  }
}
</style>
