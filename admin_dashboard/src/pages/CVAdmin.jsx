import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://<your-vercel-backend>.vercel.app";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatFileSize(sizeInBytes) {
  if (!sizeInBytes) return null;

  const units = ["B", "KB", "MB", "GB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function buildFileUrl(path) {
  if (!path) return "";
  const clean = String(path).replace(/\\/g, "/");
  if (/^https?:\/\//i.test(clean)) return clean;
  return `${BACKEND_URL}/${clean.replace(/^\//, "")}`;
}

function getErrorMessage(error, fallbackMessage) {
  return (
    error.response?.data?.error ||
    error.response?.data?.message ||
    fallbackMessage
  );
}

function CVAdmin() {
  const [cv, setCv] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("idle");

  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCV = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/api/cv`);
      setCv(data);
      setMessage("");
      setMessageType("idle");
    } catch (error) {
      console.error(error);
      setMessage(getErrorMessage(error, "Failed to load CV details."));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (
      selectedFile.type &&
      !ACCEPTED_FILE_TYPES.includes(selectedFile.type)
    ) {
      setFile(null);
      setMessage("Only PDF, DOC, and DOCX files are allowed.");
      setMessageType("error");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setMessage("File size must be 10MB or less.");
      setMessageType("error");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setMessage(`Selected file: ${selectedFile.name}`);
    setMessageType("success");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Choose a CV file before uploading.");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", file);

    try {
      setSubmitting(true);
      setMessage("");

      const method = cv ? "put" : "post";
      const { data } = await axios({
        method,
        url: `${BACKEND_URL}/api/cv`,
        data: formData,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setCv(data);
      setFile(null);
      setMessage(cv ? "CV updated successfully." : "CV uploaded successfully.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage(getErrorMessage(error, "Failed to save CV."));
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const currentFileUrl = buildFileUrl(cv?.path);

  return (
    <section className="max-w-5xl mx-auto text-white">
      <div className="page-header">
        <div>
          <h2>Manage CV</h2>
          <p className="text-sm text-white/60 mt-2 max-w-2xl">
            This page is connected to the backend CV model and route. It reads
            the latest uploaded document from <code>/api/cv</code> and sends a
            protected file upload using the <code>cvFile</code> field.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-blue-400">
            Current Record
          </h3>

          {loading ? (
            <p className="mt-6 text-white/60">Loading CV details...</p>
          ) : cv ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  File Name
                </p>
                <p className="mt-2 text-base font-medium break-all">
                  {cv.filename}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Stored Path
                  </p>
                  <p className="mt-2 text-sm text-white/80 break-all">
                    {cv.path}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Uploaded
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {cv.uploadedAt
                      ? new Date(cv.uploadedAt).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={currentFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-blue-500"
                >
                  Preview CV
                </a>
                <a
                  href={currentFileUrl}
                  download
                  className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  Download CV
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/20 p-5">
              <p className="text-white/70">
                No CV is stored yet. Upload one to create the first record in
                the database.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-blue-400">
            Upload CV
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/50">
                Select File
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
              />
            </label>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
              <p>Accepted formats: PDF, DOC, DOCX</p>
              <p>Maximum upload size: 10MB</p>
              {file && (
                <p className="mt-2 text-white">
                  Ready to upload: {file.name}
                  {file.size ? ` (${formatFileSize(file.size)})` : ""}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Uploading..."
                : cv
                  ? "Replace Current CV"
                  : "Upload CV"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                messageType === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CVAdmin;
