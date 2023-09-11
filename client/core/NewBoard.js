import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import PageTitle from "./PageTitle";
import { listEditors } from '../helper/api-editors';


export default  function EditorialBoardTable() {
    const { settings } = useContext(GlobalContext);
    const [showEditors, setShowEditors] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        listEditors(signal).then((data) => {
            if (data && data.error) {
                console.error(data.error);
            } else if (data) {
                console.log(data);
                setShowEditors(
                    data.filter(
                        (editor) =>
                            editor.status === "enabled"
                    )
                );
            }
        });

        return function cleanup() {
            abortController.abort();
        };
    }, []);


    useEffect(() => {
        document.title = "Editorial Board | " + settings.websitename;
    }, [settings]);
    return (
        <div className="page">
            <PageTitle title="EDITORIAL BOARD" />
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    {showEditors.map((editor, index) => {
                        return (
                            <tr key={`showEditors-${index + 1}`} className={'index % 2 ===0  bg-white'} >
                                <td className="px-6 py-4 break-all  text-sm font-medium text-gray-900 ">
                                    {editor.name} {editor.post} {editor.content}  {editor.email}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editor.post}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editor.content}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editor.email}
                                </td> */}
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}


