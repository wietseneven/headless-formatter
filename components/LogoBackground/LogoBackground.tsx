import { motion, useViewportScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import classes from './LogoBackground.module.css'

const LogoBackground = function () {
  const rootRef = useRef<SVGElement>(null)
  const wavePattern = useRef<SVGPatternElement>(null)
  const { scrollYProgress } = useViewportScroll()

  useEffect(() => {
    if (!wavePattern.current || !rootRef.current) return
    scrollYProgress.onChange((latest) => {
      if (!wavePattern.current || !rootRef.current) return
      const newOpacity = latest * 20
      // @ts-ignore
      rootRef.current?.style?.opacity = newOpacity > 1 ? 1 : newOpacity
      wavePattern.current?.setAttribute('x', `${latest * 500}px`)
    })
  }, [scrollYProgress])

  return (
    <svg
      className={classes.root}
      width="100%"
      height="150"
      // @ts-ignore
      ref={rootRef}
    >
      <motion.pattern
        className={classes.pattern}
        y="0"
        id="wave"
        width="165"
        height="150"
        patternUnits="userSpaceOnUse"
        viewBox="0 0 165 150"
        xmlns="http://www.w3.org/2000/svg"
        ref={wavePattern}
      >
        <path
          d="M118.112 73.2284C129.389 35.4331 140.072 0 165 0V11.811C148.975 11.811 138.291 46.063 129.389 76.7717C118.112 114.567 107.428 150 82.5001 150C57.572 150 46.8885 114.567 35.6115 76.7717C26.7087 46.6536 16.0252 11.811 0 11.811V0C24.928 0 35.6115 35.4331 46.8885 73.2284C55.7914 103.346 66.4749 138.189 82.5001 138.189C98.5253 138.189 109.209 103.937 118.112 73.2284Z"
          fill="#FD0000"
        />
      </motion.pattern>
      <rect width="100%" height="150" fill="url(#wave)" />
    </svg>
  )
}

export default LogoBackground
