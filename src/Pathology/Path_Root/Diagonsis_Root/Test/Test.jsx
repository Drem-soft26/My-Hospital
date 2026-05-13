import React, { useState, useEffect, useRef } from "react";
import "./Test.css";
import PopupModal from "../../../../PopupModal";
import Client from "../../../../Clients/Client";
import { useNavigate, useLocation } from "react-router-dom";

export default function Test() {

    // validitation code 
    const validateForm = () => {
        if (!title || title === "Title") {
            alert("Select Title");
            return false;
        }
        if (!name.trim()) {
            alert("Enter Patient Name");
            return false;
        }
        if (!phone || phone.length !== 11) {
            alert("Enter valid Phone (11 digit)");
            return false;
        }
        if (!address.trim()) {
            alert("Enter Address");
            return false;
        }

        return true;
    };
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [ageY, setAgeY] = useState("");
    const [ageM, setAgeM] = useState("");
    const [ageD, setAgeD] = useState("");

    const [doctors, setDoctors] = useState([]);
    const [referers, setReferers] = useState([]);
    const [testsList, setTestsList] = useState([]);

    const [doctorSearch, setDoctorSearch] = useState("");
    const [referSearch, setReferSearch] = useState("");
    const [testSearch, setTestSearch] = useState("");

    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedReferer, setSelectedReferer] = useState("");

    const [testName, setTestName] = useState("");
    const [cost, setCost] = useState("");
    const [comment, setComment] = useState("");

    const [tests, setTests] = useState([]);

    const [discount, setDiscount] = useState(0);
    const [paid, setPaid] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    // refs (ENTER navigation)
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    // useEffect(() => {

    //     const savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
    //     //  console.log(localStorage.getItem("doctors"));
    //     const savedReferers = JSON.parse(localStorage.getItem("referrersData") || "[]");
    //         // console.log(localStorage.getItem("referrersData"));
    //     const savedMainTests = JSON.parse(localStorage.getItem("tests"),"data");

    //     const defaultDoctors = [];

    //     const defaultTests = savedMainTests && savedMainTests.length
    //         ? savedMainTests.map((t) => ({
    //             id: t.testId,
    //             name: t.testName,
    //             price: Number(t.cost),
    //         }))
    //         : [
    //             { id: "1", name: "CBC", price: 200 },
    //             { id: "2", name: "RBS", price: 100 },
    //             { id: "3", name: "Urine R/E", price: 150 },
    //             { id: "4", name: "Creatinine", price: 300 },
    //         ];

    //     // setDoctors(savedDoctors.length ? savedDoctors : defaultDoctors);
    //     // setReferers(Array.isArray(savedReferers) ? savedReferers : []);
    //     // setTestsList(defaultTests);

    //     // Debugging - দেখার জন্য
    //     console.log("✅ Loaded Referers from localStorage:", savedReferers);
    //     console.log("Total Referers Count:", savedReferers.length);

    // }, []);




useEffect(() => {

 const savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");

    const savedReferers = JSON.parse(
        localStorage.getItem("referrersData") || "[]"
    );

    const savedMainTests = JSON.parse(
        localStorage.getItem("tests") || "[]"
    );

    const defaultDoctors = [];

    const defaultTests =
        savedMainTests && savedMainTests.length
            ? savedMainTests.map((t) => ({
                id: t.testId,
                name: t.testName,
                price: Number(t.cost),
            }))
            : [
                { id: "1", name: "CBC", price: 200 },
                { id: "2", name: "RBS", price: 100 },
                { id: "3", name: "Urine R/E", price: 150 },
                { id: "4", name: "Creatinine", price: 300 },
            ];

    setDoctors(
        savedDoctors.length
            ? savedDoctors
            : defaultDoctors
    );

    setReferers(
        Array.isArray(savedReferers)
            ? savedReferers
            : []
    );

    setTestsList(defaultTests);

    console.log(
        "✅ Loaded Referers from localStorage:",
        savedReferers
    );

    console.log(
        "Total Referers Count:",
        savedReferers.length
    );

}, []);





    useEffect(() => {
        localStorage.setItem("doctors", JSON.stringify(doctors));
        localStorage.setItem("referers", JSON.stringify(referers));
    }, [doctors, referers]);

    const handlePatientSearch = () => {
        // খালি চেক
        if (!searchName.trim() && searchPhone.length === 0) {
            alert("Please enter Patient Name or Phone Number");
            return;
        }

        const patients = JSON.parse(localStorage.getItem("patients") || "[]");

        let foundPatient = null;

        // প্রথমে Phone দিয়ে সার্চ (অধিকতর নির্ভুল)
        if (searchPhone.length === 11) {
            foundPatient = patients.find(p => p.phone === searchPhone);
        }

        // যদি ফোন না পাওয়া যায় তাহলে নাম দিয়ে সার্চ
        if (!foundPatient && searchName.trim()) {
            foundPatient = patients.find(p =>
                p.name?.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (foundPatient) {
            // যতগুলো ফিল্ড সম্ভব অটো ফিল করা ভালো
            setTitle(foundPatient.title || "");
            setName(foundPatient.name || "");
            setPhone(foundPatient.phone || "");
            setAddress(foundPatient.address || "");
            setGender(foundPatient.gender || "");
            setAgeY(foundPatient.ageY || "");
            setAgeM(foundPatient.ageM || "");
            setAgeD(foundPatient.ageD || "");

            if (foundPatient.doctor) setSelectedDoctor(foundPatient.doctor);
            if (foundPatient.referer) setSelectedReferer(foundPatient.referer);

            // সার্চ ফিল্ড ক্লিয়ার
            setSearchName("");
            setSearchPhone("");
        } else {
            alert("Patient not found!");
        }
    };
    const handleTitleChange = (value) => {
        setTitle(value);

        if (value === "Mr") setGender("Male");
        else if (value === "Mrs") setGender("Female");
        else if (value === "Md.") setGender("Male");
        else if (value === "Miss") setGender("Female");
        else setGender("Others");
    };

    const addDoctor = () => {
        navigate("/Doctors-Details", {
            state: { from: "test" }
        });
    };

    const addReferer = () => {
        navigate("/refererinfo");
    };

    const addTestName = () => {
        navigate("/testName-Cost", {
            state: { from: "test" }
        });
    };

    const filteredDoctors = doctors.filter((d) => {

        const doctorName =
            typeof d === "string"
                ? d
                : d.name || "";

        return doctorName
            .toLowerCase()
            .includes(doctorSearch.toLowerCase());
    });

    // const filteredReferers = referers.filter(r =>
    //     r.toLowerCase().includes(referSearch.toLowerCase())
    // );

    const filteredReferers = referers.filter(r =>
    r.name?.toLowerCase().includes(referSearch.toLowerCase())
);
    const filteredTests = testsList.filter((t) =>
        t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
        String(t.id || "").includes(testSearch)
    );

    const addTest = () => {
        if (!testName || !cost) return;

        setTests([
            ...tests,
            { name: testName, cost: Number(cost), comment }
        ]);

        setTestName("");
        setCost("");
        setComment("");
        setTestSearch("");
    };

    const removeTest = (i) => {
        setTests(tests.filter((_, index) => index !== i));
    };

    const total = tests.reduce((sum, t) => sum + t.cost, 0);
    const payable = total - discount;
    const finalPaid = paid === "" || paid === null || paid === undefined ? payable : Number(paid);
    const due = finalPaid > payable ? 0 : payable - finalPaid;
    const returnMoney = finalPaid > payable ? finalPaid - payable : 0;

    return (
        <>
            <Client />

            <section className="card-box grid-fraction" id="Patient_information">

                <div className="Patient_Table">

                    {/* ==================== PATIENT SEARCH (Side by Side) ==================== */}
                    <div className="flex flex-col md:flex-row gap-4 my-4">
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Name</span>
                            <input
                                type="text"
                                placeholder="Enter Patient Name"
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()}
                            />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Mobile No</span>
                            <input
                                type="text"
                                placeholder="Enter Patient Phone No."
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                maxLength={11}
                                value={searchPhone}
                                onChange={(e) => setSearchPhone(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={handlePatientSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    {/* ==================== SEARCH END ==================== */}

                    <h2 className="text-3xl text-center font-bold">Patient Information</h2>

                    {/* Name & gender part  */}
                    <div className="form-row">
                        <select className="input-test" onChange={(e) => handleTitleChange(e.target.value)}>
                            <option>Title</option>
                            <option>Mr</option>
                            <option>Md.</option>
                            <option>Mrs</option>
                            <option>Miss</option>
                            <option>Baby</option>
                        </select>

                        <span className="label">Patient Name:</span>
                        <input className="input-test flex-1" placeholder="Patient Name" ref={nameRef}
                            onKeyDown={(e) => { if (e.key === "Enter") phoneRef.current.focus(); }}
                            onChange={(e) => setName(e.target.value)} />

                        <input className="input-test small" value={gender} readOnly />
                    </div>

                    {/* Phone & Address Section  */}
                    <div className="form-row">
                        <span className="label">Phone:</span>
                        <input className="input-test" value={phone} maxLength={11}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="Phone" ref={phoneRef} />

                        <span className="label">Address:</span>
                        <input className="input-test flex-1" placeholder="Address" ref={addressRef}
                            onChange={(e) => setAddress(e.target.value)} />

                        <div className="age-box">
                            <span className="label">Age :</span>
                            <input className="age-input" placeholder="Y" value={ageY} onChange={(e) => setAgeY(e.target.value)} />
                            <input className="age-input" placeholder="M" value={ageM} onChange={(e) => setAgeM(e.target.value)} />
                            <input className="age-input" placeholder="D" value={ageD} onChange={(e) => setAgeD(e.target.value)} />
                        </div>
                    </div>

                    {/* Doctor */}

                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">

                        <h3 className="whitespace-nowrap font-semibold">
                            Doctor :
                        </h3>

                        <input
                            className="flex-1 p-2 border rounded"
                            placeholder="Search Doctor"
                            value={doctorSearch}
                          onChange={(e) => {
    const value = e.target.value;

    setDoctorSearch(value);

    const found = doctors.find((d) => {
        const name = typeof d === "string" ? d : d?.name;
        return name?.toLowerCase().includes(value.toLowerCase());
    });

    if (found) {
        setSelectedDoctor(typeof found === "string" ? found : found.name);
    } else {
        setSelectedDoctor("");
    }
}}


                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    e.preventDefault();
                                    setDoctorSearch("");
                                }
                            }}
                        />

                        <select
                            className="flex-1 p-2 border rounded"
                            value={selectedDoctor}
                            onChange={(e) =>
                                setSelectedDoctor(e.target.value)
                            }
                        >

                            {doctorSearch.trim() !== "" &&
                                filteredDoctors.length === 0 ? (

                                <option value="">
                                    ❌ Invalid Search, No Doctor Here!!
                                </option>

                            ) : (

                                <option value="">
                                    Select Doctor
                                </option>
                            )}

                            {filteredDoctors.map((d, i) => {

                                const doctorName =
                                    typeof d === "string"
                                        ? d
                                        : d.name || "";

                                return (
                                    <option
                                        key={i}
                                        value={doctorName}
                                    >
                                        {doctorName}
                                    </option>
                                );
                            })}
                        </select>

                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer flex-shrink-0"
                            style={{ width: "80px" }}
                            onClick={addDoctor}
                        >
                            + Add
                        </button>

                    </div>

                    {/* ==================== REFERER SECTION (UPDATED) ==================== */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <h3 className="whitespace-nowrap font-semibold">Referer :</h3>

                        <input
                            className="flex-1 p-2 border rounded"
                            placeholder="Search Referer"
                            value={referSearch}
                            onChange={(e) => {
                                const value = e.target.value;
                                setReferSearch(value);
                                const matchedReferer = referers.find((r) => r.toLowerCase().includes(value.toLowerCase()));
                                if (matchedReferer) setSelectedReferer(matchedReferer); else setSelectedReferer("");
                            }}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setReferSearch(""); } }}
                        />

                        <select
                            className="flex-1 p-2 border rounded"
                            value={selectedReferer}
                            onChange={(e) => setSelectedReferer(e.target.value)}
                        >
                            {referSearch.trim() !== "" && filteredReferers.length === 0 ? (
                                <option value="">❌ Invalid Search, No Referrer Here!!</option>
                            ) : (
                                <option value="">Select Referer</option>
                            )}
                            {filteredReferers.map((r, i) => (
                                <option key={i} value={r}>{r.name}</option>
                            ))}
                        </select>

                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer hover:bg-blue-600 flex-shrink-0"
                            style={{ width: "80px" }}
                            onClick={addReferer}
                        >
                            + Add
                        </button>
                    </div>

                    {/* ==================== REFERER END ==================== */}

                    {/* Test Section (অপরিবর্তিত রাখা হয়েছে) */}
                    <h3>Add Test : </h3>
                    <div className="flex-row">
                        <input className="input-test flex-1" placeholder="Search Test By Name / ID" value={testSearch}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTestSearch(value);
                                const selected = testsList.find(t =>
                                    t.name.toLowerCase().includes(value.toLowerCase()) ||
                                    String(t.id).includes(value)
                                );
                                if (selected) {
                                    setTestName(selected.name);
                                    setCost(selected.price);
                                } else {
                                    setTestName("");
                                    setCost("");
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (!testName || !cost) return;
                                    setTests([...tests, { name: testName, cost: Number(cost), comment }]);
                                    setTestSearch(""); setTestName(""); setCost(""); setComment("");
                                }
                            }}
                        />

                        <select className="input-test flex-1" value={testName}
                            onChange={(e) => {
                                const selected = testsList.find(t => t.name === e.target.value);
                                if (selected) {
                                    setTestName(selected.name);
                                    setCost(selected.price);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (!testName || !cost) return;
                                    setTests([...tests, { name: testName, cost: Number(cost), comment }]);
                                    setTestSearch(""); setTestName(""); setCost(""); setComment("");
                                }
                            }}
                        >
                            <option value="">Select Option</option>
                            {filteredTests.map((t, i) => (
                                <option key={i} value={t.name}>{t.id} - {t.name}</option>
                            ))}
                        </select>

                        <input className="input-test small" value={cost} readOnly />

                        <input className="input-test flex-1" placeholder="Have any Comments" value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (!testName || !cost) return;
                                    setTests([...tests, { name: testName, cost: Number(cost), comment }]);
                                    setTestSearch(""); setTestName(""); setCost(""); setComment("");
                                }
                            }}
                        />

                        <button className="btn" onClick={addTest}>Ok</button>
                        <button className="btn" onClick={addTestName}>Add New</button>
                    </div>

                    {/* Table */}
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id.</th>
                                    <th>Test</th>
                                    <th>Cost</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map((t, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{t.name}</td>
                                        <td>{t.cost}</td>
                                        <td>{t.comment}</td>
                                        <td>
                                            <button className="remove-btn" onClick={() => removeTest(i)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* button per ===== kaj -==== */}
                    <button className="home-button"
                        onClick={() => navigate(-1)}>
                        Back
                    </button>
                    <button className="home-button" onClick={() => window.open("/test", "_blank")}>
                        Open New Page
                    </button>


                </div>

                {/* Payment Section (অপরিবর্তিত) */}
                <div className="Amount_Table">
                    <h2 className="text-4xl text-center font-bold p-4">Bill Section</h2>

                    <div className="calc-grid">
                        <div className="box">
                            <p className="mb-5">Total Amount</p>
                            <h3>{total}</h3>
                        </div>

                        <div className="box">
                            <p className="text-2xl mb-5">Discount</p>
                            <input className="input-test" type="number" onChange={(e) => setDiscount(Number(e.target.value))} />
                        </div>

                        <div className="box">
                            <p className="text-2xl mb-5">Paid</p>
                            <input className="input-test" type="number" onChange={(e) => setPaid(Number(e.target.value))} />
                        </div>

                        <div className="box">
                            <p className="mb-5">Payable</p>
                            <h3>{payable}</h3>
                        </div>

                        <div className="box highlight">
                            <p className="mb-5">Due</p>
                            <h3>{due}</h3>
                        </div>

                        <div className="box return">
                            <p className="mb-5">Return</p>
                            <h3>{returnMoney}</h3>
                        </div>
                    </div>

                    <div className="right">
                        <button className="btn-primary" onClick={() => { if (!validateForm()) return; setShowPopup(true); }}>
                            Save & Print
                        </button>

                        <PopupModal
                            open={showPopup}
                            onClose={() => setShowPopup(false)}
                            data={{
                                title, name, phone, address, gender,
                                age: `${ageY || 0}Y ${ageM || 0}M ${ageD || 0}D`,
                                doctor: selectedDoctor,
                                referer: selectedReferer,
                                tests, total, discount, paid, payable, due, returnMoney,
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}