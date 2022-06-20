import React, { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  let images = useRef(null);
  let img = useRef(null);
  let app = useRef(null);
  let tl = gsap.timeline();

  useEffect(() => {
    gsap.to(app, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    });

    tl.from(img, {
      duration: 2,
      scale: 1.2,
      ease: Power3.easeOut,
      y: 1000,
    });
  }, []);

  return (
    <section>
      <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <AnimatePresence>
                <motion.img
                  initial={{
                    opacity: 0,
                    y: 1220,
                    scale: 1.6,
                    borderRadius: "0px",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    borderRadius: "2px",
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    type: "spring",
                    stiffness:30
                  }}
                  className="absolute inset-0 object-cover w-full h-full"
                  src="https://www.hyperui.dev/photos/house-1.jpeg"
                  alt="Indoors house"
                />
              </AnimatePresence>
            </div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 1220,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.9,
              duration: 1,
              ease: "easeOut",
              type: "tween",
            }}
            className="relative flex items-center bg-gray-100"
          >
            <span className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16" />
            <div className="p-8 sm:p-16 lg:p-24">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                transition={{
                  delay: 2,
                  duration: 1,
                  type: "tween"
                }}
                animate={{
                  opacity: 1,
                }}
                className="text-2xl font-bold sm:text-3xl"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore, debitis.
              </motion.h2>
              <motion.p
              initial={{
                opacity: 0,
              }}
              transition={{
                delay: 2.3,
                duration: 1,
                type: "tween"
              }}
              animate={{
                opacity: 1,
              }}
               className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid, molestiae! Quidem est esse numquam odio deleniti,
                beatae, magni dolores provident quaerat totam eos, aperiam
                architecto eius quis quibusdam fugiat dicta.
              </motion.p>
              <motion.a
               initial={{
                opacity: 0,
              }}
              transition={{
                delay: 2.6,
                duration: 1,
                type: "tween"
              }}
              animate={{
                opacity: 1,
              }}
                className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
                href="/contact"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
