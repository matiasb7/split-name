import {useState} from "react";

export function useDragAndDrop(dropCallback) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    dropCallback(e)

  }

  return {
    isDragActive,
    handleDragEnter,
    handleDrop,
    handleDragLeave,
    handleDragOver
  }
}