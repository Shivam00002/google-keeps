import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  imageSrc: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "SURAJ", title: "", imageSrc: "/api/placeholder/120/320" },
  { id: 2, name: "ART", title: "", imageSrc: "/api/placeholder/120/320" },
  { id: 3, name: "SHRUTI", title: "CEO", imageSrc: "/api/placeholder/400/320" },
  { id: 4, name: "DEV", title: "", imageSrc: "/api/placeholder/120/320" },
  { id: 5, name: "KARTIK", title: "", imageSrc: "/api/placeholder/120/320" },
];

const ClientTestimonialStrip: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative h-[400px] flex justify-center items-center">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`absolute h-full ${
              index === 2 ? 'w-[300px] z-20' : 'w-[120px] z-10'
            } ${
              index === 0 ? '-left-4' :
              index === 1 ? 'left-20' :
              index === 3 ? 'right-20' :
              index === 4 ? '-right-4' : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <img 
              src={testimonial.imageSrc} 
              alt={testimonial.name}
              className={`w-full h-full object-cover ${index !== 2 ? 'opacity-70' : ''}`}
            />
            {index === 2 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <p className="font-bold text-lg">{testimonial.name}</p>
                <p>{testimonial.title}</p>
              </div>
            )}
            {index !== 2 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1">
                <p className="font-bold text-sm">{testimonial.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Client Testimonials</h2>
        <p className="mt-2">
          We love hearing feedback from our valued clients.<br />
          Here's what some of our satisfied customers have to say about our services.
        </p>
      </div>
    </div>
  );
};

export default ClientTestimonialStrip;