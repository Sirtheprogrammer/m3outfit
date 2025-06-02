const IMGBB_API_KEY = 'c3df4b0447a2f2aa50f7185e702dab30';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export const uploadImage = async (file) => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('image', file);

    // Make API request to ImgBB
    const response = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error?.message || 'Failed to upload image');
    }

    // Return the image URL
    return data.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; 