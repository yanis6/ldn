import React from 'react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/20/solid';

const Pagination = ({
  itemsPerChunk,
  setItemPerChunk,
  currentChunk,
  setCurrentChunk,
  totalChunks,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="flex justify-end gap-x-4 items-center relative">
      <span className="mr-6">Rows per page: </span>
      <select
        value={itemsPerChunk}
        onChange={(e) => {
          setItemPerChunk(e.target.value);
        }}
        className="bg-gray-50"
      >
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <span>{`${
        Number(currentChunk) * Number(itemsPerChunk) + 1
      }-${Math.min(
        (Number(currentChunk) + 1) * Number(itemsPerChunk),
        totalChunks
      )} of ${totalChunks}`}</span>
      <button
        onClick={handlePrev}
        disabled={Number(currentChunk) === 0}
      >
        <ArrowLeftIcon
          className="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </button>
      <button
        onClick={handleNext}
        disabled={Number(currentChunk) === totalChunks - 1}
      >
        <ArrowRightIcon
          className="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default Pagination;
