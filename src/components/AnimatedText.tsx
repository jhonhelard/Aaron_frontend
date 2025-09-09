
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  once?: boolean;
}

interface AnimatedCharactersProps {
  text: string;
  className?: string;
  once?: boolean;
}

interface AnimatedWordProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

export const AnimatedCharacters = ({
  text,
  className = "",
  once = false,
}: AnimatedCharactersProps) => {
  // Split text into array of letters
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      {...(once ? { whileInView: "visible", viewport: { once: true } } : {})}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const AnimatedWords = ({
  children,
  className = "",
  once = false,
}: AnimatedWordProps) => {
  const words = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.12,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={words}
      initial="hidden"
      animate="visible"
      {...(once ? { whileInView: "visible", viewport: { once: true } } : {})}
    >
      <motion.span variants={word} className="inline-block">
        {children}
      </motion.span>
    </motion.div>
  );
};

export const AnimatedText = ({
  text,
  className = "",
  once = false,
}: AnimatedTextProps) => {
  if (typeof text === "string") {
    return <AnimatedCharacters text={text} className={className} once={once} />;
  }

  return (
    <span className={`inline-block ${className}`}>
      {text.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          <AnimatedCharacters text={line} once={once} />
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
