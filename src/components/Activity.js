import React, { useState } from 'react';
import WorkItem from './WorkItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const Activity = ({ activityData, activityIndex, selectedItems, setSelectedItems,isLast,
  isSelected, selectedWorkItems, onSelectActivity, onSelectWorkItem,
 }) => {
  const { id, name,total, rate, workItems } = activityData;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="relative">
        <td className="pl-8 px-4 py-2">
        <div className="absolute left-6 top-0 h-full">
          <div className={`border-l-2 border-gray-300 h-1/2 ${isLast ? 'h-1/2' : ''}`}></div>
        </div>
        <div className="absolute left-6 top-1/2 w-4 border-t-2 border-gray-300"></div>
        <div className='flex'>

          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectActivity(e.target.checked)} className="form-checkbox ml-4 mr-4"
          />
          <div>{name}</div>
          </div>
        </td>
        <td className="text-left px-4 py-2">{rate}</td>
        <td className="text-left px-4 py-2">{total}</td>
        <td className="text-right px-4 py-2">
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
          </button>
        </td>
      </tr>

      {expanded && workItems.map((workItem, index) => (
        <WorkItem
          key={workItem.id}
          workItem={workItem}
          isSelected={selectedWorkItems[workItem.id] || false}
          onSelectWorkItem={(isSelected) => onSelectWorkItem(workItem.id, isSelected)}
          isLast={index === workItems.length - 1}
        />
      ))}
    </>
  );
};

export default Activity;
