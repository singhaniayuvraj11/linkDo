// app/edit/EditForm.js

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import { toast, ToastContainer } from "react-toastify";
import RotatingText from "@/components/RotatingText";

const EditForm = () => {
  const searchParams = useSearchParams();
  const handleParam = searchParams.get("handle");
  const newusername = searchParams.get("newusername");

  const [handle, setHandle] = useState(handleParam || "");
  const [newHandle, setNewHandle] = useState(newusername || handleParam || "");

  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [pic, setPic] = useState(null);
  const [initialPicUrl, setInitialPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  // Fetch existing user data
  useEffect(() => {
    const fetchData = async () => {
      if (!handleParam) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/get?handle=${handleParam}`);
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.data?.links) && data.data.links.length > 0) {
            setLinks(data.data.links);
          } else {
            setLinks([{ link: "", linkText: "" }]);
          }
          setHandle(data.data.handle || handleParam);
          setNewHandle(data.data.handle || handleParam); // Also update newHandle
          if (data.data.pic) {
            setInitialPicUrl(`data:image/jpeg;base64,${data.data.pic}`);
          }
        } else {
          toast.error(data.message || "Failed to fetch data.");
        }
      } catch (err) {
        toast.error("Error fetching profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handleParam]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPic(file);
  };

  const handleRemoveImage = () => {
    setPic(null);
    setInitialPicUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChange = (index, link, linkText) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { link, linkText } : item))
    );
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

  const updateLinks = async () => {
    const formData = new FormData();
    formData.append("handle", handleParam); // Always use original handle to find user
    formData.append("newHandle", newHandle);
    formData.append("links", JSON.stringify(links));
    if (pic) formData.append("pic", pic);

    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        toast.success("✅ Profile updated!");
        setHandle(newHandle);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("❌ Update failed.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in space-y-4">
          <svg
            className="animate-spin h-10 w-10 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <div className="text-lg font-semibold text-gray-700">
            Getting things ready...
          </div>
          <div className="text-sm text-gray-500">Please wait a moment</div>
        </div>
      </div>
    );
  }

  return (
      <div className="bg-white h-screen grid grid-cols-2">
        <div className="col1 flex flex-col justify-center items-center gap-5 bg-white">
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
          <h1 className="font-extrabold text-5xl text-black">Update your LinkDo</h1>
          <RotatingText />
          <input
            type="text"
            value={newHandle}
            readOnly
            className="bg-gray-100 rounded-lg h-16 p-3 w-145 font-bold text-gray-500 hover:cursor-not-allowed"
          />
  
          <p className="text-gray-500">Edit your links</p>
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
            className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={addLink}
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
          <p className="text-gray-500">Update Profile Picture</p>
          <div>
            {pic ? (
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
            ) : initialPicUrl ? (
              <div className="relative bg-gray-100 p-3 rounded-lg h-16 flex items-center w-145">
                <img src={initialPicUrl} alt="Preview" className="h-10 mr-3" />
                <span>Current Profile Pic</span>
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
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef} // Attach the ref
                className="bg-gray-100 rounded-lg h-16 p-3 w-145 font-bold text-gray-500"
              />
            )}
          </div>
          <button
            onClick={updateLinks}
            disabled={!handle || links.some((l) => !l.link || !l.linkText)}
            className=" mb-4 cursor-pointer w-70 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
  
        
        <div className="col2 w-full min-h-screen bg-[#502274]">
          <img
            src="/generate.png"
            alt="update"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    );
};

export default EditForm;
