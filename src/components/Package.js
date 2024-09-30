import React, { useState } from 'react';
import Activity from './Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


const Package = ({ packageData, isSelected, onSelectPackage,
  selectedActivities, onSelectActivity, onSelectWorkItem
 }) => {
  const {id, name, rate, total, activities } = packageData;
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <tr className="">
        <td className="px-4 py-2 flex">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectPackage(e.target.checked)}
            className="form-checkbox ml-2 mr-4"
          />
          <div>{name}</div>
        </td>
        <td className="text-left px-4 py-2">{rate}</td>
        <td className="text-left px-4 py-2">{total}</td>
        <td className="text-right px-4 py-2">
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <FontAwesomeIcon icon={faMinus} className="text-teal-400" /> : <FontAwesomeIcon icon={faPlus} className="text-teal-500" />}

          </button>
        </td>
      </tr>

      {expanded && (
        <>
          
          {activities.map((activity, index) => (
            <Activity
            key={activity.id}
            activityData={activity}
            isSelected={selectedActivities[activity.id]?.selected || false}
            selectedWorkItems={selectedActivities[activity.id]?.workItems || {}}
            onSelectActivity={(isSelected) => onSelectActivity(id, activity.id, isSelected)}
            onSelectWorkItem={(workItemId, isSelected) => onSelectWorkItem(id, activity.id, workItemId, isSelected)}
            isLast={index === activities.length - 1}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Package;
