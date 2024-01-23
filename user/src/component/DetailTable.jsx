import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosuser } from "../Asios/axios";
import Confirm from "./modal/Confirm";
import { IoIosArrowDown } from "react-icons/io";

function DetailTable({
  details,
  setDetails,
  setHeaderData,
  headerData,
  headerFix,
  oldDetails,
  setOldDetails
}) {
  const [load, setLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [showAndHide, setShowAndHide] = useState(false);

  useEffect(() => {}, [load]);

  const handleDetails = async (e, no) => {
    details.forEach((data) => {
      if (data.srNo === no) {
        data[e.target.name] = e.target.value;
        setLoad(!load);
      }
      if ("qty" in data && "rate" in data) {
        data.amount = data.qty * data.rate;
        setLoad(!load);
      }
    });
  };

  const call = async () => {
    console.log(headerFix, "ooooooooooooooo");
    if (!headerFix) {
      setErrorMsg("Insert the header section");
    } else {
      const response = await axiosuser({
        url: "/saveDetails",
        method: "POST",
        data: {
          vrNo: headerData.vrNo,
          details: details,
        },
      });
      console.log(response);
      if(response.status === 200 ){
        
        // Update the state with the transformed data
       
      
        setOldDetails(response.data?.details)
        setDetails((prevArray) => prevArray = []);
        setDetails([{srNo:1}])
      }
    }
  };

  const handleSave = async () => {
    let valuesNotEmpty;

    if (details.length === 1) {
      valuesNotEmpty = Object.values(details[0]).filter(
        (value) => value !== ""
      );
    } else {
      valuesNotEmpty = Object.values(details[details.length - 1]).filter(
        (value) => value !== ""
      );
    }

    if (valuesNotEmpty.length === 6) {
      call();
    } else {
      if (details.length === 1) {
        setErrorMsg(`fill atleast one row`);
      } else {
        if (valuesNotEmpty.length === 1) {
          setDetails((prevArray) => prevArray.slice(0, -1));
 
          call();
        } else {
          console.log('lllllllllllllllllllllllllllllllllll');
          setOpen(true);
        }
      }
    }
  };

  const handleReset = () => {
    setHeaderData({
      status: "",
      vrNo: "",
      acName: "",
      acAmount: "",
      vrDate: new Date().toISOString().split("T")[0],
    });
    setDetails([
      { srNo: 1, itemCode: "", itemName: "", qty: 0, rate: 0, amount: 0 },
    ]);
    setLoad(!load);
  };

  // const searchItemCode = async(itemCode,no)=>{
  //   try {

  //     console.log('Fetching data...');
  //     const response = await fetch(`http://5.189.180.8:8010/detail`);
  //     console.log(response);
  //     if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     const filteredData = data.filter(obj => obj.item_code === itemCode);
  //     console.log(filteredData,';;;0');
  // } catch (error) {
  //     console.error('Fetch error:', error);
  // }
  // }

  const handleColumn = () => {
    // let lastObj = Object.keys(details[details.length-1])
    let valuesNotEmpty = Object.values(details[details.length - 1]).filter(
      (value) => value !== ""
    ).length;

    if (valuesNotEmpty === 6) {
      setDetails([...details, { srNo: details[details.length - 1].srNo + 1 }]);
      setErrorMsg("");
    } else {
      setErrorMsg(` sr no ${details[details.length - 1].srNo} has not filled`);
    }
  };

  const handleContinue = () => {
    setDetails((prevArray) => prevArray.slice(0, -1));
    setOpen(false);
    call();
  };

  console.log(details,';;;;');
   
  return (
    <div className="w-full h-full flex justify-between gap-16">
      <div className="h-[400px] rounded-e-full w-10 bg-[#6ea864] sm:static sm:visible invisible absolute top-36"></div>
      <div className="w-full ">
        <div className=" flex justify-between pr-2">
          <h1 className="font-semibold text-4xl  font-mono text-[#78938a] pl-2">
            DETAILS
          </h1>
          <div className="gap-2 flex ">
            {/* <button className="rounded-full font-semibold px-5 mt-2 border-[#6ea864] border-2 text-sm h-10 " onClick={handleReset}>
              RESET
            </button>
            <button
              className="rounded-full font-semibold w- mt-2 border-[#6ea864] border-2 text-xl h-10 w-10  "
              onClick={() =>
                setDetails([
                  ...details,
                  { srNo: details[details.length - 1].srNo + 1 },
                ])
              }
            >
              +
            </button> */}
          </div>
        </div>
        <div>
          <div class="overflow-x-auto mt-3 p-2 w-full ">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="text-left pl-2 py-3 bg-[#6ea864]  text-white  text-xs leading-4 font-medium  uppercase tracking-wider  sm:w-32">
                    Sr NO
                  </th>
                  <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-40">
                    Item Code
                  </th>
                  <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider ">
                    item Name
                  </th>
                  <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                    Qty
                  </th>
                  <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                    Rate
                  </th>
                  <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {details.map((data) => (
                  <tr>
                    <td>
                      <input
                        key={data.amount}

                        type="number"
                        name="srNo"
                        class="py-4 whitespace-no-wrap border-b border-[#6ea864] w-14  sm:w-32  border-r-2 outline-none"
                        value={data.srNo}
                      />
                    </td>

                    <td>
                      <input
                        key={data.amount}
                        name="itemCode"
                        onChange={(e) => handleDetails(e, data.srNo)}
                        type="text"
                        value={data.itemCode}
                        class="py-4 whitespace-no-wrap border-b border-[#6ea864] w-24 sm:w-40  border-r-2 outline-none"
                      />
                    </td>
                    <td>
                      <input
                        name="itemName"
                        key={data.amount}
                        
                        type="text"
                        value={data.itemName}
                        onChange={(e) => handleDetails(e, data.srNo)}
                        class="py-4 whitespace-no-wrap border-b border-[#6ea864] w-full  border-r-2 outline-none"
                      />
                    </td>
                    <td>
                      <input
                        name="qty"
                        key={data.amount}

                        type="number"
                        value={data.qty}
                        onChange={(e) => {
                          handleDetails(e, data.srNo);
                        }}
                        class="py-4 whitespace-no-wrap border-b border-r-2  border-[#6ea864] w-20 sm:w-32  outline-none"
                      />
                    </td>
                    <td>
                      <input
                        name="rate"
                        key={data.amount}

                        value={data.rate}
                        onChange={(e) => handleDetails(e, data.srNo)}
                        type="number"
                        class="py-4 whitespace-no-wrap border-b border-[#6ea864] w-20 sm:w-32  border-r-2 outline-none"
                      />
                    </td>
                    <td>
                      <input
                        value={data.amount}
                        key={data.amount}

                        onChange={(e) => handleDetails(e, data.srNo)}
                        name="amount"
                        type="number"
                        class="py-4 whitespace-no-wrap border-b border-[#6ea864] w-20 sm:w-32    outline-none  border-r-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between w-full pe-2 ">
            <div className="gap-2 flex -mt-2 ml-2 ">
              <button
                className="rounded-full font-semibold px-5 mt-2 border-[#6ea864] border-2 text-sm h-10 hover:bg-[#6ea864] hover:text-white "
                onClick={handleReset}
              >
                RESET
              </button>
              <button
                className="rounded-full font-semibold w- mt-2 border-[#6ea864] border-2 text-xl h-10 w-10  hover:bg-[#6ea864] hover:text-white"
                onClick={handleColumn}
              >
                +
              </button>
              <h1 className="text-red-500 text-lg font-semibold mt-3 p-">
                {errorMsg && errorMsg}
              </h1>
            </div>
            <div className="w-72 h-11 bg-[#525e75] flex justify-around items-center">
              <h1 className="text-white  text-2xl">Total:- </h1>
              <h1 className="text-white  text-2xl">0 </h1>
            </div>
          </div>
          <div className="flex justify-end w-full pe-2 gap-4">
            <button
              className="rounded-full font-semibold px-5 mt-2 border-[#6ea864] border-2 text-sm h-10 "
              onClick={handleSave}
            >
              SAVE
            </button>
            <Confirm
              open={open}
              setOpen={setOpen}
              handleContinue={handleContinue}
            />
            <button
              className="rounded-full font-semibold px-5 mt-2 border-[#6ea864] border-2 text-sm h-10 "
              onClick={handleReset}
            >
              PRINT
            </button>
          </div>
        </div>
        <div className=" flex  pr-2">
          <h1 className="font-semibold text-4xl  font-mono text-[#78938a] pl-2">
            OLD DETAILS
          </h1>
          <IoIosArrowDown
            className={`text-[#6ea864] text-4xl font-bold ml-2 rotate-180 ${
              showAndHide ? "rotate-0" : "rotate-180"
            } cursor-pointer`}
            onClick={() => setShowAndHide(!showAndHide)}
          />
        </div>
        {showAndHide && (
          <div>
            <div class="overflow-x-auto mt-3 p-2 w-full ">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="text-left pl-2 py-3 bg-[#6ea864]  text-white  text-xs leading-4 font-medium  uppercase tracking-wider  sm:w-32">
                      Sr NO
                    </th>
                    <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-40">
                      Item Code
                    </th>
                    <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider ">
                      item Name
                    </th>
                    <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                      Qty
                    </th>
                    <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                      Rate
                    </th>
                    <th class="text-left pl-2 py-3 bg-[#6ea864] text-white  text-xs leading-4 font-medium  uppercase tracking-wider sm:w-32">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {oldDetails.map((data,index) => (
                    <tr>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                        {index+1}
                      </th>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                         {data.itemCode}
                      </th>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                      {data.itemName}
                      </th>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                      {data.qty}
                      </th>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                      {data.rate}
                      </th>
                      <th class="py-4  border-b border-r-2  border-[#6ea864] w-20 sm:w-32 text-xs text-start pl-2">
                      {data.amount}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="h-[400px] rounded-s-full w-10 bg-[#6ea864] sm:static sm:visible invisible absolute"></div>
    </div>
  );
}

export default DetailTable;
