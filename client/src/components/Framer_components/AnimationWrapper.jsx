import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const AnimationWrapper = ({ children, keyValue, initial = { opacity: 0 }, animate = { opacity: 1 }, transition = { duration: 1 } }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                key={keyValue}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper