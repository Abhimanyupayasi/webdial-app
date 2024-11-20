import React from "react";

const AffiliateSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <a href="https://www.webdial.in/contact-us"><h2 className="text-4xl font-bold mb-4">
            Join Us & <span className="text-yellow-300">Earn Up to 25%</span>
          </h2></a>
          <p className="text-lg mb-8">
            Become an affiliate today and start earning commission on every
            referral. It's simple, rewarding, and free to join!
          </p>
          <button onClick={()=>{
            window.location.href="https://www.webdial.in/contact-us"
          }} className="btn btn-primary btn-lg">
            Join Now
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card shadow-lg bg-gray-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Easy Setup</h3>
            <p>Sign up and start sharing your unique affiliate link.</p>
          </div>
          <div className="card shadow-lg bg-gray-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">High Commissions</h3>
            <p>Earn up to 25% on every successful referral.</p>
          </div>
          <div className="card shadow-lg bg-gray-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
            <p>Get your earnings delivered quickly and securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSection;
