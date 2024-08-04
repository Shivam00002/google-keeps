import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  imageSrc: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "SURAJ", title: "CTO", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWls-F3zeoI9BiIDCAlF41QMsJcWZTqDiXQ&s" },
  { id: 2, name: "ART", title: "Designer", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZq5d5NjoEdTryQsvcdG4wlDrSG4HCFl-hA&s" },
  { id: 3, name: "SHRUTI", title: "CEO", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3GleaAm3S9sdFz7fR1ZQ30yS8XDsn3xZSEg&s" },
  { id: 4, name: "DEV", title: "Developer", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOTj3WR4DucNu9T9xGT4IOkmkdjwiO_A9bkA&s" },
  { id: 5, name: "KARTIK", title: "Manager", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1DrSF-s-PxaEwauTGPX0vWetVCIYWNcHDQ&s" },
];

const ClientTestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getItemStyle = (index: number) => {
    const position = (index - currentIndex + testimonials.length) % testimonials.length;
    const baseClasses = "absolute transition-all duration-500 ease-in-out h-full";
    switch (position) {
      case 0: return `${baseClasses} w-60 z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 1: case 4: return `${baseClasses} w-32 z-20 top-1/2 ${position === 1 ? 'left-[75%]' : 'left-[25%]'} -translate-y-1/2 opacity-70`;
      case 2: case 3: return `${baseClasses} w-24 z-10 top-1/2 ${position === 2 ? 'left-[90%]' : 'left-[10%]'} -translate-y-1/2 opacity-50`;
      default: return `${baseClasses} opacity-0`;
    }
  };

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full flex items-center border border-red-600 mx-auto p-8">
      <div className="relative h-[400px] md:w-[800px] mx-auto flex justify-center items-center mb-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={getItemStyle(index)}
            onClick={() => handleClick(index)}
          >
            <img 
              src={testimonial.imageSrc} 
              alt={testimonial.name}
              className="w-full h-full object-fill"
            />
            <div className="absolute border border-red-500 bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="font-bold text-sm">{testimonial.name}</p>
              {index === currentIndex && (
                <p className="text-xs">{testimonial.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>


      <div className="text-center">
        <h2 className="text-2xl font-bold">Client Testimonials</h2>
        <p className="mt-2">
          We love hearing feedback from our valued clients.<br />
          Here's what some of our satisfied customers have to say about our services.
        </p>
      </div>
  
    </div>
  );
};

export default ClientTestimonialCarousel;