// src/app/contactus/page.js
'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Loader2 } from 'lucide-react';

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="card w-full max-w-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">
            We&apos;d love to hear from you! Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="input w-full h-32"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Mail />}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
