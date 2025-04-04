import React, { useState } from 'react'
import ReviewOnScroll from '../ReviewOnScroll'
import emailjs from "emailjs-com"

function Contact() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(import.meta.env.VITE_SERVER_ID, import.meta.env.VITE_TEMPLATE_ID, e.target, import.meta.env.VITE_PUBLIC_KEY).then(response => {
      alert("Message Sent!");
      setFormData({ name: "", email: "", message: "" })
    }).catch(() => alert("Oops! Something went wrong. Please try again"));
  }
  return (
    <section id='contact' className="min-h-screen flex items-center justify-center relative">
      <ReviewOnScroll>
        <div className='flex-1 max-w-150 p-5'>
          <h2 className='text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center'>Get In Touch</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5" placeholder="Name..."
                type="text" id="name" name="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="relative">
              <input className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                type="email" id="email" name="email" required value={formData.email} placeholder="example@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="relative">
              <textarea className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                id="message" name="message" required rows={5} value={formData.message} placeholder="Your Message..." onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </div>

            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative cursor-pointer overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              type="submit">
              Send Message
            </button>
          </form>
        </div>
      </ReviewOnScroll>
    </section>
  )
}

export default Contact