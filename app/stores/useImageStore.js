import { create } from "zustand";


const useImageStore = create((set) => ({
  selectedImages: [],
  artworkIds: [],

  addImage: (url) =>
    set((state) => ({
      selectedImages: [...state.selectedImages, url],
    })),
  removeImage: (url) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((img) => img !== url),
    })),

  addArtworkId: (id) =>
    set((state) => ({
      artworkIds: [...state.artworkIds, id],
    })),
  removeArtworkId: (id) =>
    set((state) => ({
      artworkIds: state.artworkIds.filter((artId) => artId !== id),
    })),

  clearImages: () => set({ selectedImages: [], artworkIds: [] }),
}));

export default useImageStore;