import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function JournalInfo(props) {
  const { settings } = useContext(GlobalContext)
  return (
    <table className="journalInfo">
      <tbody>
        <tr>
          <td>
            {settings && settings.issn && settings.issn.split(",")[0]}
            <br />
            {settings && settings.issn && settings.issn.split(",")[1]}
          </td>
          <td>
            <a
              className="link"
              href={settings.rjif_link}
            >
              Research Journal
              <br />
              {settings.impactfactor}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            Indexed Journal <br /> Refereed Journal <br /> Peer Reviewed Journal
          </td>
          <td>
            Cover Page <br /> Index Page <br />
            Editorial Page
          </td>
        </tr>
      </tbody>
    </table>
  );
}
