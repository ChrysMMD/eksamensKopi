import { create } from 'zustand';

const useImageStore = create((set) => ({
  selectedImages: [],
  setSelectedImages: (images) => set({ selectedImages: images }),
  addImage: (image) =>
    set((state) => ({
      selectedImages: [...state.selectedImages, image],
    })),
  removeImage: (image) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((img) => img !== image),
    })),
  clearImages: () => set({ selectedImages: [] }),
}));

export default useImageStore;
