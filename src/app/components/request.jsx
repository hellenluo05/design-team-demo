'use client'

import React, { useState } from "react";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    description: "",
    technicalSpecs: "",
    dateNeeded: "",
    inspiration: "",
    colors: ["", "", "", "", ""], // up to 5 colors
  });
  const [submitted, setSubmitted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setAcknowledged(e.target.checked);
  };

  const handleColorChange = (index, value) => {
    const newColors = [...form.colors];
    newColors[index] = value;
    setForm({ ...form, colors: newColors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="request"
      className="flex flex-col items-center justify-center py-10"
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Submit a Design Request</h2>
      <div className="w-full max-w-2xl bg-[#e4dfda] border border-black rounded-none p-8">
        {submitted ? (
          <div className="text-center text-lg text-black">
            Thank you for your request! We will get in touch with you soon.
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <label className="flex flex-col text-black font-medium">
              Name*
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
              />
            </label>
            <label className="flex flex-col text-black font-medium">
              Princeton Email*
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
              />
            </label>
            <label className="flex flex-col text-black font-medium">
              Organization*
              <input
                type="text"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                required
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
              />
            </label>
            <label className="flex flex-col text-black font-medium">
              Type of Project*
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
              >
                <option value="">Select a type</option>
                <option value="branding">Branding</option>
                <option value="poster">Poster</option>
                <option value="web">Website Design</option>
                <option value="social">Social Media Graphic</option>
                <option value="merch">Merchandise</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="flex flex-col text-black font-medium">
              Project Description*
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none resize-none"
                placeholder="Please briefly describe your request."
              />
            </label>
            <label className="flex flex-col text-black font-medium">
              Technical Specs*
              <textarea
                name="technicalSpecs"
                value={form.technicalSpecs}
                onChange={handleChange}
                required
                rows={2}
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none resize-none"
                placeholder="e.g. 1080x1920px, PDF, PNG, etc."
              />
              <span className="text-xs text-black font-normal mt-1">
                Please specify any required dimensions, file formats, or other technical requirements.
              </span>
            </label>
            <label className="flex flex-col text-black font-medium">
              Date &amp; Time Needed*
              <input
                type="datetime-local"
                name="dateNeeded"
                value={form.dateNeeded}
                onChange={handleChange}
                required
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
              />
              <span className="text-xs text-black font-normal mt-1">
                Please select the date and time you need the design by.
              </span>
            </label>
            <label className="flex flex-col text-black font-medium">
              Inspiration
              <input
                type="text"
                name="inspiration"
                value={form.inspiration}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-black rounded-none bg-white text-black focus:outline-none"
                placeholder="Links to designs you like"
              />
              <span className="text-xs text-black font-normal mt-1">
                Links to designs you like (optional but very useful)
              </span>
            </label>
            <div className="flex flex-col text-black font-medium">
              <span>Preferred Colors</span>
              <div className="flex flex-row gap-3 mt-2">
                {form.colors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <input
                      type="color"
                      value={color || "#ffffff"}
                      onChange={e => handleColorChange(idx, e.target.value)}
                      className="w-10 h-10 border border-black"
                      aria-label={`Color ${idx + 1}`}
                    />
                    <span className="text-xs mt-1 text-black">
                      {color ? color.toUpperCase() : ""}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-black font-normal mt-1">
                Pick up to five colors you would like us to use (optional)
              </span>
            </div>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={handleCheckboxChange}
                required
                className="accent-black"
              />
              I understand that the Design Team may need to adjust deadlines or request additional information.
            </label>
            <button
              type="submit"
              className="px-5 py-2 bg-black text-[#e4dfda] border border-black font-medium text-base transition-colors duration-150 rounded-none hover:bg-[#e4dfda] hover:text-black"
              disabled={!acknowledged}
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
