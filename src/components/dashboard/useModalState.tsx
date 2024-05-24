// ModalState.tsx
import { useState } from "react";

const useModalState = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const displayIframe = (videoId: string) => {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
    setVideoUrl(youtubeEmbedUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setVideoUrl('');
    setShowModal(false);
  };

  return { videoUrl, showModal, displayIframe, closeModal };
};

export default useModalState;
