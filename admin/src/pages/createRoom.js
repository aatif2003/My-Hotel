import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../Helper/Utils";
import { createRoom, reset } from "../features/room/roomSlice";

const CreateRoom = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.room);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [files, setFiles] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    roomNumbers: "401,203,232,145",
  });

  const { name, price, des, roomNumbers } = formData;

  // Track confirmed and unavailable dates per room number (as arrays of strings)
  const [confirmedDates, setConfirmedDates] = useState({});
  const [unavailableDates, setUnavailableDates] = useState({});

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      setFormData({ name: "", price: "", des: "", roomNumbers: "" });
      setFiles(null);
      setPreviewUrls([]);
      setConfirmedDates({});
      setUnavailableDates({});
      navigate("/dashboard");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    const previews = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  // Parse room numbers to array of numbers
  const parseRoomNumbers = () => {
    return roomNumbers
      .split(",")
      .map(num => num.trim())
      .filter(num => !isNaN(num))
      .map(num => parseInt(num, 10));
  };

  // Handle date changes per room and date type (confirmed/unavailable)
  const handleDateChange = (roomNumber, dateType, value) => {
    const datesArray = value
      .split(",")
      .map(d => d.trim())
      .filter(d => d.length > 0); // filter out empty

    if (dateType === "confirmed") {
      setConfirmedDates(prev => ({ ...prev, [roomNumber]: datesArray }));
    } else if (dateType === "unavailable") {
      setUnavailableDates(prev => ({ ...prev, [roomNumber]: datesArray }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!files || files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      const roomNums = parseRoomNumbers();

      // Merge confirmed/unavailable dates into room objects
      const roomArray = roomNums.map(number => ({
        number,
        confirmedDates: confirmedDates[number] || [],
        unavailableDates: unavailableDates[number] || [],
      }));

      // Upload images and get URLs
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const url = await uploadImage(file);
          return url;
        })
      );

      const dataToSubmit = {
        name,
        price,
        des,
        roomNumbers: roomArray,
        images: list,
      };

      await dispatch(createRoom(dataToSubmit));
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1 className="heading center" style={{ textAlign: "center", marginBottom: "2rem" }}>Create Room</h1>
      <div className="form-wrapper" style={{ background: "#f9f9f9", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
        <form onSubmit={handleSubmit}>

          <div className="input-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="name" style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter the room name"
              onChange={handleChange}
              style={{
                width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc",
                fontSize: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="price" style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter the room price"
              onChange={handleChange}
              style={{
                width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc",
                fontSize: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="des" style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Description</label>
            <textarea
              name="des"
              value={des}
              placeholder="Enter room description"
              onChange={handleChange}
              rows={4}
              style={{
                width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc",
                fontSize: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                resize: "vertical"
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="roomNumbers" style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Room Numbers</label>
            <textarea
              name="roomNumbers"
              value={roomNumbers}
              placeholder="Enter room numbers separated by commas (e.g., 202,203,204)"
              onChange={handleChange}
              rows={2}
              style={{
                width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc",
                fontSize: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                resize: "vertical"
              }}
            />
            <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {parseRoomNumbers().map((num) => (
                <span key={num} style={{
                  padding: "6px 12px",
                  background: "#e0e7ff",
                  color: "#1e40af",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}>
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Date inputs for each room */}
          {parseRoomNumbers().length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "1rem", fontWeight: "700" }}>Room Dates</h3>
              {parseRoomNumbers().map((roomNumber) => (
                <div key={roomNumber} style={{ marginBottom: "1.2rem", padding: "1rem", background: "#fff", borderRadius: "6px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                  <h4 style={{ marginBottom: "0.6rem", color: "#334155" }}>Room {roomNumber}</h4>
                  
                  <label style={{ fontWeight: "600", display: "block", marginBottom: "0.3rem" }}>Confirmed Dates (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025-06-01, 2025-06-05"
                    value={confirmedDates[roomNumber] ? confirmedDates[roomNumber].join(", ") : ""}
                    onChange={(e) => handleDateChange(roomNumber, "confirmed", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "0.95rem",
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      marginBottom: "0.8rem"
                    }}
                  />

                  <label style={{ fontWeight: "600", display: "block", marginBottom: "0.3rem" }}>Unavailable Dates (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025-06-10, 2025-06-15"
                    value={unavailableDates[roomNumber] ? unavailableDates[roomNumber].join(", ") : ""}
                    onChange={(e) => handleDateChange(roomNumber, "unavailable", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "0.95rem",
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="input-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="files" style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Images</label>
            <input
              type="file"
              name="files"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: "12px" }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {previewUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Preview"
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 0 4px rgba(0,0,0,0.2)" }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#94a3b8" : "#2563eb",
              color: "white",
              fontWeight: "700",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {isError && <p style={{ color: "red", marginTop: "1rem", fontWeight: "600" }}>{message}</p>}
      </div>
    </div>
  );
};

export default CreateRoom;

