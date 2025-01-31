/* 
Usage

<parent
variants={parentVariant(0.5, 0.25)}
animate="visible"
initial="hidden"
>
<children variants={childrenVar("vertical", "spring")} />
</parent>

*/


export function parentVariant(delay: number, stagger: number) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };
}

export function childrenVar(
  direction: "vertical" | "horizontal",
  animationType: "spring" | "tween"
) {
  if (direction === "vertical") {
    return {
      hidden: { y: "-30px", opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: animationType,
        },
      },
    };
  } else if (direction === "horizontal") {
    return {
      hidden: { x: "-30px", opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: animationType,
        },
      },
    };
  }
}
