'use client'
import { FaCalendar } from "react-icons/fa";
import Link from "next/link";

export default function index(caseData) {
  return (
      <div className='font-defaultFont w-[90%] md:w-[750px] md:h-[220px] bg-[#f5f5f5] p-4 mt-6 mx-auto md:flex shadow-lg' >
        <div className='w-full px-4'>
          <div className="flex justify-between">
          <h1 className='font-bold text-[20px] md:text-[23px] '>{caseData.litigantName} vs {caseData.opposingLitigant}</h1>
          <h1 className=''>Case ID: {caseData.caseId}</h1>
          </div>
          <div className='mt-2'>
                <h3 className="text-sm">Case Type: {caseData.caseType}</h3>
            </div>
            <div className="mt-3 flex">
                <FaCalendar className="w-[20px] h-[20px] text-[#3F72AF]" />
                    <div className='ml-2'>
                      <h2 className="text-sm">{caseData.dateOfCase}</h2>
                    </div>
            </div>

            <div className='flex justify-between ease-in-out duration-300 mt-6'>
              {
                caseData.caseStatus == "Ongoing" && <button className='rounded-full py-2 px-4 ease-in-out duration-300 text-white bg-[#064663]'>{caseData.caseStatus} Case</button>
              }
              {
                caseData.caseStatus == "Settled" && <button className='rounded-full py-2 px-4 ease-in-out duration-300 text-black bg-[#DBE2EF]'>{caseData.caseStatus} Case</button>
              }
              {
                caseData.caseStatus == "Pending" && <button className='rounded-full py-2 px-4 ease-in-out duration-300 text-white bg-[#3F72AF]'>{caseData.caseStatus} Case</button>
              }
              <Link href={`/events/${caseData.litigantName}`}><button className='rounded-lg py-3 px-6 ease-in-out duration-300 text-white bg-[#3F72AF] hover:bg-[#064663]'>View</button></Link>
            </div>
        </div>
      </div>
  )
}