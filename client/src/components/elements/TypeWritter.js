import Typewriter from "typewriter-effect";
function TypeWritter(props) {
  return (
    <span>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(props.msg)
            .pauseFor(1000)
            .deleteAll()
            .start();
        }}
      />
    </span>
  );
}

export default TypeWritter;