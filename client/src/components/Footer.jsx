import React from 'react';
import img from '../assets/Logo.png';

function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 bg-white w-full border-t border-slate-900/5">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <img
                className="h-7 w-auto"
                src={img}
                alt="Logo"
              />
              <p className="sr-only">Website Title</p>
            </a>
          </div>
          
          <p className="mt-4 text-center text-sm leading-6 text-slate-500">© 2025 iwaliwn Labs Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;