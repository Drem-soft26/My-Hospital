import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TestNameDetails() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

   

    // 🔥 CUSTOM POPUP
    const [popup, setPopup] = useState({
        show: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    const openPopup = (title, message, onConfirm) => {
        setPopup({
            show: true,
            title,
            message,
            onConfirm,
        });
    };

    const closePopup = () => {
        setPopup({
            show: false,
            title: "",
            message: "",
            onConfirm: null,
        });
    };

    // 🔥 TEST LIST
   const [tests, setTests] = useState([
    {
        testId: "1",
        testName: "CBC",
        category: "Pathology",
        subCategory: "Blood",
        group: "Haematology",
        specimen: "Blood",
        printFormat: "1",
        cost: "500",
        referenceCost: "100",
        discount: "0",
        roomNo: "101",
    },

    {
        testId: "2",
        testName: "Blood Sugar",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Blood",
        printFormat: "1",
        cost: "350",
        referenceCost: "80",
        discount: "0",
        roomNo: "102",
    },

    {
        testId: "3",
        testName: "Urine R/E",
        category: "Pathology",
        subCategory: "Urine",
        group: "Urine Examination",
        specimen: "Urine",
        printFormat: "1",
        cost: "250",
        referenceCost: "50",
        discount: "0",
        roomNo: "103",
    },

    {
        testId: "4",
        testName: "X-Ray Chest",
        category: "Imaging/Radiology",
        subCategory: "X-Ray",
        group: "X-Ray",
        specimen: "X-Ray",
        printFormat: "1",
        cost: "900",
        referenceCost: "200",
        discount: "0",
        roomNo: "104",
    },

    {
        testId: "5",
        testName: "ECG",
        category: "Imaging/Radiology",
        subCategory: "ECG",
        group: "ECG",
        specimen: "ECG",
        printFormat: "1",
        cost: "700",
        referenceCost: "150",
        discount: "0",
        roomNo: "105",
    },

    {
        testId: "6",
        testName: "Serum Creatinine",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Serum",
        printFormat: "1",
        cost: "450",
        referenceCost: "100",
        discount: "0",
        roomNo: "106",
    },

    {
        testId: "7",
        testName: "Lipid Profile",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Blood",
        printFormat: "1",
        cost: "1200",
        referenceCost: "250",
        discount: "0",
        roomNo: "107",
    },

    {
        testId: "8",
        testName: "SGPT",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Serum",
        printFormat: "1",
        cost: "500",
        referenceCost: "100",
        discount: "0",
        roomNo: "108",
    },

    {
        testId: "9",
        testName: "SGOT",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Serum",
        printFormat: "1",
        cost: "500",
        referenceCost: "100",
        discount: "0",
        roomNo: "109",
    },

    {
        testId: "10",
        testName: "TSH",
        category: "Pathology",
        subCategory: "Hormone",
        group: "Hormone Test",
        specimen: "Blood",
        printFormat: "1",
        cost: "1000",
        referenceCost: "250",
        discount: "0",
        roomNo: "110",
    },

    {
        testId: "11",
        testName: "FT4",
        category: "Pathology",
        subCategory: "Hormone",
        group: "Hormone Test",
        specimen: "Blood",
        printFormat: "1",
        cost: "1200",
        referenceCost: "300",
        discount: "0",
        roomNo: "111",
    },

    {
        testId: "12",
        testName: "Dengue NS1",
        category: "Pathology",
        subCategory: "Blood",
        group: "Serology",
        specimen: "Blood",
        printFormat: "1",
        cost: "1500",
        referenceCost: "350",
        discount: "0",
        roomNo: "112",
    },

    {
        testId: "13",
        testName: "Covid-19",
        category: "Pathology",
        subCategory: "Blood",
        group: "Serology",
        specimen: "Blood",
        printFormat: "1",
        cost: "1800",
        referenceCost: "400",
        discount: "0",
        roomNo: "113",
    },

    {
        testId: "14",
        testName: "Ultrasonogram",
        category: "Imaging/Radiology",
        subCategory: "Ultra",
        group: "Ultrasonogram",
        specimen: "USG",
        printFormat: "1",
        cost: "2000",
        referenceCost: "500",
        discount: "0",
        roomNo: "114",
    },

    {
        testId: "15",
        testName: "CT Scan Brain",
        category: "Imaging/Radiology",
        subCategory: "CT/Others",
        group: "CT-Scan",
        specimen: "CT",
        printFormat: "1",
        cost: "4500",
        referenceCost: "1000",
        discount: "0",
        roomNo: "115",
    },

    {
        testId: "16",
        testName: "Echo",
        category: "Imaging/Radiology",
        subCategory: "Echo",
        group: "Ultrasonogram",
        specimen: "Echo",
        printFormat: "1",
        cost: "2500",
        referenceCost: "600",
        discount: "0",
        roomNo: "116",
    },

    {
        testId: "17",
        testName: "HbA1c",
        category: "Pathology",
        subCategory: "Blood",
        group: "Biochemistry",
        specimen: "Blood",
        printFormat: "1",
        cost: "900",
        referenceCost: "200",
        discount: "0",
        roomNo: "117",
    },

    {
        testId: "18",
        testName: "Pregnancy Test",
        category: "Pathology",
        subCategory: "Urine",
        group: "Serology",
        specimen: "Urine",
        printFormat: "1",
        cost: "300",
        referenceCost: "50",
        discount: "0",
        roomNo: "118",
    },

    {
        testId: "19",
        testName: "Stool R/E",
        category: "Pathology",
        subCategory: "Stool",
        group: "Microbiology",
        specimen: "Stool",
        printFormat: "1",
        cost: "350",
        referenceCost: "70",
        discount: "0",
        roomNo: "119",
    },

    {
        testId: "20",
        testName: "EEG",
        category: "Imaging/Radiology",
        subCategory: "CT/Others",
        group: "EEG",
        specimen: "EEG",
        printFormat: "1",
        cost: "2200",
        referenceCost: "500",
        discount: "0",
        roomNo: "120",
    },
]);



    // 🔥 AUTO ID GENERATE
    const generateNextId = () => {

        if (tests.length === 0) return "1";

        const maxId = Math.max(
            ...tests.map((item) => Number(item.testId))
        );

        return String(maxId + 1);
    };

    // 🔥 FORM DATA
    const [formData, setFormData] = useState({
        testId: "21",
        testName: "",
        category: "",
        subCategory: "",
        group: "",
        specimen: "",
        printFormat: "",
        cost: "",
        referenceCost: "",
        discount: "",
        roomNo: "",
    });
const isSaveEnabled =
    formData.testName.trim() !== "" &&
    formData.cost.trim() !== "";
    // 🔥 SEARCH
    const filteredTests = useMemo(() => {

        return tests.filter(
            (item) =>
                item.testName.toLowerCase().includes(search.toLowerCase()) ||
                item.testId.toString().includes(search)
        );

    }, [search, tests]);

    // 🔥 INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // 🔥 NEW
    const handleNew = () => {

        setFormData({
            testId: generateNextId(),
            testName: "",
            category: "",
            subCategory: "",
            group: "",
            specimen: "",
            printFormat: "",
            cost: "",
            referenceCost: "",
            discount: "",
            roomNo: "",
        });

    };

    // 🔥 SAVE
    const handleSave = () => {

        if (!formData.testName) {
            alert("Please Fill Required Fields");
            return;
        }

        openPopup(
            "Save Test",
            `Do you want to save "${formData.testName}" ?`,
            () => {

                setTests([...tests, formData]);

                setFormData({
                    testId: String(Number(generateNextId()) + 1),
                    testName: "",
                    category: "",
                    subCategory: "",
                    group: "",
                    specimen: "",
                    printFormat: "",
                    cost: "",
                    referenceCost: "",
                    discount: "",
                    roomNo: "",
                });

                closePopup();
            }
        );

    };

    // 🔥 EDIT
    const handleEdit = () => {

        openPopup(
            "Update Test",
            `Do you want to update "${formData.testName}" ?`,
            () => {

                const updated = tests.map((item) =>
                    item.testId === formData.testId ? formData : item
                );

                setTests(updated);

                closePopup();
            }
        );

    };

    // 🔥 DELETE
    const handleDelete = () => {

        openPopup(
            "Delete Test",
            `Do you want to delete "${formData.testName}" ?`,
            () => {

                const updated = tests.filter(
                    (item) => item.testId !== formData.testId
                );

                setTests(updated);

                handleNew();

                closePopup();
            }
        );

    };

    // 🔥 SELECT TEST
    const handleSelectTest = (item) => {

        setFormData(item);

    };

    // 🔥 PRINT
    const handlePrint = () => {

        const printWindow = window.open("", "", "width=900,height=900");

        printWindow.document.write(`

        <html>

        <head>

        <title>Test Details</title>

        <style>

        @page{
            margin-top:2in;
        }

        body{
            font-family: Arial;
            padding:20px;
            background:#f8fafc;
        }

        h2{
            text-align:center;
            margin-bottom:20px;
        }

        table{
            width:100%;
            border-collapse:collapse;
        }

        th,td{
            border:1px solid #ccc;
            padding:12px;
            text-align:left;
        }

        th{
            background:#e2e8f0;
        }

        </style>

        </head>

        <body>

        <h2>Diagnosis Test Details</h2>

        <table>

        <tr>
        <th>ID Of Test</th>
        <td>${formData.testId}</td>
        </tr>

        <tr>
        <th>Name Of Test</th>
        <td>${formData.testName}</td>
        </tr>

        <tr>
        <th>Category</th>
        <td>${formData.category}</td>
        </tr>

        <tr>
        <th>Sub Category</th>
        <td>${formData.subCategory}</td>
        </tr>

        <tr>
        <th>Group</th>
        <td>${formData.group}</td>
        </tr>

        <tr>
        <th>Specimen</th>
        <td>${formData.specimen}</td>
        </tr>

        <tr>
        <th>Printing Format</th>
        <td>${formData.printFormat}</td>
        </tr>

        <tr>
        <th>Cost</th>
        <td>${formData.cost}</td>
        </tr>

        <tr>
        <th>Reference Cost</th>
        <td>${formData.referenceCost}</td>
        </tr>

        <tr>
        <th>Discount</th>
        <td>${formData.discount}</td>
        </tr>

        <tr>
        <th>Room No</th>
        <td>${formData.roomNo}</td>
        </tr>

        </table>

        </body>

        </html>

        `);

        printWindow.document.close();
        printWindow.print();
    };
 useEffect(() => {

    localStorage.setItem(
        "tests",
        JSON.stringify(tests)
    );

}, [tests]);
    return (

        <>
            {/* 🔥 CUSTOM POPUP */}

            {
                popup.show && (
                    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center px-4">

                        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">

                            <h2 className="text-2xl font-bold text-slate-700 mb-3">
                                {popup.title}
                            </h2>

                            <p className="text-slate-600 text-[16px] mb-6">
                                {popup.message}
                            </p>

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={closePopup}
                                    className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-semibold duration-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={popup.onConfirm}
                                    className="px-5 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-800 font-semibold duration-300"
                                >
                                    Confirm
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

            <section className="w-full h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-indigo-100">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full p-4 overflow-hidden">

                    {/* LEFT SIDE */}

                    <div className="lg:col-span-2 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">

                        {/* SCROLL */}

                        <div className="space-y-3 overflow-y-auto pr-2 flex-1 min-h-0">

                            {/* INPUTS */}

                            {[
                                {
                                    label: "Id Of Test :",
                                    name: "testId",
                                    type: "text",
                                    color: "bg-yellow-200",
                                },

                                {
                                    label: "Name Of Test :",
                                    name: "testName",
                                    type: "text",
                                    color: "bg-green-200",
                                },

                            ].map((item, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center gap-3"
                                >

                                    <span
                                        className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}
                                    >
                                        {item.label}
                                    </span>

                                    <input
                                        type={item.type}
                                        name={item.name}
                                        value={formData[item.name]}
                                        onChange={handleChange}
                                        readOnly={item.name === "testId"}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-[15px]"
                                    />

                                </div>
                            ))}

                            {/* SELECT */}

                            {[
                                {
                                    label: "Category Of Test :",
                                    name: "category",
                                    color: "bg-slate-200",
                                    options: [
                                        "Imaging/Radiology",
                                        "Pathology",
                                        "Urine",
                                    ],
                                },

                                {
                                    label: "Sub Category :",
                                    name: "subCategory",
                                    color: "bg-yellow-200",
                                    options: [
                                        "Blood",
                                        "Urine",
                                        "Stool",
                                        "Ultra",
                                        "Echo",
                                        "ECG",
                                        "X-Ray",
                                        "Hormone",
                                        "Histopathology",
                                        "CT/Others",
                                    ],
                                },

                                {
                                    label: "Group Of Test :",
                                    name: "group",
                                    color: "bg-pink-300",
                                    options: [
                                        "Haematology",
                                        "Biochemistry",
                                        "Serology",
                                        "Endoscopy",
                                        "Hormone Test",
                                        "Ultrasonogram",
                                        "Microbiology",
                                        "ECG",
                                        "X-Ray",
                                        "CT-Scan",
                                        "EEG",
                                        "ETT",
                                        "Urine Examination",
                                        "Semen Analysis",
                                    ],
                                },

                                {
                                    label: "Specimen Of Test :",
                                    name: "specimen",
                                    color: "bg-cyan-200",
                                    options: [
                                        "As Required",
                                        "Blood",
                                        "ECG",
                                        "Echo",
                                        "Histopathology",
                                        "Semen",
                                        "Serum",
                                        "Skin",
                                        "Stool",
                                        "Urine",
                                        "USG",
                                        "X-Ray",
                                    ],
                                },

                                {
                                    label: "Printing Format :",
                                    name: "printFormat",
                                    color: "bg-indigo-300",
                                    options: ["0", "1", "2", "3", "4", "5", "6"],
                                },

                            ].map((item, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center gap-3"
                                >

                                    <span
                                        className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}
                                    >
                                        {item.label}
                                    </span>

                                    <select
                                        name={item.name}
                                        value={formData[item.name]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-[15px]"
                                    >

                                        <option value="">
                                            Select
                                        </option>

                                        {item.options.map((option, i) => (
                                            <option key={i}>
                                                {option}
                                            </option>
                                        ))}

                                    </select>

                                </div>
                            ))}

                            {/* NUMBER INPUT */}

                            {[
                                {
                                    label: "Cost Of Test :",
                                    name: "cost",
                                    color: "bg-yellow-200",
                                },

                                {
                                    label: "Reference Cost :",
                                    name: "referenceCost",
                                    color: "bg-orange-200",
                                },

                                {
                                    label: "Discount :",
                                    name: "discount",
                                    color: "bg-pink-300",
                                },

                                {
                                    label: "Room No :",
                                    name: "roomNo",
                                    color: "bg-lime-200",
                                },

                            ].map((item, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center gap-3"
                                >

                                    <span
                                        className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}
                                    >
                                        {item.label}
                                    </span>

                                    <input
                                        type="number"
                                        name={item.name}
                                        value={formData[item.name]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-[15px]"
                                    />

                                </div>
                            ))}

                        </div>

                        {/* BUTTONS */}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">

                            <button
                                className="bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-700 hover:cursor-pointer duration-300 shadow-lg"
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        navigate(-1);
                                    } else {
                                        navigate("/diagnosis");
                                    }
                                }}
                            >
                                Go Back
                            </button>

                           <button
    onClick={handleSave}
    disabled={!isSaveEnabled}
    className={`
        text-white
        py-3
        rounded-xl
        font-bold
        duration-300
        shadow-lg

        ${
            isSaveEnabled
                ? "bg-emerald-500 hover:bg-emerald-700 hover:cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
        }
    `}
>
    Save
</button>

                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:cursor-pointer duration-300 shadow-lg"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleNew}
                                className="bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-700 hover:cursor-pointer duration-300 shadow-lg"
                            >
                                New
                            </button>

                            <button
                                onClick={handlePrint}
                                className="bg-violet-500 text-white py-3 rounded-xl font-bold hover:bg-violet-700 hover:cursor-pointer duration-300 shadow-lg"
                            >
                                Print
                            </button>

                            <button
                                onClick={handleDelete}
                                className="bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-700 hover:cursor-pointer duration-300 shadow-lg"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                    {/* MIDDLE */}

                    <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">

                        <input
                            type="text"
                            placeholder="Search By ID / Test Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
                        />

                        <div className="bg-gradient-to-b from-slate-50 to-cyan-50 rounded-xl flex-1 overflow-y-auto p-2 space-y-2 min-h-0">

                            {
                                filteredTests.map((item, index) => (

                                    <div
                                        key={index}
                                        onClick={() => handleSelectTest(item)}
                                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-white hover:bg-cyan-700 hover:text-white duration-300 shadow"
                                    >

                                        <span className="font-bold text-[16px]">
                                            {item.testId}
                                        </span>

                                        <p className="font-semibold text-[15px]">
                                            {item.testName}
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">

                        <div className="bg-gradient-to-br from-pink-50 to-cyan-50 rounded-xl p-4 flex-1 overflow-y-auto min-h-0">

                            <h2 className="font-bold text-xl text-slate-700 mb-3">
                                Reagent / Notes
                            </h2>

                            <textarea
                                placeholder="Write Notes Here..."
                                className="w-full h-full rounded-xl border border-slate-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />

                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">

                            <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 hover:cursor-pointer duration-300 shadow-lg">
                                Save
                            </button>

                            <button className="bg-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-600 hover:text-white hover:cursor-pointer duration-300 shadow-lg">
                                Edit
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </>
    );
}

export default TestNameDetails;