export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        <h1 className="text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-700 leading-relaxed">
          Have a question or want to learn more about our products? Wed love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-900 text-sm tracking-wide mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-none focus:border-gray-900" />
            </div>
            <div>
              <label className="block text-gray-900 text-sm tracking-wide mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-none focus:border-gray-900" />
            </div>
            <div>
              <label className="block text-gray-900 text-sm tracking-wide mb-2">Message</label>
              <textarea rows={6} className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-none focus:border-gray-900 resize-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800">Send Message</button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 text-sm">hello@lumen.com</p>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Studio</h3>
                <p className="text-gray-600 text-sm">123 Design Street<br />Brooklyn, NY 11211</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}