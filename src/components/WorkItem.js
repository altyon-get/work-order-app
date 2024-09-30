import React from 'react';

const WorkItem = ({
  workItem, isSelected, onSelectWorkItem, isLast

}) => {
  const {id, name, total} = workItem;

  return (
    <tr className="relative">
      <td className="pl-16 py-2 relative">
        <div className="absolute left-6 top-0 h-full">
          <div className={`border-l-2 border-gray-300 h-full ${isLast ? 'h-1/2' : ''}`}></div>
        </div>
        <div className="absolute left-10 top-0 h-full">
          <div className={`border-l-2 border-gray-300 h-1/2 ${isLast ? 'h-1/2' : ''}`}></div>
        </div>
        <div className="absolute left-10 top-1/2 w-4 border-t-2 border-gray-300"></div>
        <div className='flex'>

        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectWorkItem(e.target.checked)}
          className="form-checkbox ml-2 mr-4"
          />
        <div>{name}</div>
        </div>
      </td>
      <td></td>
      <td className="text-left px-4 py-2">{total}</td>
    </tr>
  );
};

export default WorkItem;
