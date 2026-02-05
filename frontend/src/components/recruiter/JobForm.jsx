import { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    experience: "",
    location: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log("Job posted:", formData);

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        requiredSkills: "",
        experience: "",
        location: "",
        type: "",
      });

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-premium p-12 md:p-16 max-w-4xl mx-auto animate-fade-in rounded-[3rem] border-2 border-purple-50 shadow-2xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-6 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Post a New Job</h2>
            <p className="text-gray-500 text-xl font-medium">Find the perfect candidate for your team</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 rounded-2xl flex items-center animate-scale-in shadow-lg">
          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="font-bold">Job Posted Successfully!</div>
            <div className="text-sm text-green-700">Your job listing is now live and candidates can apply.</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Job Title */}
        <div className="group">
          <label htmlFor="title" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
            Job Title *
          </label>
          <div className="relative group-focus-within:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="block w-full pl-16 pr-8 py-5 bg-white/80 border-2 border-gray-100 rounded-2xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-bold shadow-sm"
              placeholder="e.g., Senior React Developer"
            />
          </div>
        </div>

        {/* Location & Type */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="group">
            <label htmlFor="location" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
              Location *
            </label>
            <div className="relative group-focus-within:scale-[1.01] transition-transform duration-300">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="block w-full pl-16 pr-8 py-5 bg-white/80 border-2 border-gray-100 rounded-2xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-bold shadow-sm"
                placeholder="Remote / New York, NY"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="type" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
              Job Type *
            </label>
            <div className="relative group-focus-within:scale-[1.01] transition-transform duration-300">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="block w-full pl-16 pr-12 py-5 bg-white/80 border-2 border-gray-100 rounded-2xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-bold shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="group">
          <label htmlFor="description" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="block w-full px-8 py-5 bg-white/80 border-2 border-gray-100 rounded-3xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-medium shadow-sm resize-none"
            placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
          />
        </div>

        {/* Required Skills */}
        <div className="group">
          <label htmlFor="requiredSkills" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
            Required Skills *
          </label>
          <div className="relative group-focus-within:scale-[1.01] transition-transform duration-300">
            <div className="absolute top-6 left-0 pl-6 flex items-start pointer-events-none">
              <svg className="h-6 w-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <textarea
              id="requiredSkills"
              name="requiredSkills"
              required
              value={formData.requiredSkills}
              onChange={handleChange}
              rows={3}
              className="block w-full pl-16 pr-8 py-5 bg-white/80 border-2 border-gray-100 rounded-3xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-bold shadow-sm resize-none"
              placeholder="React, Node.js, TypeScript, (comma separated)"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="group">
          <label htmlFor="experience" className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3 ml-2">
            Experience Required *
          </label>
          <div className="relative group-focus-within:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="block w-full pl-16 pr-12 py-5 bg-white/80 border-2 border-gray-100 rounded-2xl focus:ring-8 focus:ring-purple-500/10 focus:border-purple-600 focus:bg-white transition-all outline-none text-lg font-bold shadow-sm appearance-none cursor-pointer"
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (2-5 years)</option>
              <option value="senior">Senior Level (5+ years)</option>
              <option value="lead">Lead/Principal (8+ years)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center items-center py-6 px-10 border border-transparent text-2xl font-black rounded-3xl text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-8 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:-translate-y-1.5 mt-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-4 h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span>Finalize & Post Opening</span>
              <svg className="w-8 h-8 ml-3 group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
