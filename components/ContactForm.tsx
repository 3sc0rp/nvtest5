'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="card-elevated p-6">
      <h3 className="font-heading text-xl font-bold text-nv-night mb-4">Send us a message</h3>
      <form data-testid="contact-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-nv-olive mb-1">Name</label>
          <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full px-4 py-3 bg-nv-paper border border-nv-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-nv-terracotta" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-nv-olive mb-1">Email</label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 bg-nv-paper border border-nv-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-nv-terracotta" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-nv-olive mb-1">Message</label>
          <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help?" rows={5} className="w-full px-4 py-3 bg-nv-paper border border-nv-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-nv-terracotta" />
        </div>
        <Button type="submit" disabled={submitting} className="btn-hover-lift">
          {submitting ? 'Sending…' : 'Send Message'}
        </Button>
        {submitted && (
          <div role="alert" className="text-sm text-green-700 mt-2">Thank you! Your message has been sent.</div>
        )}
      </form>
    </div>
  );
}


