import React, { useState, useEffect, useRef } from "react";
import "./Test.css";
import PopupModal from "../../../../PopupModal";
import Client from "../../../../Clients/Client";
import { useNavigate } from "react-router-dom";
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

    // end validitation 

    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
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


    // refs (ENTER navigation)
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    useEffect(() => {
        const savedDoctors = JSON.parse(localStorage.getItem("doctors"));
        const savedReferers = JSON.parse(localStorage.getItem("referers"));
        const savedTests = JSON.parse(localStorage.getItem("testsList"));

        const defaultDoctors = [
            "Assistent Professor Dr. Md. Abdur Rahman MBBS DU BCS Health",
            "Prosessor Dr. Md. Abul Karim MBBS RMC, Bcs Health, Medicine Specalist",
            "Dr. Toffazal Hasan, Tnagail Polytinic, BCS Admin",
            "Dr. Sha Alam paikora",
            "Dr. Sultana Kamal, Surjun Gyny",
            "Dr. Rebeka Hossain, MBBS DMC, Neouro Medicine ",
            "Professon Dr. Nabil Ahmed, "
        ];

        const defaultReferers = [
            "Self",
            "Rimon",
            "Naimul",
            "Dr. Rahman",
            "Dr. Abul Karim",
            "Hospital Desk",
            "Online",
            "Nafiz",
            "Arif"
        ];

        const defaultTests = [
            { name: "CBC", price: 200 },
            { name: "RBS", price: 100 },
            { name: "Urine R/E", price: 150 },
            { name: "Creatinine", price: 300 },
            { name: "SGPT", price: 250 },
            { name: "Lipid Profile", price: 600 },
            { name: "X-Ray Chest", price: 500 },
            { name: "USG Abdomen", price: 800 },
            { name: "ECG", price: 400 }
        ];

        setDoctors(savedDoctors && savedDoctors.length ? savedDoctors : defaultDoctors);
        setReferers(savedReferers && savedReferers.length ? savedReferers : defaultReferers);
        setTestsList(savedTests && savedTests.length ? savedTests : defaultTests);

    }, []);

    useEffect(() => {
        localStorage.setItem("doctors", JSON.stringify(doctors));
        localStorage.setItem("referers", JSON.stringify(referers));
        localStorage.setItem("testsList", JSON.stringify(testsList));
    }, [doctors, referers, testsList]);

    const handleTitleChange = (value) => {
        setTitle(value);
        if (value === "Mr") setGender("Male");
        else if (value === "Mrs") setGender("Female");
        else if (value === "Md.") setGender("Male");
        else if (value === "Miss") setGender("Female");
        else setGender("Others");
    };

    const addDoctor = () => {
        const name = prompt("Doctor Name:");
        if (name) setDoctors([...doctors, name]);
    };

    const addReferer = () => {
        const name = prompt("Referer Name:");
        if (name) setReferers([...referers, name]);
    };

    const addTestName = () => {
        const name = prompt("Test Name:");
        const price = prompt("Test Price:");

        if (!name || !price) return;

        const newTest = {
            name: name.trim(),
            price: Number(price)
        };

        // prevent duplicate (optional safe guard)
        const exists = testsList.some(t => t.name.toLowerCase() === newTest.name.toLowerCase());
        if (exists) {
            alert("Test already exists!");
            return;
        }

        const updatedList = [...testsList, newTest];

        setTestsList(updatedList);
        localStorage.setItem("testsList", JSON.stringify(updatedList));
    };

    const filteredDoctors = doctors.filter(d =>
        d.toLowerCase().includes(doctorSearch.toLowerCase())
    );

    const filteredReferers = referers.filter(r =>
        r.toLowerCase().includes(referSearch.toLowerCase())
    );

    const filteredTests = testsList.filter(t =>
        t.name.toLowerCase().includes(testSearch.toLowerCase())
    );

    const addTest = () => {
        if (!testName || !cost) return;

        setTests([
            ...tests,
            { name: testName, cost: Number(cost), comment },
        ]);

        setTestName("");
        setCost("");
        setComment("");
    };

    const removeTest = (i) => {
        setTests(tests.filter((_, index) => index !== i));
    };

    const total = tests.reduce((sum, t) => sum + t.cost, 0);
    const payable = total - discount;
    const finalPaid =
        paid === "" || paid === null || paid === undefined
            ? payable
            : Number(paid);
    const due = finalPaid > payable ? 0 : payable - finalPaid;
    const returnMoney = finalPaid > payable ? finalPaid - payable : 0;

    return (
        <>
            <Client />
            <section className="card-box grid-fraction" id="Patient_information">
                <div className="Patient_Table">
                    <h2 className="text-2xl text-center font-bold">Patient Information</h2>
                    {/* Name & gender part  */}
                    <div className="form-row">

                        <select
                            className="input-test"
                            onChange={(e) => handleTitleChange(e.target.value)}
                        >
                            <option>Title</option>
                            <option>Mr</option>
                            <option>Md.</option>
                            <option>Mrs</option>
                            <option>Miss</option>
                            <option>Baby</option>
                        </select>

                        <span className="label">Patient Name:</span>

                        <input
                            className="input-test flex-1"
                            placeholder="Patient Name"
                            ref={nameRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") phoneRef.current.focus();
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="input-test small"
                            value={gender}
                            readOnly
                        />

                    </div>
                    {/* Phone & Address Section  */}
                    <div className="form-row">

                        <span className="label">Phone:</span>

                        <input
                            className="input-test"
                            value={phone}
                            maxLength={11}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="Phone"
                        />

                        <span className="label">Address:</span>
                        <input
                            className="input-test flex-1"
                            placeholder="Address"
                            ref={addressRef}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <div className="age-box">
                            <span className="label">Age : </span>
                            <input className="age-input" placeholder="Y" />
                            <input className="age-input" placeholder="M" />
                            <input className="age-input" placeholder="D" />
                        </div>

                    </div>

                    {/* Doctor */}
                    <h3>Doctor : </h3>
                    <div className="flex-row">
                        <input
                            className="input-test search-input"
                            placeholder="Search Doctor"
                            onChange={(e) => setDoctorSearch(e.target.value)}
                        />

                        <select
                            className="input-test select-small"
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                            {filteredDoctors.map((d, i) => (
                                <option key={i}>{d}</option>
                            ))}
                        </select>

                        <button className="btn" onClick={addDoctor}>
                            + Add
                        </button>
                    </div>

                    {/* Referer */}
                    <h3>Referer :</h3>
                    <div className="flex-row">
                        <input
                            className="input-test  search-input"
                            placeholder="Search Referer"
                            onChange={(e) => setReferSearch(e.target.value)}
                        />

                        <select className="input-test select-small"
                            onChange={(e) => setSelectedReferer(e.target.value)}
                        >
                            {filteredReferers.map((r, i) => (
                                <option key={i}>{r}</option>
                            ))}
                        </select>

                        <button className="btn" onClick={addReferer}>+ Add</button>
                    </div>

                    {/* Test */}
                    <h3>Add Test : </h3>

                    <div className="flex-row">
                        <input
                            className="input-test flex-1"
                            placeholder="Search Test"
                            onChange={(e) => setTestSearch(e.target.value)}
                        />

                        <select
                            className="input-test flex-1"
                            onChange={(e) => {
                                const selected = testsList.find(t => t.name === e.target.value);
                                if (selected) {
                                    setTestName(selected.name);
                                    setCost(selected.price);
                                }
                            }}
                        >
                            {filteredTests.map((t, i) => (
                                <option key={i} value={t.name}>{t.name}</option>
                            ))}
                        </select>

                        <input className="input-test small" value={cost} readOnly />

                        <input
                            className="input-test flex-1"
                            placeholder="Have any Comments"
                            onChange={(e) => setComment(e.target.value)}
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
                                            <button className="remove-btn" onClick={() => removeTest(i)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <button className="home-button" onClick={() => navigate(-1)}>Back </button> */}
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
                    <button className="home-button"
                        onClick={() => window.open("/test", "_blank")}>Open New Page
                    </button>

                </div>
                {/* Payment Mehod & Money recipt section  */}
                <div className="Amount_Table">
                    <h2 className="text-4xl text-center font-bold p-4">Bill Section</h2>
                    {/* Calculation */}
                    <div className="calc-grid">
                        <div className="box"><p className="mb-5">Total Amount</p><h3>{total}</h3></div>

                        <div className="box">
                            <p className="text-2xl mb-5">Discount</p>
                            <input className="input-test" type="number" onChange={(e) => setDiscount(Number(e.target.value))} />
                        </div>

                        <div className="box">
                            <p className="text-2xl mb-5">Paid</p>
                            <input className="input-test" type="number" onChange={(e) => setPaid(Number(e.target.value))} />
                        </div>

                        <div className="box"><p className="mb-5">Payable</p><h3 >{payable}</h3></div>
                        <div className="box highlight"><p className="mb-5">Due</p><h3>{due}</h3></div>
                        <div className="box return"><p className="mb-5">Return</p><h3>{returnMoney}</h3></div>
                    </div>

                    <div className="right">
                        <button
                            className="btn-primary"
                            onClick={() => {
                                if (!validateForm()) return;   // ❌ stop

                                setShowPopup(true);           // ✅ open popup
                            }}
                        > Save & Print
                        </button>
                        <PopupModal
                            open={showPopup}
                            onClose={() => setShowPopup(false)}
                            data={{
                                title,
                                name,
                                phone,
                                address,
                                gender,
                                // age: ${ageY}Y ${ageM}M ${ageD}D,
                                age: `${ageY || 0}Y ${ageM || 0}M ${ageD || 0}D`,
                                doctor: selectedDoctor,
                                referer: selectedReferer,
                                tests,
                                total,
                                discount,
                                paid,
                                payable,
                                due,
                                returnMoney,
                            }}
                        />
                    </div>
                </div>
            </section></>
    );
}