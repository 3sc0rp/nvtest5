"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email').optional(),
  phone: z.string().optional(),
  type: z.enum(['general', 'reservation', 'catering', 'feedback']),
  message: z.string().min(10, 'Please provide more details'),
  website: z.string().optional() // honeypot
}).refine((data) => data.email || data.phone, {
  message: 'Provide at least an email or a phone number',
  path: ['email']
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  });

  async function onSubmit(data: ContactForm) {
    // honeypot: ignore if website filled
    if (data.website) return;
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="bg-nv-paper min-h-[60vh]">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink">Contact</h1>
        <p className="font-body text-nv-olive mt-2">We would love to hear from you.</p>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <form className="bg-white rounded-xl shadow-md border border-nv-sand p-6 lg:col-span-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-body text-sm font-semibold text-nv-ink mb-1">Name *</label>
              <input id="name" {...register('name')} className={`w-full px-3 py-2 rounded-lg border-2 ${errors.name ? 'border-red-400' : 'border-nv-sand focus:border-nv-terracotta'} focus:outline-none`} />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block font-body text-sm font-semibold text-nv-ink mb-1">Email</label>
              <input id="email" type="email" {...register('email')} className={`w-full px-3 py-2 rounded-lg border-2 ${errors.email ? 'border-red-400' : 'border-nv-sand focus:border-nv-terracotta'} focus:outline-none`} />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block font-body text-sm font-semibold text-nv-ink mb-1">Phone</label>
              <input id="phone" {...register('phone')} className="w-full px-3 py-2 rounded-lg border-2 border-nv-sand focus:border-nv-terracotta focus:outline-none" />
            </div>
            <div>
              <label htmlFor="type" className="block font-body text-sm font-semibold text-nv-ink mb-1">Message Type *</label>
              <select id="type" {...register('type')} className={`w-full px-3 py-2 rounded-lg border-2 ${errors.type ? 'border-red-400' : 'border-nv-sand focus:border-nv-terracotta'} focus:outline-none`}>
                <option value="general">General</option>
                <option value="reservation">Reservation</option>
                <option value="catering">Catering</option>
                <option value="feedback">Feedback</option>
              </select>
              {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type.message as string}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="block font-body text-sm font-semibold text-nv-ink mb-1">Message *</label>
            <textarea id="message" rows={5} {...register('message')} className={`w-full px-3 py-2 rounded-lg border-2 ${errors.message ? 'border-red-400' : 'border-nv-sand focus:border-nv-terracotta'} focus:outline-none`} />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input id="website" {...register('website')} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" disabled={!isValid || isSubmitting} className={`px-6 py-3 rounded-lg font-body font-semibold transition-colors ${isValid && !isSubmitting ? 'bg-nv-terracotta text-white hover:bg-nv-terracotta/90' : 'bg-nv-sand text-nv-olive cursor-not-allowed'}`}>
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
            {submitted && (
              <div role="status" aria-live="polite" className="px-3 py-2 rounded bg-green-100 text-green-800">Thanks! We received your message.</div>
            )}
          </div>
        </form>

        {/* Info */}
        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-nv-sand bg-white p-4">
            <h2 className="font-heading text-xl font-bold text-nv-ink mb-2">Visit Us</h2>
            <p className="font-body text-nv-olive">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="underline">123 Kurdish Way, Village City, ST 12345</a>
            </p>
            <p className="font-body text-nv-olive mt-1">
              Phone: <a href="tel:+15551234567" className="underline">+1 (555) 123‑4567</a>
            </p>
          </div>

          <div className="rounded-xl border border-nv-sand bg-white p-4">
            <h2 className="font-heading text-xl font-bold text-nv-ink mb-2">Hours</h2>
            <ul className="font-body text-nv-olive text-sm space-y-1">
              <li>Mon‑Thu: 11:00 AM – 10:00 PM</li>
              <li>Fri‑Sat: 11:00 AM – 11:00 PM</li>
              <li>Sun: 12:00 PM – 9:00 PM</li>
            </ul>
          </div>

          <div className="rounded-xl overflow-hidden border border-nv-sand">
            <iframe
              title="Map to Nature Village"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509!2d144.95373631531588!3d-37.816279742021834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773b9a9d6f!2sRestaurant!5e0!3m2!1sen!2sus!4v1614030340000!5m2!1sen!2sus"
              width="100%"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </aside>
      </section>
    </div>
  );
}
