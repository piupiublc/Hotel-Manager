import { fetchClient } from "@/lib/api-client";

export const UploadService = {
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return await fetchClient<{ url: string }>('/upload', {
      method: 'POST',
      body: formData,
      // Note: fetchClient automatically handles FormData headers (removing Content-Type to let browser set boundary)
    });
  }
};
