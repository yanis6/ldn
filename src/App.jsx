import classNames from 'classnames';
import { useState, useEffect } from 'react';
import Pagination from './components/pagination';
import usePagination from './hook/usePagination';
import SearchComponent from './components/searchComponents';
import useFetch from './hook/useFetch';
import {
  calculateTotalStats,
  calculateMinMaxPower,
} from './utils/util';

import './App.css';
import {
  HeartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
function App() {
  const [itemsPerChunk, setItemPerChunk] = useState(5);
  const [maxPower, setMaxPower] = useState(0);
  const [minPower, setMinPower] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchPower, setSearchPower] = useState('');

  const { data, loading, error } = useFetch('./pokemon.json');
  const {
    currentChunkData,
    currentChunk,
    setCurrentChunk,
    totalChunks,
    handleNext,
    handlePrev,
  } = usePagination(data, itemsPerChunk);
  const [filteredData, setFilteredData] = useState(currentChunkData);

  const filterDataByName = () => {
    if (typeof searchName !== 'undefined' && searchName !== '') {
      const filtered = currentChunkData.filter((item) => {
        const nameValue =
          item.name && item.name.toString().toLowerCase();
        return (
          nameValue && nameValue.includes(searchName.toLowerCase())
        );
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(currentChunkData);
    }
  };

  const filterByPowerThreshold = () => {
    if (typeof searchPower !== 'undefined' && searchPower !== '') {
      const powerThreshold = parseInt(searchPower, 10);
      const filtered = filteredData.filter((item) => {
        const powerValue = calculateTotalStats(item);
        return powerValue >= powerThreshold;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(currentChunkData);
    }
  };

  useEffect(() => {
    setFilteredData(currentChunkData);
  }, [currentChunkData]);

  useEffect(() => {
    filterDataByName();
  }, [searchName, setSearchName]);

  useEffect(() => {
    filterByPowerThreshold();
  }, [searchPower, setSearchPower]);

  useEffect(() => {
    calculateMinMaxPower(currentChunkData, setMinPower, setMaxPower);
  }, [currentChunkData]);

  return (
    <>
      <div>
        <div className="w-full flex-col shadow-md p-6 mb-16 rounded-md ">
          <div className="w-full flex flex-1 gap-x-4">
            <SearchComponent
              onSearch={setSearchName}
              Icon={MagnifyingGlassIcon}
              placeholder="search"
            />
            <SearchComponent
              onSearch={setSearchPower}
              Icon={HeartIcon}
              placeholder="Power threshold "
            />
          </div>
          <div className="w-full flex flex-col items-start font-semibold">
            <span>Min power : {minPower}</span>
            <span>Max power : {maxPower}</span>
          </div>
        </div>

        <div className="ring-1 ring-gray-300 rounded-lg bg-gray-200 shadow-sm mb-4">
          {loading ? (
            <div className="p-4 text-center text-gray-100">
              Loading...
            </div>
          ) : (
            <table className="min-h-full divide-y divide-gray-300 w-full text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold text-gray-400 "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="p-3 text-sm font-bold  text-gray-400"
                  >
                    type
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    health
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    attack
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    defense
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    special_attack
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    special_defense
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    speed
                  </th>
                  <th
                    scope="col"
                    className="p-3  text-sm font-bold  text-gray-400"
                  >
                    Power
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((item, itemIdx) => (
                  <tr key={item.id}>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.id}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.name}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.type.map((i, iIdx) =>
                          iIdx !== item.type.length - 1 ? (
                            <span key={iIdx}>{i}, </span>
                          ) : (
                            <span key={iIdx}>{i} </span>
                          )
                        )}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.hp}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.attack}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.defense}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.special_attack}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.special_defense}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {item.speed}
                      </div>
                    </td>

                    <td
                      className={classNames(
                        itemIdx === 0
                          ? ''
                          : 'border-t border-transparent',
                        'relative p-4 text-sm'
                      )}
                    >
                      <div className="font-medium text-gray-700">
                        {calculateTotalStats(item)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Pagination
          itemsPerChunk={itemsPerChunk}
          setItemPerChunk={setItemPerChunk}
          currentChunk={currentChunk}
          setCurrentChunk={setCurrentChunk}
          totalChunks={totalChunks}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </>
  );
}

export default App;
