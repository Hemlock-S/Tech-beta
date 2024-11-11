import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slide from "./Slide";

const data = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Close-Up Photo of Dslr Camera",
    headline: 'DSLR Cameras for Stunning Photos',
    body: 'Are you an aspiring photographer looking to take your skills to the next level? Our DSLR cameras offer features and high-quality image sensors to help you capture stunning photos. From landscape shots to portraits, these cameras are perfect for capturing all types of subjects.',
    cta: 'Shop Dslr Cameras Now',
    category: 'cameras'
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Turned-on Flat Screen Smart Television Ahead",
    headline: 'Upgrade your home entertainment with out TVs',
    body: 'Experience the latest in home entertainment with out selection of TVs. From sleek and modern designs to advanced features like 4k resolution and smart capabilities, our TVs will bring your favorite movies, TV shows, and streaming content to life',
    cta: 'Shop TVs and upgrade now',
    category: 'tvs'
  },
  {
    id: 3,
    src: "/headphone.jpg",
    alt: "Top View Photo of Black Wireless Headphones",
    headline: 'Enhance your listening experience',
    body: 'Take your music, movies, and more to the next level with our headphone. Our selection offers a range of styles and features, including noise-cancelling technology, wireless connectivity, and comfortable designes for all-day wear.',
    cta: 'Experience enhanced sound',
    category: 'headphones'

  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/27424788/pexels-photo-27424788/free-photo-of-gamepad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Gamepad",
    headline: 'Take your gaming to the next level',
    body: 'Elevate your gaming experience to classic systems, we have a console for every type of gamer. Our consoles offer advanced graphics, fast processing speed, and a variety of exclusive games to choose from',
    cta: 'Shop consoles and play',
    category: 'consoles'
    
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Rose Gold Aluminum Case Apple Watch With White Sports Band",
    headline: 'Stay connected with our smart watches',
    body: 'Stay connected on top of your day with out smart watches. Our selection offers a range of styles and features, including fitness tracking, phone notifications, and voice assistance. These watches are the perfect combination of functionality and style',
    cta: 'Shop smart watches now',
    category: 'smart-watches'
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
          <Slide key={image.id} image={image}/>
        ))}
      </div>
      {/* <div className="btns absolute z-[1] text-white text-2xl flex gap-10 bottom-20 w-screen justify-center"> */}
      <div className="btns absolute left-0 right-0 mx-auto w-fit z-[1] text-2xl flex gap-10 bottom-20">
          <button
            onClick={prevSlide}
            className="prev-btn h-14 w-20 flex justify-center items-center bg-violet-900 text-violet-200 border border-violet-200 hover:bg-gray-900 hover:text-gray-200 hover:border-gray-200 duration-300"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>
          <button
            onClick={nextSlide}
            className="next-btn h-14 w-20 flex justify-center items-center bg-violet-900 text-violet-200 border border-violet-200 hover:bg-gray-900 hover:text-gray-200 hover:border-gray-200 duration-300"
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
