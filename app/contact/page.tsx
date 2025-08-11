import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Nature Village',
  description: 'Get in touch with Nature Village Kurdish Restaurant. Visit us, call us, or send us a message.',
};

export default function ContactPage() {
  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-8">
          Get in Touch
        </h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="font-heading text-2xl font-bold text-nv-ink mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <strong className="font-body text-nv-ink">Phone:</strong>
                <p className="font-body text-nv-olive">(555) 123-4567</p>
              </div>
              <div>
                <strong className="font-body text-nv-ink">Email:</strong>
                <p className="font-body text-nv-olive">info@naturevillage.com</p>
              </div>
              <div>
                <strong className="font-body text-nv-ink">Address:</strong>
                <p className="font-body text-nv-olive">123 Village Street, Your City, State 12345</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="font-heading text-2xl font-bold text-nv-ink mb-4">
              Hours
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-nv-ink">Monday - Thursday:</span>
                <span className="font-body text-nv-olive">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-nv-ink">Friday - Saturday:</span>
                <span className="font-body text-nv-olive">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-nv-ink">Sunday:</span>
                <span className="font-body text-nv-olive">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
