import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ShowcaseGallery.css';

const ShowcaseGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showcaseData = [
    {
      title: 'Web Development',
      description: 'Expert web developers creating responsive, modern websites and web applications with cutting-edge technologies.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'UI/UX Design',
      description: 'Talented designers crafting beautiful, intuitive interfaces that users love and engage with.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Mobile Apps',
      description: 'Skilled mobile developers building native and cross-platform applications for iOS and Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Content Writing',
      description: 'Professional writers delivering compelling content that resonates with your target audience.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Digital Marketing',
      description: 'Marketing experts driving results through strategic campaigns and data-driven insights.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Video Production',
      description: 'Creative videographers bringing stories to life through engaging visual content.',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Data Analytics',
      description: 'Data scientists turning numbers into actionable insights for better business decisions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'AI & ML',
      description: 'AI specialists developing intelligent solutions with cutting-edge machine learning.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    },
    {
      title: 'Blockchain',
      description: 'Blockchain developers creating secure, decentralized applications and smart contracts.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      link: '/login?intent=hire'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % showcaseData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + showcaseData.length) % showcaseData.length);
  };

  return (
    <div className="carousel-section">
      <div className="carousel">
        {showcaseData.map((item, index) => {
          const offset = ((index - activeIndex + showcaseData.length) % showcaseData.length);
          const absOffset = Math.abs(offset);
          const direction = offset > showcaseData.length / 2 ? offset - showcaseData.length : offset;
          const opacity = absOffset < 3 ? 1 : 0;
          const active = absOffset === 0 ? 1 : 0;

          return (
            <div
              key={index}
              className="card-container"
              style={{
                '--offset': direction,
                '--abs-offset': absOffset,
                '--direction': Math.sign(direction),
                '--opacity': opacity,
                '--active': active
              }}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={item.title}
                />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.description}</p>
                  <a href={item.link} className="btn btn-primary">
                    Hire Now
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <button className="nav left" onClick={prevSlide} aria-label="Previous">
          <ChevronLeft />
        </button>
        <button className="nav right" onClick={nextSlide} aria-label="Next">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ShowcaseGallery;
