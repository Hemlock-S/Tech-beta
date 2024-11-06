import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const data = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Close-Up Photo of Dslr Camera",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Turned-on Flat Screen Smart Television Ahead",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Top View Photo of Black Wireless Headphones",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/27424788/pexels-photo-27424788/free-photo-of-gamepad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Gamepad",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Rose Gold Aluminum Case Apple Watch With White Sports Band",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? data.length - 1 : (currentSlide) => currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? 0 : (currentSlide) => currentSlide + 1
    );
  };

  return (
    <div className="frame relative">
      <div
        className="slider"
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {data.map((image) => (
          <div
            className="slide"
            key={image.id}
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        ))}
      </div>
      {/* <div className="btns absolute z-[1] text-white text-2xl flex gap-10 bottom-20 w-screen justify-center"> */}
      <div className="btns absolute left-0 right-0 mx-auto w-fit z-[1] text-white text-2xl flex gap-10 bottom-20">
          <button
            onClick={prevSlide}
            className="prev-btn bg-white/40 h-14 w-20 backdrop-blur-xl flex justify-center items-center hover:bg-white/90 hover:text-black duration-300"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>
          <button
            onClick={nextSlide}
            className="next-btn bg-white/40 h-14 w-20 backdrop-blur-xl flex justify-center items-center hover:bg-white/90 hover:text-black duration-300"
          >
            <span>
              <BsArrowRight />
            </span>
          </button>
        </div>
    </div>
  );
};

export default Slider;
