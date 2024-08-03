import React, { useContext, useEffect } from 'react'

const SubmitManuscript = () => {

  return (
    <>
      <div>
        <div className='mt-5 text-3xl font-bold text-center text-grey bg-purple '>SUBMIT RESEARCH PAPER - Submission Form</div>

        <div className='p-10 mt-5 overflow-hidden bg-white border-2 border-gray-300' >
          <div className="grid grid-cols-1 gap-4">

            <div>Manuscript Title*</div>
            <input className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 mb-4`} />
          </div>
          <div >
            <div>Author Names*</div>
            <input className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 mb-4`} />
          </div>
          <div >
            <div>
              <div>Email Address*</div>
              <input className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 mb-4`} />

            </div>
          </div>
          <div >

            <div>Phone Number*</div>
            <input className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 mb-4`} />

          </div>
          <div >

            <div>Total No. Of Authors*</div>
            <textarea id="message" rows="4" placeholder="For Ex-5" class="w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 mb-4"></textarea>

          </div>
          <div >

            <div>Article Type*</div>
            <select className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 mb-4`}>
              <option value="1">Research Paper</option>
              <option value="2">Review Paper</option>
              <option value="3">Case Study</option>
              <option value="4">Thesis</option>
            </select>

          </div>
          <div >


            <div>DOI*</div>
            <select className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 mb-4`}>
              <option value="1">NO</option>
              <option value="2">YES 200/- INR Extra Charges</option>

            </select>
          </div>
          <div>


            <div>Select Stream*</div>
            <select className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 mb-4`}>
              <option value="1">Engineering</option>
              <option value="2">Management</option>
              <option value="1">Science</option>
              <option value="2">Others</option>
            </select>
          </div>
          <div >


            <div>Select Area*</div>
            <select className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 mb-4`}>
              <option value="1">Aeronautical Engineering</option>
              <option value="2">Aerospace Engineering</option>
              <option value="3">Agriculture Engineering</option>
              <option value="4">Automobile Engineering</option>
              <option value="5">Bio Technology</option>
              <option value="6">Bio Medical Engineering</option>
              <option value="7">Ceramic Engineering</option>
              <option value="8">Chemical Engineering</option>
              <option value="9">Civil Engineering</option>
              <option value="10">Computer Science & Engineering</option>
              <option value="11">Earthquake Engineering</option>
              <option value="12">Electrical Engineering</option>
              <option value="13"> Electronics & Communication Engineering</option>
              <option value="14">Environmental Engineering</option>
              <option value="15">Fire Engineering</option>
              <option value="16">Food Technology</option>
              <option value="17">Forensic Science & Technology</option>
              <option value="18">Genetic Engineering</option>
              <option value="19">Industrial Engineering</option>
              <option value="20">Instrumentation Engineering</option>
              <option value="21">Information Technology</option>
              <option value="22">Manufacturing Engineering</option>
              <option value="23">Marine Engineering</option>
              <option value="24">Material Engineering</option>
              <option value="25">Mechanical Engineering</option>
              <option value="26">Metallurgical Engineering</option>
              <option value="27">Mining Engineering</option>
              <option value="28">Nanotechnology</option>
              <option value="29">Network Engineering</option>
              <option value="30">Nuclear Engineering</option>
              <option value="31">Ocean Engineering</option>
              <option value="32">Petroleum Engineering</option>
              <option value="33">Production Engineering</option>
              <option value="34">Polymer Engineering</option>
              <option value="35">Rubber Technology</option>
              <option value="36">Safety Engineering</option>
              <option value="37">Software Engineering</option>
            </select>
          </div>
          <div>


            <div>Upload Research Paper*</div>
            <input
              type="file"
              accept="application/pdf"
              className={`w-full bg-white border-2 border-gray-300 rounded  p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-gray-100 mb-4`}
            />
          </div>

          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>


          <div className="flex gap-4 mt-4">
            <button
              className="p-2 mb-2 text-gray-100 rounded w-60 bg-sky-600"
            >
              Submit Research Paper
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitManuscript