'use client'
import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';

const Page = () => {
  const [caseData, setCases] = useState([]);
  const [selectedCases, setSelectedCases] = useState([]);
  const [displayData, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('legalsarthi');
  const databases = new Databases(client);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await databases.listDocuments('legalsarthi', 'cases');
        setCases(response.documents);
        setDisplay(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cases:', error);
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleCaseSelection = (caseId) => {
    const isSelected = selectedCases.includes(caseId);

    if (isSelected) {
      setSelectedCases((prevSelectedCases) => prevSelectedCases.filter((id) => id !== caseId));
    } else {
      setSelectedCases((prevSelectedCases) => [...prevSelectedCases, caseId]);
    }
  };

  const handleSendToAPI = () => {
    const selectedCaseDetails = caseData.filter((caseItem) => selectedCases.includes(caseItem.$id));
    var data="{caseData:'";
    for(var i=0;i<selectedCaseDetails.length;i++){
        data=data+'CaseID'+(i+1)+":"+selectedCaseDetails[i].casedescription+',';
    }
    data=data+"'}";
    console.log(data);
  };

  return (
    <div class="max-w-2xl mx-auto p-4 bg-gray-100 rounded-md shadow-md">
  <h1 class="text-2xl font-bold mb-4">Case Selection Page</h1>

  {isLoading ? (
    <p class="text-center">Loading cases...</p>
  ) : displayData ? (
    <div>
      <h2 class="text-lg font-semibold mb-2">Available Cases:</h2>
      <ul>
        {caseData.map((caseItem) => (
          <li key={caseItem.$id} class="mb-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                checked={selectedCases.includes(caseItem.$id)}
                onChange={() => handleCaseSelection(caseItem.$id)}
                class="mr-2"
              />
              <span class="text-gray-800">{caseItem.casedescription}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSendToAPI}
        disabled={selectedCases.length === 0}
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Prioritise Selected Cases
      </button>
    </div>
  ) : (
    <p class="text-center">No cases to display.</p>
  )}
</div>

  );
};

export default Page;
