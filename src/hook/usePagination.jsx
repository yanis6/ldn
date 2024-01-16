import { useState, useEffect } from 'react';

const usePagination = (items, itemsPerChunk) => {
  const [currentChunk, setCurrentChunk] = useState(0);
  const [currentChunkData, setCurrentChunkData] = useState([]);

  useEffect(() => {
    const startIdx = Number(currentChunk) * Number(itemsPerChunk);
    const endIdx = Number(startIdx) + Number(itemsPerChunk);

    const chunkData = items.slice(startIdx, endIdx);
    setCurrentChunkData(chunkData);
  }, [currentChunk, items, itemsPerChunk]);

  const handleNext = () => {
    if (currentChunk < Math.ceil(items.length / itemsPerChunk) - 1) {
      setCurrentChunk((prevChunk) => prevChunk + 1);
    }
  };

  const handlePrev = () => {
    if (currentChunk > 0) {
      setCurrentChunk((prevChunk) => prevChunk - 1);
    }
  };

  return {
    currentChunkData,
    currentChunk,
    setCurrentChunk,
    totalChunks: Math.ceil(items.length),
    handleNext,
    handlePrev,
  };
};

export default usePagination;
