import React, { useEffect } from 'react'

const SnowStyles = () => {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .sf-snow-flake {
        position: fixed;
        top: -20px;
        z-index: 99999;
        animation: fall linear forwards;
      }
      @keyframes fall {
        0% {
          transform: translateY(-20px);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0; /* Gradual fade out as snowflake falls */
        }
      }
    `
    document.head.appendChild(style)

    // Cleanup function to remove the style tag when the component unmounts
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}

const SnowFall = () => {
  const isSnowingPeriod = () => {
    const today = new Date()
    const start = new Date(today.getFullYear(), 11, 17) // December 17
    const end = new Date(
      today.getFullYear() +
        (today.getMonth() === 11 && today.getDate() > 7 ? 1 : 0),
      0,
      7
    ) // January 7

    return today >= start && today <= end
  }

  const createSnowflake = () => {
    const snowflake = document.createElement('div')
    snowflake.classList.add('sf-snow-flake')
    snowflake.style.left = `${Math.random() * 100}vw` // Random horizontal position
    snowflake.style.animationDuration = `${Math.random() * 20 + 5}s` // Random animation duration
    snowflake.style.fontSize = `${Math.random() * 30 + 10}px`
    snowflake.textContent = '❄' // Snowflake character

    document.body.appendChild(snowflake)

    // Remove snowflake when animation ends
    snowflake.addEventListener('animationend', () => {
      snowflake.remove()
    })
  }

  useEffect(() => {
    if (!isSnowingPeriod()) return

    const interval = setInterval(() => {
      createSnowflake()
    }, 200) // Create a snowflake every 200ms

    const stopCreatingTimeout = setTimeout(() => {
      // Stop creating snowflakes after 30 seconds
      clearInterval(interval)

      // Start fading out after 30 seconds (delay for snowflakes that are still falling)
      const snowflakes = document.querySelectorAll('.sf-snow-flake')
    }, 20000) // 20 seconds

    // Cleanup function to clear interval and timeouts
    return () => {
      clearInterval(interval)
      clearTimeout(stopCreatingTimeout)

      // Ensure all snowflakes are removed if the component unmounts
      const snowflakes = document.querySelectorAll('.sf-snow-flake')
      snowflakes.forEach(snowflake => snowflake.remove())
    }
  }, [])

  if (!isSnowingPeriod()) return null

  return (
    <>
      <SnowStyles />
    </>
  )
}

export default SnowFall
