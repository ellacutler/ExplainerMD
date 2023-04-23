import { useState } from 'react';
import { dateDisplay } from '../utils/dateDisplay';

import { Navbar } from "../components/Navbar";


const Journal = ({ user, allUsers }) => {

  const [count, setCount] = useState(0);
  const [tabKey, setTabKey] = useState("schedule");

  return (
    <div>
      <Navbar tab={'journal'}/>
      <div>
      <p>Patient Symptom Journal</p>
      {/* If we have time: Drug Journal is good to add too, 
      strengthen our point about the app improving patient+doctor communication
      and preventing polymedication issues.*/}
      <SymptomJournal allUsers={allUsers} user={user} />
      </div>


      
    </div>
  );
}

const SymptomJournalRow = (props) => {
  const { symptomObj } = props;
  return (
    <tr>
      <td className="px-4 py-4 text-sm bg-slate-50 text-black-500 whitespace-normal break-words">{symptomObj.SYMPTOM}</td>
      <td className="px-4 py-4 text-sm bg-slate-50 text-black-500 whitespace-normal break-words">{dateDisplay(symptomObj.TIME)}</td>
    </tr>
  );
}

const SymptomJournal = (props) => {
  const { allUsers, user } = props;
  // ok gotta use these in some sort of row thing

  return (
    <div className="inline-block min-w-full py-2 align-middle p-2">
      <div className="overflow-hidden border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black-500 bg-slate-100">
                Recorded Symptom
              </th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black-500 bg-slate-100">
                <div className="flex items-center gap-x-2">
                  <span>Date & Time</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {/* Rows of the Table */}

            {
              !allUsers || !allUsers[user.uid].symptoms || allUsers[user.uid].symptoms.length === 0 ? (
                <tr> <td> <span>No Recorded Symptom</span>s </td> </tr>
              ) : (
                allUsers[user.uid].symptoms.map((symptomObj, index) => (
                  <SymptomJournalRow 
                    key={index}
                    symptomObj={symptomObj} 
                  />
                ))
              )
            }



          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Journal