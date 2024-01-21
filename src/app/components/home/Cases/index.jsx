'use client'
import SearchBar from '@/app/components/home/SearchBar'
import Card from '@/app/components/home/CaseCard'
import { Client, Databases,Query} from 'appwrite';
export const client = new Client();
import { useEffect,useState } from 'react';

const Page = () => {
  const [caseData, setCases] = useState([]);
  const [displayData, setDisplay] = useState(false);
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



  let categories = [
    { name: "All Cases", id: 0 },
    { name: "Ongoing Cases", id: 1 },
    { name: "Settled Cases", id: 2 },
    { name: "Pending Cases", id: 3 },
    {name:"Civil Cases",id:4},
    {name:"Criminal Cases",id:5},
    // {name:"Category 3",id:5},
  ];

  const [currentCategory, change] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearchResults();
  }
  var updatedCaseData;

  const handleSearchResults = () => {
    change(-1);
  }

  const handleCategoryClick = (e) => {
    change(e.target.id);
  }

  let correctedCategory;
  if (currentCategory == -1) {
    correctedCategory = 0;
  }
  else {
    correctedCategory = currentCategory;
  }


  function cat(category, i) {
    if (correctedCategory == category.id) {
      return <button key={i} id={category.id} className='py-3 my-2 mr-4 pl-4 text-xl bg-[#DBE2EF] border-l-[5px] w-full text-left border-[#041C32]'>{category.name}</button>
    }
    return <button key={i} id={category.id} onClick={(handleCategoryClick)} className='py-3 my-2 mr-4 pl-4 text-xl bg-[#DBE2EF] border-l-[5px] w-full text-left border-[#DBE2EF] hover:border-[#041C32]'>{category.name}</button>
  }


  if (currentCategory == -1) {
    updatedCaseData = caseData.filter((data) =>
      data.caseId.toLowerCase().includes(searchKey.toLowerCase().trim()));
    console.log(searchKey + " old");
  }
  else if (currentCategory == 0) { updatedCaseData = caseData; }
  else if (currentCategory == 1) { updatedCaseData = caseData.filter(data => data.caseStatus == "Ongoing"); }
  else if (currentCategory == 2) { updatedCaseData = caseData.filter(data => data.caseStatus == "Settled"); }
  else if (currentCategory == 3) { updatedCaseData = caseData.filter(data => data.caseStatus == "Pending"); }
  else if (currentCategory == 4) { updatedCaseData = caseData.filter(data => data.caseType == "Civil"); }
  else if (currentCategory == 5) { updatedCaseData = caseData.filter(data => data.caseType == "Criminal"); }
  else { updatedCaseData = caseData.filter(data => data.category == categories[currentCategory].name); }


  const display=()=>{
    return <div className='w-[90%] md:w-[73%] p-0 md:p-4 mx-auto'>
    {
      updatedCaseData.map((data) => (
        <Card
          key={data._id}
          _id={data._id}
          litigantName={data.litigantName}
          dateOfCase={data.dateOfCase}
          caseId={data.caseId}
          caseType={data.caseType}
          caseStatus={data.caseStatus}
          opposingLitigant={data.opposingLitigant}
        />
      ))
    }
  </div>

  }


  return (
    <div>
      <p className='py-4 text-4xl text-center font-bold text-[#04434E]'>Delhi High Court Cases</p>
      <div className='w-[100%] md:w-[80%] mx-auto'>
        <div className='md:flex'>
          <div className='w-[80%] md:w-[27%] mx-auto'>
            <div>
              <SearchBar
                value={searchKey}
                formSubmit={handleSearchSubmit}
                handleSearchKey={e => setSearchKey(e.target.value)}
              />
              <div className='mt-6'>
                <h1 className='text-2xl text-[#064663] '>Case Categories</h1>
                <div className='w-32 h-[2px] ml-8 mt-2 rounded bg-[#064663]'></div>

              </div>

              <div className='pt-4'>
                {
                  categories.map((category, i) => (
                    cat(category, i)
                  ))
                }
              </div>
            </div>
          </div>
                {displayData ? display() : "Loading"}
        </div>
      </div>
    </div>
  )
}

export default Page