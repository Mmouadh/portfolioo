import { useState, useEffect } from "react";

function AboutAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    subheading: "",
    heading1: "",
    heading2: "",
    location: "",
    status: "",
    specs: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let isMounted = true;

    const fetchAbout = async () => {
      try {
        setStatus("loading");

        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/about", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (isMounted && data) {
          setFormData({
            name: data.name || "",
            title: data.title || "",
            bio: data.bio || "",
            subheading: data.subheading || "",
            heading1: data.heading1 || "",
            heading2: data.heading2 || "",
            location: data.location || "",
            status: data.status || "",
            specs: Array.isArray(data.specs) ? data.specs : []
          });

          if (data.image) {
            setPreview(`http://localhost:5000${data.image}`);
          }

          setStatus("idle");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) setStatus("error");
      }
    };

    fetchAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("bio", formData.bio);
    data.append("subheading", formData.subheading);
    data.append("heading1", formData.heading1);
    data.append("heading2", formData.heading2);
    data.append("location", formData.location);
    data.append("status", formData.status);
    data.append("specs", JSON.stringify(formData.specs));

    if (imageFile) {
      data.append("image", imageFile);
    }

    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    fetch("http://localhost:5000/api/about", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then(() => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white bg-[#0f0f0f] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 italic uppercase tracking-widest">
        System Config // About_Section
      </h2>

      {status === "loading" && <p className="text-blue-400 animate-pulse">Synchronizing Data...</p>}
      {status === "success" && <p className="text-green-400">Database Updated Successfully</p>}
      {status === "error" && <p className="text-red-500">Error: System Link Failed</p>}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col text-xs text-white/40 uppercase tracking-tighter">
            Full Name
            <input
              className="bg-white/5 border border-white/10 p-2 mt-1 rounded text-white outline-none focus:border-blue-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col text-xs text-white/40 uppercase tracking-tighter">
            Professional Title
            <input
              className="bg-white/5 border border-white/10 p-2 mt-1 rounded text-white outline-none focus:border-blue-500"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="flex flex-col text-xs text-white/40 uppercase tracking-tighter">
          Personal Bio
          <textarea
            className="bg-white/5 border border-white/10 p-2 mt-1 rounded h-32 text-white outline-none focus:border-blue-500"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="bg-white/5 border border-white/10 p-2 rounded text-white outline-none"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            placeholder="Subheading"
          />

          <input
            className="bg-white/5 border border-white/10 p-2 rounded text-white outline-none"
            name="heading1"
            value={formData.heading1}
            onChange={handleChange}
            placeholder="Heading 1"
          />

          <input
            className="bg-white/5 border border-white/10 p-2 rounded text-white outline-none"
            name="heading2"
            value={formData.heading2}
            onChange={handleChange}
            placeholder="Heading 2"
          />
        </div>

        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mt-8">
          Technical Specifications
        </h3>

        <div className="space-y-2">
          {formData.specs.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 p-2 rounded text-sm outline-none"
                placeholder="Label"
                value={spec.label || ""}
                onChange={(e) =>
                  handleSpecChange(index, "label", e.target.value)
                }
              />
              <input
                className="flex-1 bg-white/5 border border-white/10 p-2 rounded text-sm outline-none"
                placeholder="Value"
                value={spec.value || ""}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-8 p-4 border border-dashed border-white/10">
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-xs font-bold transition-all">
            CHOOSE IMAGE
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 object-cover rounded border border-white/20"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-black py-4 uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all"
        >
          Commit Changes
        </button>
      </form>
    </div>
  );
}

export default AboutAdmin;