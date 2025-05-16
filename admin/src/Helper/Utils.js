export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const uploadPreset = 'hotelapp_unsigned_upload'; // MANUALLY type your preset
  const cloudName = 'dclfmcmb1'; // your real Cloudinary cloud name

  formData.append("upload_preset", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log('Cloudinary response:', data);

    if (!res.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
