import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Indexing(props) {
  const { settings } = useContext(GlobalContext)

  useEffect(() => {
    document.title = 'Indexing | ' + settings.journal_name
  }, [settings])

  return (
    <div id="indexing">
      <table>
        <tbody>
          <tr>
            <td>
              <a href="https://portal.issn.org/resource/issn/2349-4182">
                <img src='assets/images/IMG_20180515_124422.png' alt="ISSN" />
              </a>
            </td>
            <td>
              <a href="https://www.citefactor.org/journal/index/22808/international-journal-of-multidisciplinary-research-and-development#.XGeUt-gzbIU">
                <img
                  src="assets/images/IMG_20180515_122817.jpg"
                  alt="Cite Factor"
                />
              </a>
            </td>
            <td>
              <a href="https://www.crossref.org/titleList/">
                <img
                  src="assets/images/IMG_20180515_124914.jpg"
                  alt="Cross Ref"
                />
              </a>
            </td>
            </tr>
            <tr>
            <td>
              <a href="https://scholar.google.com/citations?user=2bLpYMAAAAAJ&amp;hl=en">
                <img
                  src="assets/images/IMG_20180515_011518.jpg"
                  alt="Google Scholar"
                />
              </a>
            </td>
            <td>
              <a href="https://journals.indexcopernicus.com/search/details?id=42416">
                <img
                  src="assets/images/IMG_20180515_125023.jpg"
                  alt="Index Copernicus"
                />
              </a>
            </td>
            <td>
              <a href="https://publons.com/journal/55858/international-journal-of-multidisciplinary-researc">
                <img src="assets/images/IMG_20201021_124749.png" alt="publoans" />
              </a>
            </td>
            </tr>
            <tr>
            <td>
              <a href="https://portal.issn.org/resource/issn/2349-4182">
                <img src="assets/images/IMG_20180515_124531.jpg" alt="ROAD" />
              </a>
            </td>
            <td>
              <img src="assets/images/IMG_20180515_123110.jpg" alt="Cite Seer" />
            </td>
            <td>
              <img
                src="assets/images/IMG_20180515_125402.png"
                alt="Open Access"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
