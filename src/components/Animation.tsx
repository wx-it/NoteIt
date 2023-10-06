 import maximizeMinimize2 from "react-useanimations/lib/maximizeMinimize2";
 import UseAnimations from "react-useanimations";

const Animation = () => {
  return (
    <UseAnimations
    animation={maximizeMinimize2}
    strokeColor="white"
    speed={0.25}
    loop={true}
    onClick={()=> console.log('click')}
  />
  )
}

export default Animation