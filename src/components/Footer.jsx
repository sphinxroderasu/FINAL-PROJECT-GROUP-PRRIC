import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Group Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-green-400 font-medium">Clariz, Myca Hadazzah S.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-blue-400 font-medium">Isagunde, Arvegean J.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-purple-400 font-medium">Panuelos, Althea Marie S.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-yellow-400 font-medium">Reyes, Ian Kerby A.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-red-400 font-medium">Reynolds, William U.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            © {new Date().getFullYear()} Helpdesk Ticketing System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
