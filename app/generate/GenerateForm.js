"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import RotatingText from "@/components/RotatingText";

// Renamed component from Generate to GenerateForm
const GenerateForm = () => {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || ""); // Add fallback for safety
  const [pic, setpic] = useState(null);

  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setpic(file);
    }
  };

  const handleRemoveImage = () => {
    setpic(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (index, link, linktext) => {
    const newLinks = links.map((item, i) => {
      if (i === index) return { link, linkText: linktext };
      return item;
    });
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { link: "", linkText: "" }]);
  };

  const removeLink = (index) => {
    if (links.length <= 1) {
      toast.warn("At least one link is required.");
      return;
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const submitLinks = async () => {
    const formData = new FormData();
    formData.append("handle", handle);
    if (pic) {
      formData.append("pic", pic);
    }
    formData.append("links", JSON.stringify(links));

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        window.open(`/${handle}`, "_blank");
        // Clear the form after successful submission
        setHandle("");
        setLinks([{ link: "", linkText: "" }]);
        setpic(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting links:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
      <div className="bg-white h-screen grid grid-cols-2">
        <div className="col1 flex flex-col justify-center items-center gap-5">
          <ToastContainer />
  
          <Link href="/">
            <button className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15v-9.75"
                />
              </svg>
            </button>
          </Link>
          <h1 className="font-extrabold text-5xl text-black">Welcome to linkDo</h1>
          <RotatingText />
  
          <div className="">
            <input
              type="text"
              className="bg-gray-100 rounded-lg h-16 p-3 w-145 font-bold text-gray-500"
              placeholder="Enter your linkDo handle"
              value={handle}
              readOnly
            />
          </div>
  
          <p className="text-gray-500">Add a link to get started</p>
          {links &&
            links.map((items, index) => {
              return (
                <div className="flex gap-3.5" key={index}>
                  <input
                    type="text"
                    className="bg-gray-100 rounded-lg h-16 p-3 w-65 font-bold text-gray-500"
                    placeholder="Enter Link Name"
                    value={items.linkText || ""}
                    onChange={(e) => {
                      handleChange(index, items.link, e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="bg-gray-100 rounded-lg h-16 p-3 w-65 font-bold text-gray-500"
                    placeholder="Enter Link URL"
                    value={items.link}
                    onChange={(e) => {
                      handleChange(index, e.target.value, items.linkText);
                    }}
                  />
                  <button
                    className="p-2 bg-gray-100 text-gray-500 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => removeLink(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
  
          <button
            className="p-2 cursor-pointer bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={() => addLink()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
  
          <p className="text-gray-500">Add Profile Picture</p>
          <div>
            {/* Conditionally render the input or the file info */}
            {!pic ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef} // Attach the ref
                className="bg-gray-100 rounded-lg h-16 p-3 w-145 font-bold text-gray-500"
              />
            ) : (
              <div
                className="bg-gray-100 rounded-lg h-16 p-3 w-145 font-bold text-gray-500 relative"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span>{pic.name}</span>
                <button
                  className="absolute right-5 cursor-pointer"
                  onClick={handleRemoveImage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600 hover:text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
  
          <button
            className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-70 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
            onClick={() => {
              submitLinks();
            }}
            disabled={
              !handle ||
              links[links.length - 1].link === "" ||
              links[links.length - 1].linkText === ""
            }
            
          >
            continue
          </button>
        </div>
        <div className="col2 w-full min-h-screen bg-[#502274]">
          <img
            src="/generate.png"
            alt="login"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    );
};

export default GenerateForm;