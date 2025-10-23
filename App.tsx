import { useState, useRef, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
  ]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const addImage = () => {
    const newImages = [
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
    ];
    const randomImage = newImages[Math.floor(Math.random() * newImages.length)];
    setImages([...images, randomImage]);
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const tabs = [
    {
      id: 'about',
      label: 'About Me',
      content: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM.`,
    },
    {
      id: 'experiences',
      label: 'Experiences',
      content: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM.`,
    },
    {
      id: 'recommended',
      label: 'Recommended',
      content: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM.`,
    },
  ];

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeTabElement = tabRefs.current[activeTab];
      if (activeTabElement) {
        requestAnimationFrame(() => {
          setIndicatorStyle({
            left: activeTabElement.offsetLeft,
            width: activeTabElement.offsetWidth,
          });
        });
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, tabs]);

  return (
    <div className="min-h-screen bg-[#121417] flex">
      {/* Left half empty */}
      <div className="hidden lg:block lg:w-1/2"></div>

      {/* Right half content */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col gap-8">
        {/* === Tabs Widget === */}
        <div className="bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_#00000066] relative p-6 overflow-hidden">




          <div className="p-1.5 mb-6 relative">
            <div className="relative flex gap-2 bg-[#1E1E22] rounded-2xl p-1.5">
              {/* Animated background for active tab */}
              <motion.div
                layoutId="activeTab"
                className="absolute top-1.5 bottom-1.5 rounded-2xl bg-[#28292F]"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  

                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 40,
                  duration: 0.6,
                }}
              />

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 px-6 py-2.5 text-[16px] font-bold leading-[30px] transition-all duration-300 overflow-hidden group rounded-2xl
          ${activeTab === tab.id
                      ? 'text-white translate-y-[-1px] shadow-[0_2px_6px_rgba(0,0,0,0.6)]' // 👈 pressed shadow
                      : 'text-[#A3ADB2] hover:text-white/80'
                    }`}
                >
                  <span className="relative z-10">{tab.label}</span>

                  {/* Light reflection on hover */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-[-200%] w-[400%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-glass" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* Active tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="px-2 text-[#969696] text-[16px] leading-[25px] whitespace-pre-line"
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </div>

        {/* === Gallery Widget === */}
        <div className="relative bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_#00000066] p-6">




          {/* Header */}
          <div className="flex items-center justify-between mb-6 mt-2 relative z-10">
            <div className="bg-black px-6 py-2.5 rounded-full">
              <h2 className="text-base font-semibold text-white">Gallery</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={addImage}
                className="flex items-center gap-2 px-5 py-2 bg-[#4A4F55] hover:bg-[#5B626A] text-white text-sm font-medium rounded-full transition-all duration-200"
              >
                <Plus size={16} />
                <span>ADD IMAGE</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollGallery('left')}
                  className="w-10 h-10 bg-[#4A4F55] hover:bg-[#5B626A] text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="w-10 h-10 bg-[#4A4F55] hover:bg-[#5B626A] text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery images */}
          <div
            ref={galleryRef}
            className="flex gap-5 overflow-hidden pb-2 scroll-smooth select-none"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-56 h-44 rounded-2xl overflow-hidden shadow-lg relative transition-all duration-300"
              >
                <motion.img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  initial={{ scale: 0.92, filter: 'grayscale(100%)' }}
                  whileHover={{
                    scale: 1,
                    filter: 'grayscale(0%) brightness(1.05)',
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 10 }}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
