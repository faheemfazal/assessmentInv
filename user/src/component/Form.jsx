import React, { useEffect, useState } from "react";
import DetailTable from "./DetailTable";
import { axiosuser } from "../Asios/axios";

function Form() {
  const [headerData, setHeaderData] = useState({
    status: "",
    vrNo: "",
    acName: "",
    acAmount: "",
    vrDate: new Date().toISOString().split("T")[0],
  });
  const [details, setDetails] = useState([{ srNo: 1 }]);
  const [validationErrors, setValidationErrors] = useState({});
  const [load,setLoad] = useState(false)
  const [headerFix,setHeaderFix] = useState(false)
  const [oldDetails,setOldDetails] = useState([])

  useEffect(()=>{},[load])

  const handleHeaderData = (e) => {
    const { name, value } = e.target;
    setHeaderData((prevHeaderData) => ({
      ...prevHeaderData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    // setValidationErrors({});

    const errors = {};
    

    if (!headerData.status || headerData.status.length !== 1) {
      // setValidationErrors((prevErrors) => ({
      //   ...prevErrors,
      //   status: "Status should be a single letter",
      // }));

      errors.status = "Status should be a single letter"
    }

    // const requiredFields = ["vrNo", "acName", "acAmount"];
    
    if (headerData.vrNo ==='') {
      errors.vrNo = 'VR number is required';
    }
    if (headerData.acName ==='') {
      errors.acName = 'AC name is required';
    }
    if (headerData.acAmount ==='') {
      errors.acAmount = 'AC amount is required';
    }


    setValidationErrors(errors)

  
    // for (const field of requiredFields) {
    //   if (!headerData[field]) {
    //     setValidationErrors((prevErrors) => ({
    //       ...prevErrors,
    //       [field]: `${field} is required`,
    //     }));
        
    //   }
    // }
    // setLoad(!load)
    // console.log(validationErrors,';;;');

    return Object.keys(errors).length === 0;
  };

  const handInsert =async () => {
    let validationRes = validateInputs()
    
    if(validationRes){
      console.log('ppppppp9999999999');
      const response = await axiosuser({
        url: '/header',
        method: 'POST',
        data:headerData
      })
      console.log(response,';;;;;;;;;;;;');
      if(response.status === 200){
        setOldDetails(response.data?.details)
        setHeaderFix(true)
        setLoad(!load)
        
      }else{

      }

    }

    


  };

  return (
    <>
    
      <div className="p-12 sm:px-12 lg:px-52 w-full ">
        <div className="sm:absolute sm:hidden flex justify-end items-center w-full  ">
          <div className="w-[120px]">
            <p className="font-semibold text-sm  text-">STATUS</p>
            <input
              type="text"
              name="status"
              value={headerData.status}
              onChange={handleHeaderData}
              className="p-2 mb-2 text-end w-full items-end rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold "
              placeholder={`${validationErrors.status ?
                validationErrors.status : ''}
              `}
            />
            {validationErrors.status && (
              <p className="text-red-500">{validationErrors.status}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 grid-cols-2 sm:gap-16 mx-auto mb-4">
          <div>
            <p className="font-semibold text-sm  text-">VR NUMBER</p>
            <input
              type="number"
              name="vrNo"
              onChange={handleHeaderData}
              value={headerData.vrNo}
              className="p-2 mb-2 w-full  rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold"
              placeholder={`${validationErrors.vrNo ?
                validationErrors.vrNo : ''}
              `}
            />
           
          </div>
          <div>
            <p className="font-semibold text-sm  text-">VR DATE</p>
            <input
              type="date"
              name="vrDate"
              onChange={handleHeaderData}
              value={headerData.vrDate}
              className="p-2 mb-2 w-full  rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold"
           
            />
           
          </div>
          <div className="sm:static sm:visible invisible absolute justify-end">
            <h1 className="font-semibold text-sm  ">STATUS</h1>
            <input
              type="text"
              name="status"
              onChange={handleHeaderData}
              value={headerData.status}
              className="p-2 mb-2 w-full rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold"
              placeholder={`${validationErrors.status ?
                  validationErrors.status : ''}
                `}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 mx-auto mb-4 gap-4 sm:gap-16 ">
          <div>
            <p className="font-semibold text-sm  text-">AC NAME</p>
            <input
              name="acName"
              onChange={handleHeaderData}
              value={headerData.acName}
              type="text"
              className="p-2 mb-2 w-full rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold"
              placeholder={`${validationErrors.acName ?
                validationErrors.acName : ''}
              `}
            />
        
          </div>
          <div className="w-full">
            
            <p className="font-semibold text-sm text-end  pr-24">AC AMOUNT</p>
            <div className="w- flex justify-end ">
              <input
                name="acAmount"
                onChange={handleHeaderData}
                value={headerData.acAmount}
                type="number"
                className="p-2 mb-2 w-[120]  rounded-full mt-2 border-[#6ea864] border-2 text-sm h-10  outline-none placeholder-red-500 placeholder:font-semibold"
                placeholder={`${validationErrors.acAmount ?
                  validationErrors.acAmount : ''}
                `}
              />
              {/* {validationErrors.acAmount && (
                <p className="text-red-500">{validationErrors.acAmount}</p>
              )} */}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="rounded-full font-semibold px-5  border-[#6ea864] border-2 text-sm h-10 hover:bg-[#6ea864] hover:text-white"
            onClick={handInsert}
          >
            INSERT
          </button>
        </div>
      </div>
      <DetailTable
        details={details}
        setDetails={setDetails}
        setHeaderData={setHeaderData}
        headerData={headerData}
        headerFix={headerFix}
        oldDetails={oldDetails}
        setOldDetails={setOldDetails}
      />
    </>
  );
}

export default Form;
