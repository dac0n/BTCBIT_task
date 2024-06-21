import React, { useState, useRef } from 'react';

const CurrencyTable = ({ currencies, columnsAmount, onCurrencyRemove }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const highlightTimeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleMouseDown = (index: number) => {
    setHighlightedIndex(index);
    highlightTimeoutRef.current = setTimeout(() => {
      const currencyIndex = Math.floor(index / 2) * 2;
      onCurrencyRemove(currencyIndex);
      setHighlightedIndex(null);
    }, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(highlightTimeoutRef.current);
    setHighlightedIndex(null);
  };

  const renderColumns = (startIndex: number) => {
    const columns = [];
    for (let i = startIndex; i < startIndex + columnsAmount * 2; i += 2) {
      const currency = currencies[i];
      if (currency) {
        columns.push(
          renderCell(i, currency.currencyName, 'name'),
          renderCell(i + 1, currency.amount, 'balance')
        );
      }
    }
    return columns;
  };

  const renderCell = (index: number, content: string, type: 'name' | 'balance') => (
    <td
      key={`${type}-${index}`}
      className={`py-1 px-2 ${type === 'name' ? 'font-bold text-gray-700' : 'text-gray-700'} cursor-pointer ${
        hoveredIndex === index || (type === 'name' ? hoveredIndex === index + 1 : hoveredIndex === index - 1) ? 'bg-gray-200' : ''
      } ${highlightedIndex === index || (type === 'name' ? highlightedIndex === index + 1 : highlightedIndex === index - 1) ? 'highlight' : ''}`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => handleMouseDown(index)}
      onMouseUp={handleMouseUp}
    >
      {content}
    </td>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-gray-500 border-b-2 font-bold">
            {[...Array(columnsAmount * 2)].map((_, index) => (
              <th key={index} className="py-1 px-2 text-center">
                {index % 2 === 0 ? 'Name' : 'Balance'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currencies.map((_, index) => (
            index % (columnsAmount * 2) === 0 && (
              <tr key={index} className={index / (columnsAmount * 2) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                {renderColumns(index)}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;