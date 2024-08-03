import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import { listPublicArchives } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";
import Indexing from "./Indexing";

export default function Archives(props) {
  const { settings } = useContext(GlobalContext);
  const [archives, setArchives] = useState([]);
  const [volList, setVolList] = useState([]);
  const [tableLength, setTableLength] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPublicArchives(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error);
      } else if (data) {
        setArchives(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    window.title = `Archives | ${settings.websitename}`;
  }, [settings]);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const months = [
  //   "Issue 1",
  //   "Issue 2",
  //   "Issue 3",
  //   "Issue 4",
  //   "Issue 5",
  //   "Issue 6",
  // ];
  // let volArr = [];
  // useEffect(() => {
  //   for (let i = 0; i < archives.length; i++) {
  //     if (volArr.length == 0) {
  //       volArr.push(archives[i].volume);
  //     } else {
  //       let checkPush = volArr.filter((val) => val == archives[i].volume);
  //       if (checkPush.length == 0) {
  //         volArr.push(archives[i].volume);
  //       }
  //     }
  //     volArr.sort((a, b) => a - b);
  //   }
  //   setVolList(volArr);
  //   let s = [];
  //   for (let i = 0; i < Math.ceil(archives.length / 6); i++) {
  //     s.push(6 * i);
  //   }
  //   setTableLength(s);
  // }, [archives]);
  // let issues = [
  //   "01",
  //   "02",
  //   "03",
  //   "04",
  //   "05",
  //   "06",
  //   // "07",
  //   // "08",
  //   // "09",
  //   // "10",
  //   // "11",
  //   // "12",
  // ];
  // console.log(archives);

  // * old code

  //   return (
  //     <div className="page">
  //       <PageTitle title="ARCHIVES" />
  //       {/* {archives.map((archive, index) => {
  //         return (
  //           <Frame key={`frame-${index}`} title={`${archive.year} ISSUES`}>
  //             <div className="issue-grid">
  //               {[...Array(archive.total_issues)].map((e, i) => {
  //                 const issueIndex = i + 1;
  //                 return (
  //                   <Link
  //                     key={`issue-${issueIndex}`}
  //                     to={`/archives/${archive.year}/vol${archive.volume}/issue${issueIndex}`}
  //                   >
  //                     <div className="issue">
  //                       VOL. {archive.volume} : ISSUE {issueIndex}
  //                     </div>
  //                   </Link>
  //                 );
  //               })}
  //             </div>
  //           </Frame>

  //         );
  //       })} */}

  //       // *old code

  //       {tableLength.map((table, tabInd) => {
  //         let start = table;
  //         return (
  //           <div class="flex flex-col">
  //             <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  //               <div class="inline-block max-w-auto py-2 sm:px-6 lg:px-8">
  //                 <div class="overflow-hidden">
  //                   <table class="min-w-full border-black text-center text-lg font-light dark:border-neutral-500">
  //                     <thead class="border-b font-medium dark:border-neutral-500">
  //                       <tr>
  //                         {/* <th
  //                           scope="col"
  //                           class="border-r px-6 py-4 dark:border-neutral-500"
  //                         >
  //                           Issues
  //                         </th> */}
  //                         {/* {volList.slice(tableLength[tabInd], tableLength[tabInd + 1]).map((val, ind) => {
  //                           return (
  //                             <th
  //                               scope="col"
  //                               class="border-2 px-10 py-4 dark:border-neutral-500 border-black bg-slate-300"
  //                             >
  //                              Volume {val}
  //                             </th>
  //                           );
  //                         })} */}
  //                         {volList
  //                           .slice(tableLength[tabInd], tableLength[tabInd + 1])
  //                           .map((val, ind) => {
  //                             let filteredArchives = archives.filter(
  //                               (item) => item.volume === val
  //                             );
  //                             if (filteredArchives.length > 0) {
  //                               return (
  //                                 <th
  //                                   scope="col"
  //                                   class="border-2 px-10 py-4 dark:border-neutral-500 border-black bg-slate-300"
  //                                 >
  //                                   {`Volume ${val}
  //                                   (${
  //                                     filteredArchives[
  //                                       filteredArchives.length - 1
  //                                     ].year
  //                                   })`}
  //                                 </th>
  //                               );
  //                             } else {
  //                               return (
  //                                 <th
  //                                   scope="col"
  //                                   class="border-2 px-10 py-4 dark:border-neutral-500 border-black bg-slate-300"
  //                                 >
  //                                   {`Volume ${val}`}
  //                                 </th>
  //                               );
  //                             }
  //                           })}
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {issues.map((val, ind) => {
  //                         return (
  //                           <tr class="border dark:border-neutral-500 border-black">
  //                             {/* <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
  //                               Issue {val}
  //                             </td> */}
  //                             {volList
  //                               .slice(
  //                                 tableLength[tabInd],
  //                                 tableLength[tabInd + 1]
  //                               )
  //                               .map((value, index) => {
  //                                 let n = archives.filter(
  //                                   (item) => item.volume == value
  //                                 );
  //                                 if (n.length > 0) {
  //                                   let a = ind + 1;
  //                                   if (n[n.length - 1]?.total_issues >= a) {
  //                                     return (
  //                                       <td
  //                                         class=" whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 border-black"
  //                                         style={{ color: "gray-600" }}
  //                                       >
  //                                         <Link
  //                                           to={`/archives/${
  //                                             n[n.length - 1].year
  //                                           }/vol${
  //                                             n[n.length - 1].volume
  //                                           }/issue${a}`}
  //                                         >
  //                                           {months[ind]}
  //                                         </Link>
  //                                       </td>
  //                                     );
  //                                   } else {
  //                                     // return (
  //                                     //   <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
  //                                     //     {months[ind]}
  //                                     //   </td>
  //                                     // );
  //                                   }
  //                                 }
  //                               })}
  //                           </tr>
  //                         );
  //                       })}
  //                     </tbody>
  //                   </table>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //       <Indexing />
  //     </div>
  //   );

  return (
    <>
      <div className="page">
        <PageTitle title="ARCHIVES" />

        {archives.map((archive, index) => {
          return (
            <Frame key={`frame-${index}`} title={`${archive.year} ISSUES `}>
              <div className="issue-grid">
                {[...Array(archive.total_issues)].map((e, i) => {
                  const issueIndex = i + 1;
                  return (
                    <Link
                      key={`issue-${issueIndex}`}
                      to={`/archives/${archive.year}/vol${archive.volume}/issue${issueIndex}`}
                    >
                      <div className="issue">
                        VOL. {archive.volume} : ISSUE {issueIndex}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Frame>
          );
        })}
      </div>
    </>
  );
}
