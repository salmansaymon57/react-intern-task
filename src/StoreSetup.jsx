import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ComputerDesktopIcon, CurrencyDollarIcon, EnvelopeIcon, GlobeAmericasIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { RectangleGroupIcon } from "@heroicons/react/24/outline";

export default function CreateStore() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    storeName: "",
    subdomain: "",
    location: "Bangladesh",
    category: "Fashion",
    currency: "BDT",
    email: ""
  });

  const [domainAvailable, setDomainAvailable] = useState(null);
  const [domainError, setDomainError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Trigger domain check when subdomain changes
    
  };

  useEffect(() => {
  if (!form.subdomain) {
    setDomainAvailable(null);
    setDomainError(null);
    return;
  }

  const delay = setTimeout(() => {
    const isValid = /^[a-z0-9-]+$/i.test(form.subdomain); // basic format check
    if (!isValid) {
      setDomainAvailable(false);
      setDomainError("Invalid subdomain format.");
      return;
    }

    checkDomainAvailability(form.subdomain);
  }, 600); // debounce 600ms

  return () => clearTimeout(delay);
}, [form.subdomain]);


  const checkDomainAvailability = async (subdomain) => {
    if (!subdomain) return;
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${subdomain}.expressitbd.com`
      );

      console.log("Domain API Response:", response.data);

      if (response.data.data.taken) {
        setDomainAvailable(false);
        setDomainError(response.data.data.taken);
      } else {
        setDomainAvailable(true);
        setDomainError(false);
      }
    } catch (err) {
      console.error("Domain check failed:", err);  
      setDomainAvailable(false);
      setDomainError("Error checking domain availability.");
    }
  };


  
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  // Basic validation
  if (form.storeName.length < 3) newErrors.storeName = "Store name must be at least 3 characters long";
  if (!form.email.includes("@")) newErrors.email = "Enter a valid email address";
  if (!form.subdomain.trim()) newErrors.subdomain = "Subdomain is required";

  if (domainAvailable === false) newErrors.subdomain = "Not Available Domain, Re-enter!";
  if (domainAvailable === null) {
      alert("Still checking domain availability. Please wait...");
      return;
    }

  // Show errors if any
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // Clear old errors

  const payload = {
    name: form.storeName,
    currency: form.currency,
    country: form.location,
    domain: form.subdomain,
    category: form.category,
    email: form.email
  };

  try {
    const response = await axios.post(
      "https://interview-task-green.vercel.app/task/stores/create",
      payload
    );
    console.log("Domain API Response:", response);
    alert("Store created successfully!");
    navigate('/Products');
  } catch (error) {
    alert("Error creating store.");
    console.error(error);
  }
};

  return (
    
    <div className="w-full max-w-5xl  sm:px-2 lg:px-10 py-6 bg-white rounded-lg shadow-md font-sans">
      <h1 className="text-auto max-text-2xl font-bold mb-2">Create a store</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-8">Add your basic store information and complete the setup</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2">

          <div className="text-left">

          <ComputerDesktopIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">Give your online store a name</label>
          <p className="text-xs text-gray-500 mb-1">A great store name is a big part of your success. Make sure it aligns with your brand and products.</p>
          </div>

          <div className="text-right">
          <input
            type="text" name="storeName"
            placeholder="How'd you like to call your store?"
            className={`w-full max-w-sm border rounded-md px-4 py-2 ${errors.storeName ? 'border-red-500' : ''}`}
            value={form.storeName}
            onChange={handleChange}
          />
          {errors.storeName && <p className="text-red-500 text-sm mt-1">he{errors.storeName}</p>}

          </div>
        </div>

        <div className="grid grid-cols-2">

          <div className="text-left">

          <GlobeAmericasIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">Your online store subdomain</label>
          <p className="text-xs text-gray-500 mb-1">A SEO-friendly store name is a crucial part of your success. <br /> Make sure it aligns with your brand and products.</p>
          <p className="text-xs text-gray-500 mb-1">Minimum 10 characters</p>
          </div>

          

          <div className="relative text-right  ">
            <input
              type="text"
              name="subdomain"
              placeholder="enter your domain name"
              className= {`w-full max-w-sm border  rounded-md  px-4 py-2 ${domainError ? 'border-red-500' : ''}`}
              value={form.subdomain}
              onChange={handleChange}
              required
            />
            <span className="inline items-center pointer-events-none px-1 py-2 text-sm text-gray-600">
              .expressitbd.com
            </span><br />
    
          {domainAvailable === null && form.subdomain && (<p className="text-blue-500 text-sm mt-1">Checking availability...</p>)}
          {domainError === true && (<p className="text-red-600 text-sm mt-1">This domain is already taken!</p>)}
          {domainError === false && (<p className="text-green-600 text-sm mt-1">This domain is available ✅</p>)}
          </div>
          
        </div>

        <div className="grid grid-cols-2">

          <div className="text-left">
          <MapPinIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">Where's your store located?</label>
          <p className="text-xs text-gray-500 mb-1">Set your store's default location so we can optimize store access and speed for your customers.</p>
          </div>
          <div className="text-right">
          <select
            name="location"
            className=" border w-full max-w-sm rounded-md px-4 py-2"
            value={form.location}
            onChange={handleChange}
          >
            <option value="Bangladesh">Bangladesh</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>

          </div>
        </div>

        <div className="grid grid-cols-2">

          <div className="text-left">
          <RectangleGroupIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">What's your Category?</label>
          <p className="text-xs text-gray-500 mb-1">Set your store's default category so that we can optimize store access and speed for your customers.</p>

          </div>

          <div className="text-right">
          <select
            name="category"
            className="w-full max-w-sm border rounded-md px-4 py-2"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Books">Books</option>
          </select>

          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="text-left">
          <CurrencyDollarIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">Choose store currency</label>
          <p className="text-xs text-gray-500 mb-1">This is the main currency you wish to sell in.</p>

          </div>

          <div className="text-right">
          <select
            name="currency"
            className="w-full max-w-sm border rounded-md px-4 py-2"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="BDT (Taka)">BDT (Taka)</option>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </select>

          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="text-left">
          <EnvelopeIcon className="inline size-7 text-blue-500 p-1" />
          <label className="inline font-medium text-sm mb-1">Store contact email</label>
          <p className="text-xs text-gray-500 mb-1">This is the email you'll use to send notifications and to receive orders from customers.</p>

          </div>

          <div className="text-right">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className= "w-full max-w-sm border rounded-md px-4 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          </div>
          
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto   text-black py-2 px-4 rounded-md font-medium hover:indigo-600"
        >
          Create store
        </button>
      </form>
    </div>
   
    

  );
}
