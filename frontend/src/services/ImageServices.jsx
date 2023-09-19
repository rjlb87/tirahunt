import { toast } from 'react-toastify';

export const uploadFiles = async (id, files) => {
  try {
    if (files.length > 4) {
      toast.error('Maximum upload of 4 files exceeded');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('id', id);

    const response = await fetch('/api/v1/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      toast.success('Images uploaded successfully');
      return response.json();
    } else {
      toast.error('Error uploading images');
    }
  } catch (error) {
    console.error('Error uploading images', error);
    toast.error('Error uploading images');
    throw error;
  }
};
