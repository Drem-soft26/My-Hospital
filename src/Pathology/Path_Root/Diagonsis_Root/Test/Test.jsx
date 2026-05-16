import React, { useState, useEffect, useRef } from "react";
import "./Test.css";
import PopupModal from "../../../../PopupModal";
import Client from "../../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function Test() {
    const navigate = useNavigate();

    // ==================== STATES ====================
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
    const [patientId, setPatientId] = useState("");

    // Refs
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const discountRef = useRef();
    const paidRef = useRef();

    // ==================== PATIENT ID ====================
    const generatePatientId = () => {
        const now = new Date();
        const yy = String(now.getFullYear()).slice(-2);
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const saved = JSON.parse(localStorage.getItem("patients") || "[]");
        const prefix = `P.I-${yy}${mm}`;
        const count = saved.filter(p => String(p.patientId || "").startsWith(prefix)).length + 1;
        return `${prefix}${String(count).padStart(3, "0")}`;
    };

    useEffect(() => {
        setPatientId(generatePatientId());
    }, []);

    // ==================== LOAD DATA ====================
    const loadData = () => {
        const savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
        setDoctors(Array.isArray(savedDoctors) ? savedDoctors : []);

        let savedReferers = JSON.parse(localStorage.getItem("referrersData") || "[]");
        if (!savedReferers.length) {
            savedReferers = JSON.parse(localStorage.getItem("referers") || "[]");
        }
        setReferers(Array.isArray(savedReferers) ? savedReferers : []);

        const savedTests = JSON.parse(localStorage.getItem("tests") || "[]");
        const defaultTests = savedTests.length
            ? savedTests.map(t => ({
                id: t.testId,
                name: t.testName,
                price: Number(t.cost)
            }))
            : [
                { id: "1", name: "CBC", price: 200 },
                { id: "2", name: "RBS", price: 100 },
                { id: "3", name: "Urine R/E", price: 150 },
                { id: "4", name: "Creatinine", price: 300 }
            ];
        setTestsList(defaultTests);
    };

    useEffect(() => { loadData(); }, []);

    useEffect(() => {
        const handleUpdate = () => loadData();
        window.addEventListener("doctorUpdated", handleUpdate);
        return () => window.removeEventListener("doctorUpdated", handleUpdate);
    }, []);

    // ==================== SEARCH HANDLERS ====================
    const handleDoctorSearch = (e) => {
        const val = e.target.value;
        setDoctorSearch(val);
        const found = doctors.find(d => {
            const dName = typeof d === "string" ? d : d?.name || "";
            return dName.toLowerCase().includes(val.toLowerCase());
        });
        if (found) {
            setSelectedDoctor(typeof found === "string" ? found : found.name || "");
        }
    };

    const handleRefererSearch = (e) => {
        const val = e.target.value;
        setReferSearch(val);
        const found = referers.find(r => {
            const rName = typeof r === "string" ? r : r?.name || "";
            return rName.toLowerCase().includes(val.toLowerCase());
        });
        if (found) {
            setSelectedReferer(typeof found === "string" ? found : found.name || "");
        }
    };

    // ==================== OTHER FUNCTIONS ====================
    const handlePatientSearch = () => {
        if (!searchName.trim() && searchPhone.length === 0) {
            return alert("Please enter Patient Name or Phone Number");
        }
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        let found = null;
        if (searchPhone.length === 11) found = patients.find(p => p.phone === searchPhone);
        if (!found && searchName.trim()) {
            found = patients.find(p => p.name?.toLowerCase().includes(searchName.toLowerCase()));
        }
        if (found) {
            setTitle(found.title || "");
            setName(found.name || "");
            setPhone(found.phone || "");
            setAddress(found.address || "");
            setGender(found.gender || "");
            setAgeY(found.ageY || "");
            setAgeM(found.ageM || "");
            setAgeD(found.ageD || "");
            setSelectedDoctor(found.doctor || "");
            setSelectedReferer(found.referer || "");
            setSearchName("");
            setSearchPhone("");
        } else {
            alert("Patient not found!");
        }
    };

    const handleTitleChange = (value) => {
        setTitle(value);
        if (value === "Mr." || value === "Md.") setGender("Male");
        else if (value === "Mrs." || value === "Miss" || value === "Ms.") setGender("Female");
        else setGender("Others");
    };

    const addDoctor = () => navigate("/Doctors-Details", { state: { from: "test" } });
    const addReferer = () => navigate("/refererinfo");
    const addTestName = () => navigate("/testName-Cost", { state: { from: "test" } });

    const addTest = () => {
        if (!testName || !cost) return;
        setTests(prev => [...prev, { name: testName, cost: Number(cost), comment }]);
        setTestName(""); setCost(""); setComment(""); setTestSearch("");
    };

    const removeTest = (i) => setTests(prev => prev.filter((_, idx) => idx !== i));

    const validateForm = () => {
        if (!title || title === "Title") return alert("Select Title");
        if (!name.trim()) return alert("Enter Patient Name");
        if (!phone || phone.length !== 11) return alert("Enter valid Phone (11 digit)");
        if (!address.trim()) return alert("Enter Address");
        return true;
    };

    // ==================== CALCULATIONS ====================
    const total = tests.reduce((sum, t) => sum + Number(t.cost || 0), 0);
    const discountAmount = Number(discount) || 0;
    const payable = Math.max(0, total - discountAmount);
    const paidAmount = Number(paid) || 0;
    const due = Math.max(0, payable - paidAmount);
    const returnMoney = Math.max(0, paidAmount - payable);

    const handleSave = () => {
        if (!validateForm()) return;

        const payments = JSON.parse(localStorage.getItem("receivePaymentIndoor") || "[]");
        payments.push({
            id: Date.now(),
            narration: `Patient Bill - ${name || "Indoor Patient"}`,
            credit: payable,
            debit: 0
        });
        localStorage.setItem("receivePaymentIndoor", JSON.stringify(payments));

        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        patients.push({
            id: Date.now(),
            patientId,
            title,
            name,
            phone,
            address,
            gender,
            ageY, ageM, ageD,
            doctor: selectedDoctor,
            referer: selectedReferer,
            tests,
            total,
            discount: discountAmount,
            paid: paidAmount,
            payable,
            due,
            returnMoney,
            date: new Date().toISOString()
        });
        localStorage.setItem("patients", JSON.stringify(patients));

        setShowPopup(true);
        setPatientId(generatePatientId());
    };

    // Filters
    const filteredDoctors = doctors.filter(d => {
        const name = typeof d === "string" ? d : d?.name || "";
        return name.toLowerCase().includes(doctorSearch.toLowerCase());
    });

    const filteredReferers = referers.filter(r => {
        const name = typeof r === "string" ? r : r?.name || "";
        return name.toLowerCase().includes(referSearch.toLowerCase());
    });

    const filteredTests = testsList.filter(t =>
        t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
        String(t.id || "").includes(testSearch)
    );

    return (
        <>
            <Client />
            <section className="card-box grid-fraction" id="Patient_information"
                style={{ height: "98vh", overflow: "hidden" }}>

                <div className="Patient_Table" style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>

                    {/* Patient Search */}
                    <div className="flex flex-col md:flex-row gap-4 my-4">
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Name</span>
                            <input type="text" placeholder="Enter Patient Name" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={searchName} onChange={(e) => setSearchName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()} />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Mobile No</span>
                            <input type="text" placeholder="Enter Patient Phone No." maxLength={11}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={searchPhone} onChange={(e) => setSearchPhone(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()} />
                        </div>
                        <div className="flex items-end">
                            <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                                onClick={handlePatientSearch}>Search</button>
                        </div>
                    </div>

                    <h2 className="text-2xl text-center text-fuchsia-800 rounded-xl bg-gray-200 p-2 font-bold">Patient Information</h2>

                    {/* Form Rows */}
                    <div className="form-row">
                        <select className="input-test" value={title} onChange={(e) => handleTitleChange(e.target.value)}>
                            <option>Title</option>
                            <option>Mr.</option>
                            <option>Md.</option>
                            <option>Mrs.</option>
                            <option>Miss</option>
                            <option>Ms.</option>
                            <option>Baby</option>
                        </select>
                        <span className="label">Patient Name:</span>
                        <input className="input-test flex-1" placeholder="Patient Name" ref={nameRef}
                            value={name} onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && phoneRef.current.focus()} />
                        <input className="input-test small w-20 text-center" value={patientId} readOnly />
                        <input className="input-test small" value={gender} readOnly />
                    </div>

                    <div className="form-row">
                        <span className="label">Phone:</span>
                        <input className="input-test" value={phone} maxLength={11}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Phone" ref={phoneRef} />
                        <span className="label">Address:</span>
                        <input className="input-test flex-1" placeholder="Address" value={address}
                            onChange={(e) => setAddress(e.target.value)} ref={addressRef} />
                        <div className="age-box">
                            <span className="label">Age :</span>
                            <input className="age-input" placeholder="Y" value={ageY} onChange={(e) => setAgeY(e.target.value)} />
                            <input className="age-input" placeholder="M" value={ageM} onChange={(e) => setAgeM(e.target.value)} />
                            <input className="age-input" placeholder="D" value={ageD} onChange={(e) => setAgeD(e.target.value)} />
                        </div>
                    </div>

                    {/* Doctor Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <h3 className="whitespace-nowrap font-semibold">Doctor :</h3>
                        <input
                            className="flex-1 p-2 border rounded cursor-pointer"
                            placeholder="Search Doctor"
                            value={doctorSearch}
                            onChange={handleDoctorSearch}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setDoctorSearch("");
                                    document.querySelector('input[placeholder="Search Referer"]').focus();
                                }
                            }}
                        />
                        <select className="flex-1 p-2 border rounded" value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}>
                            {doctorSearch.trim() !== "" && filteredDoctors.length === 0 ? (
                                <option value="">❌ Invalid Search, No Doctor Here!!</option>
                            ) : (
                                <option value="">Select Doctor</option>
                            )}
                            {filteredDoctors.map((d, i) => {
                                const docName = typeof d === "string" ? d : d?.name || "";
                                return <option key={i} value={docName}>{docName}</option>;
                            })}
                        </select>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                            style={{ width: "80px" }} onClick={addDoctor}>+ Add</button>
                    </div>

                    {/* Referer Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <h3 className="whitespace-nowrap font-semibold">Referer :</h3>
                        <input
                            className="flex-1 p-2 border rounded cursor-pointer"
                            placeholder="Search Referer"
                            value={referSearch}
                            onChange={handleRefererSearch}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setReferSearch("");
                                    document.querySelector('input[placeholder="Search Test By Name / ID"]').focus();
                                }
                            }}
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
                            {filteredReferers.map((r, i) => {
                                const refName = typeof r === "string" ? r : r?.name || "";
                                return <option key={i} value={refName}>{refName}</option>;
                            })}
                        </select>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                            style={{ width: "80px" }} onClick={addReferer}>+ Add</button>
                    </div>

                    {/* Test Section */}
                    <h3>Add Test : </h3>
                    <div className="flex-row">
                        <input className="input-test flex-1" placeholder="Search Test By Name / ID" value={testSearch}
                            onChange={(e) => {
                                const val = e.target.value;
                                setTestSearch(val);
                                const found = testsList.find(t =>
                                    t.name.toLowerCase().includes(val.toLowerCase()) || String(t.id).includes(val)
                                );
                                if (found) {
                                    setTestName(found.name);
                                    setCost(found.price);
                                } else {
                                    setTestName(""); setCost("");
                                }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && addTest()}
                        />
                        <select className="input-test flex-1" value={testName}
                            onChange={(e) => {
                                const sel = testsList.find(t => t.name === e.target.value);
                                if (sel) { setTestName(sel.name); setCost(sel.price); }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && addTest()}
                        >
                            <option value="">Select Option</option>
                            {filteredTests.map((t, i) => (
                                <option key={i} value={t.name}>{t.id} - {t.name}</option>
                            ))}
                        </select>
                        <input className="input-test small" value={cost} readOnly />
                        <input className="input-test flex-1" placeholder="Have any Comments" value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTest()}
                        />
                        <button className="btn cursor-pointer" onClick={addTest}>Ok</button>
                        <button className="btn cursor-pointer" onClick={addTestName}>Add New</button>
                    </div>

                    {/* Table */}
                    <div className="table-wrapper" style={{ flex: 1, overflow: "auto" }}>
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
                                        <td><button className="remove-btn cursor-pointer" onClick={() => removeTest(i)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 4 Navigation Buttons */}
                    <div className="flex gap-3 mt-3">
                        <button className="home-button flex-1 cursor-pointer"
                            onClick={() => navigate("/due-collection")}>Due Collection</button>
                        <button className="home-button flex-1 cursor-pointer"
                            onClick={() => navigate("/SearchAndEdit/Test")}>Patient List</button>
                        <button className="home-button flex-1 cursor-pointer"
                            onClick={() => navigate("/search-test")}>Search Test</button>
                        <button className="home-button flex-1 cursor-pointer"
                            onClick={() => navigate("/reports")}>Reports</button>
                    </div>

                </div>

                {/* Bill Section */}
                <div className="Amount_Table">
                    <h2 className="text-4xl text-center font-bold text-blue-700 bg-pink-300 rounded-xl p-4">Bill Section</h2>
                    <div className="calc-grid">
                        <div className="box"><p className="mb-5">Total Amount</p><h3 className="text-blue-700 text-3xl">{total}</h3></div>
                        <div className="box">
                            <p className="text-2xl mb-5">Discount</p>
                            <input className="input-test" type="number" value={discount || ""} ref={discountRef}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                onKeyDown={(e) => e.key === "Enter" && paidRef.current.focus()} />
                        </div>
                        <div className="box">
                            <p className="text-2xl mb-5">Paid</p>
                            <input className="input-test text-green-700 text-center text-2xl" type="number" value={paid || ""} ref={paidRef}
                                onChange={(e) => setPaid(Number(e.target.value))}
                                onKeyDown={(e) => e.key === "Enter" && handleSave()} />
                        </div>
                        <div className="box"><p className="mb-5">Payable</p><h3 className="text-3xl font-extrabold text-red-600">{payable}</h3></div>
                        <div className="box highlight"><p className="mb-5">Due</p><h3>{due}</h3></div>
                        <div className="box return"><p className="mb-5">Return</p><h3>{returnMoney}</h3></div>
                    </div>

                    <div className="right">
                        <button className="btn-primary cursor-pointer" onClick={handleSave}>Save & Print</button>

                        <div className="flex gap-3 mt-3">
                            {/* <button className="home-button flex-1 cursor-pointer" 
                                onClick={() => navigate(-1)}>← Back</button> */}
                            <button className="home-button"
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        navigate(-1);
                                    } else {
                                        navigate("/diagnosis"); // fallback page
                                    }
                                }}>
                                Back
                            </button>
                            <button className="home-button flex-1 cursor-pointer"
                                onClick={() => window.open("/test", "_blank")}>Open New Page</button>
                        </div>

                        <PopupModal
                            open={showPopup}
                            onClose={() => setShowPopup(false)}
                            data={{
                                patientId, title, name, phone, address, gender,
                                age: `${ageY || 0}Y ${ageM || 0}M ${ageD || 0}D`,
                                doctor: selectedDoctor, referer: selectedReferer,
                                tests, total, discount: discountAmount, paid: paidAmount, payable, due, returnMoney
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}