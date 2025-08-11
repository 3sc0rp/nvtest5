'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const businessHours = [
  { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Saturday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '12:00 PM - 9:00 PM' }
];

export default function VisitUsStrip() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Hours */}
      <motion.div
        className="card-elevated p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="w-12 h-12 bg-nv-terracotta/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h3 className="font-heading text-xl font-bold text-nv-night mb-4">Hours</h3>
        
        <div className="space-y-2 text-sm">
          {businessHours.map((schedule) => (
            <div key={schedule.day} className="flex justify-between">
              <span className="text-nv-olive font-medium">{schedule.day}</span>
              <span className="text-nv-night">{schedule.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        className="card-elevated p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="w-12 h-12 bg-nv-olive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
        
        <h3 className="font-heading text-xl font-bold text-nv-night mb-4">Contact</h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-nv-olive mb-1">Phone</p>
            <a 
              href="tel:+15551234567" 
              className="text-nv-terracotta font-semibold hover:text-nv-saffron transition-colors"
            >
              (555) 123-4567
            </a>
          </div>
          
          <div>
            <p className="text-sm text-nv-olive mb-1">Email</p>
            <a 
              href="mailto:info@naturevillage.com" 
              className="text-nv-terracotta font-semibold hover:text-nv-saffron transition-colors text-sm"
            >
              info@naturevillage.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        className="card-elevated p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="w-12 h-12 bg-nv-saffron/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-nv-saffron" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h3 className="font-heading text-xl font-bold text-nv-night mb-4">Location</h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-nv-night font-medium text-sm">123 Village Street</p>
            <p className="text-nv-olive text-sm">Downtown Village District</p>
            <p className="text-nv-olive text-sm">City, State 12345</p>
          </div>
          
          <a 
            href="https://maps.google.com/?q=123+Village+Street+City+State+12345"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-nv-terracotta hover:text-nv-saffron transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Get Directions
          </a>
          
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="inline-flex items-center gap-1 text-xs text-nv-olive">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
              </svg>
              Free Parking
            </span>
            
            <span className="inline-flex items-center gap-1 text-xs text-nv-olive">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Halal
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
