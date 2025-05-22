import { Button } from '@nextui-org/react';

const ShowcaseCard = ({ image, title, details, buttonText, onClick }) => {
  return (
    <div className="bg-background-card rounded-xl overflow-hidden transition-transform duration-200 hover:transform hover:scale-105">
      {/* Image Section */}
      <div className="h-48 bg-gray-800 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        
        {/* Details Section */}
        <div className="space-y-2 mb-4">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-text-secondary">{detail.label}:</span>
              <span className="text-text-primary font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
        
        {/* Button */}
        <Button 
          color="primary" 
          onClick={onClick}
          className="w-full bg-primary text-black font-medium"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ShowcaseCard;
