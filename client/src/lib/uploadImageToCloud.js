export const uploadImageToCloud = async (file) => {
    if(!file) return alert("Please upload a banner image");
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("upload_preset", "porboshobai");
    formDataToSend.append("cloud_name", "ds0io6msx");
    const response = await fetch("https://api.cloudinary.com/v1_1/ds0io6msx/image/upload", {
      method: "POST",
      body: formDataToSend,
    });
    const imageData = await response.json();
    if(!imageData) return alert("Image upload failed");
    return imageData.url;
  }