import React, { useState } from "react";
import Package from "./Package";
import data from "../data";
import { useEffect } from "react";

const WorkOrder = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const [selectedPackages, setSelectedPackages] = useState([]);

  useEffect(() => {
    const initialSelectedPackages = {};
    data.packages.forEach((pkg) => {
      initialSelectedPackages[pkg.id] = {
        selected: false, 
        activities: pkg.activities.reduce((acc, activity) => {
          acc[activity.id] = {
            selected: false, 
            workItems: activity.workItems.reduce((itemAcc, item) => {
              itemAcc[item.id] = false;
              return itemAcc;
            }, {})
          };
          return acc;
        }, {})
      };
    });
    setSelectedPackages(initialSelectedPackages);
  }, []);

  const handleSelectAll = (isSelected) => {
    const newSelectedPackages = {};
    data.packages.forEach((pkg) => {
      newSelectedPackages[pkg.id] = {
        selected: isSelected,
        activities: pkg.activities.reduce((acc, activity) => {
          acc[activity.id] = {
            selected: isSelected,
            workItems: activity.workItems.reduce((itemAcc, item) => {
              itemAcc[item.id] = isSelected;
              return itemAcc;
            }, {})
          };
          return acc;
        }, {})
      };
    });
    setSelectedPackages(newSelectedPackages);
  };

  const handleSelectPackage = (packageId, isSelected) => {
    setSelectedPackages((prev) => ({
      ...prev,
      [packageId]: {
        selected: isSelected,
        activities: Object.keys(prev[packageId]?.activities || {}).reduce((acc, activityId) => {
          acc[activityId] = {
            selected: isSelected,
            workItems: Object.keys(prev[packageId].activities[activityId].workItems).reduce((itemAcc, itemId) => {
              itemAcc[itemId] = isSelected;
              return itemAcc;
            }, {})
          };
          return acc;
        }, {})
      }
    }));
  };

  const handleSelectActivity = (packageId, activityId, isSelected) => {
    setSelectedPackages((prev) => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        activities: {
          ...prev[packageId].activities,
          [activityId]: {
            selected: isSelected,
            workItems: Object.keys(prev[packageId].activities[activityId].workItems).reduce((acc, itemId) => {
              acc[itemId] = isSelected;
              return acc;
            }, {})
          }
        }
      }
    }));
  };

  const handleSelectWorkItem = (packageId, activityId, workItemId, isSelected) => {
    setSelectedPackages((prev) => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        activities: {
          ...prev[packageId].activities,
          [activityId]: {
            ...prev[packageId].activities[activityId],
            workItems: {
              ...prev[packageId].activities[activityId].workItems,
              [workItemId]: isSelected
            }
          }
        }
      }
    }));
  };



  return (
    <div>
      <div className="tabs mb-4 border-b">
        <button
          className={`py-2 px-4 border-b-2 ${
            currentTab === "overview" ? "border-black" : "border-transparent"
          } text-gray-600`}
          onClick={() => setCurrentTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            currentTab === "other" ? "border-black" : "border-transparent"
          } text-gray-600`}
          onClick={() => setCurrentTab("other")}
        >
          Other
        </button>
      </div>

      {currentTab === "overview" && (
        <table className="table-auto w-full border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left px-4 py-2 flex">
                <input
                  type="checkbox"
                  checked={Object.keys(selectedPackages).length > 0 && Object.values(selectedPackages).every((pkg) => pkg.selected)}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="form-checkbox ml-2 mr-4"
                />
                <div>Packages</div>
              </th>
              <th className="text-left px-4 py-2 min-w-[132px]">
                Rate <span className="text-gray-500 italic">(in sqft)</span>
              </th>
              <th className="text-left px-4 py-2">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.packages.map((pkg) => (
              <Package
                key={pkg.id}
                packageData={pkg}
                isSelected={selectedPackages[pkg.id]?.selected || false}
                selectedActivities={selectedPackages[pkg.id]?.activities || {}}
                onSelectPackage={(isSelected) => handleSelectPackage(pkg.id, isSelected)}
                onSelectActivity={handleSelectActivity}
                onSelectWorkItem={handleSelectWorkItem}
              />
            ))}
          </tbody>
        </table>
      )}

      {currentTab === "other" && (
        <div className="p-4">
          <p>Hello World!</p>
        </div>
      )}
    </div>
  );
};

export default WorkOrder;
