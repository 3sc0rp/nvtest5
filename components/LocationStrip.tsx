'use client';

import { motion } from 'framer-motion';

export default function LocationStrip() {

  const businessHours = [
    {
      days: 'Monday - Thursday',
      hours: '11:00 AM - 10:00 PM'
    },
    {
      days: 'Friday - Saturday',
      hours: '11:00 AM - 11:00 PM'
    },
    {
      days: 'Sunday',
      hours: '12:00 PM - 9:00 PM'
    }
  ];

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Simple open/closed logic
  const isOpenNow = () => {
    if (currentDay === 0) { // Sunday
      return currentHour >= 12 && currentHour < 21;
    } else if (currentDay >= 1 && currentDay <= 4) { // Monday-Thursday
      return currentHour >= 11 && currentHour < 22;
    } else { // Friday-Saturday
      return currentHour >= 11 && currentHour < 23;
    }
  };

  const openStatus = isOpenNow();

  return (
    <section className="py-12 bg-nv-ink text-nv-paper relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/sun-rays.svg')] bg-center bg-no-repeat bg-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Location Info */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-nv-saffron mb-6">
              Visit Us
            </h3>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-nv-saffron text-lg">📍</span>
                </div>
                <div className="text-left">
                  <p className="font-body text-nv-sand font-semibold">
                    123 Kurdish Heritage Street
                  </p>
                  <p className="font-body text-nv-sand/80 text-sm">
                    Nature Village District, City Center
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  <span className="text-nv-saffron text-lg">📞</span>
                </div>
                <a 
                  href="tel:+1-555-123-4567"
                  className="font-body text-nv-sand hover:text-nv-saffron transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  <span className="text-nv-saffron text-lg">✉️</span>
                </div>
                <a 
                  href="mailto:info@naturevillage.com"
                  className="font-body text-nv-sand hover:text-nv-saffron transition-colors duration-200"
                >
                  info@naturevillage.com
                </a>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 space-y-2">
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper px-4 py-2 rounded-lg font-body font-semibold transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🗺️</span>
                  <span>Get Directions</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-nv-saffron mb-6">
              Hours
            </h3>

            {/* Current Status */}
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 ${
              openStatus 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-red-500/20 text-red-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${openStatus ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="font-body font-semibold text-sm">
                {openStatus ? 'Open Now' : 'Closed Now'}
              </span>
            </div>

            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center py-2 ${
                    index < businessHours.length - 1 ? 'border-b border-nv-sand/20' : ''
                  }`}
                >
                  <span className="font-body text-nv-sand font-semibold text-sm">
                    {schedule.days}
                  </span>
                  <span className="font-body text-nv-sand/80 text-sm">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Special Notice */}
            <div className="mt-6 p-3 bg-nv-terracotta/20 rounded-lg">
              <p className="font-body text-nv-sand text-xs">
                Call ahead for holiday hours and special events
              </p>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 lg:h-80 bg-nv-sand/10 rounded-lg overflow-hidden border border-nv-sand/20">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h4 className="font-heading text-lg font-semibold text-nv-saffron mb-2">
                    Interactive Map
                  </h4>
                  <p className="font-body text-nv-sand text-sm">
                    Click to open
                  </p>
                </div>
              </div>

              {/* Simulated Map Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="border border-nv-sand/10"
                      style={{
                        backgroundColor: i % 3 === 0 ? 'rgba(232, 216, 181, 0.1)' : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Restaurant Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-8 h-8 bg-nv-terracotta rounded-full border-4 border-nv-paper shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(180, 83, 42, 0.7)',
                      '0 0 0 10px rgba(180, 83, 42, 0)',
                      '0 0 0 0 rgba(180, 83, 42, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                />
              </div>

              {/* Click Overlay */}
              <button
                className="absolute inset-0 hover:bg-nv-saffron/5 transition-colors duration-200"
                onClick={() => window.open('https://maps.google.com', '_blank')}
                aria-label="Open map"
              />
            </div>

            {/* Map Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <motion.button
                className="flex items-center space-x-2 bg-nv-olive hover:bg-nv-olive/90 text-nv-paper px-3 py-2 rounded text-sm font-body font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🚗</span>
                <span>Parking</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 bg-nv-saffron hover:bg-nv-saffron/90 text-nv-ink px-3 py-2 rounded text-sm font-body font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🚌</span>
                <span>Transit</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 bg-nv-sand/20 hover:bg-nv-sand/30 text-nv-sand px-3 py-2 rounded text-sm font-body font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>♿</span>
                <span>Accessible</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-nv-sand/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-nv-saffron">🅿️</span>
              <span className="font-body text-nv-sand text-sm">
                Free Parking
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-nv-saffron">📶</span>
              <span className="font-body text-nv-sand text-sm">
                Free WiFi
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-nv-saffron">♿</span>
              <span className="font-body text-nv-sand text-sm">
                Wheelchair Accessible
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-nv-saffron">👨‍👩‍👧‍👦</span>
              <span className="font-body text-nv-sand text-sm">
                Family Friendly
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
