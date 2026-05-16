import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DueCollection() {
    const navigate = useNavigate();

    // ==================== STATES ====================
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        id: "", name: "", ageY: "", ageM: "", ageD: "", gender: "",
        phone: "", address: "", doctor: "", referer: ""
    });

    const [tests, setTests] = useState([]);
    const [discountType, setDiscountType] = useState("fixed"); // "fixed" or "percent"
    const [discountValue, setDiscountValue] = useState(0);
    const [paid, setPaid] = useState(0);

    const [message, setMessage] = useState({ show: false, type: "", text: "" });

    // ==================== LOAD DATA ====================
    useEffect(() => {
        const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        setPatients(savedPatients);
        setFilteredPatients(savedPatients);
    }, []);

    // ==================== FILTER PATIENTS WITH DUE ====================
    useEffect(() => {
        let filtered = patients.filter(p => (p.due || 0) > 0);

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(p.id || "").includes(searchTerm)
            );
        }

        setFilteredPatients(filtered);
    }, [searchTerm, patients]);

    // ==================== SELECT PATIENT ====================
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);

        setFormData({
            id: patient.id || "",
            name: patient.name || "",
            ageY: patient.ageY || "",
            ageM: patient.ageM || "",
            ageD: patient.ageD || "",
            gender: patient.gender || "",
            phone: patient.phone || "",
            address: patient.address || "",
            doctor: patient.doctor || "",
            referer: patient.referer || ""
        });

        setTests(patient.tests || []);
        setDiscountValue(patient.discount || 0);
        setPaid(patient.paid || 0);
    };

    // ==================== CALCULATION ====================
    const totalAmount = tests.reduce((sum, t) => sum + Number(t.cost || 0), 0);

    const discountAmount = discountType === "percent"
        ? Math.round((totalAmount * discountValue) / 100)
        : Number(discountValue);

    const payable = Math.max(0, totalAmount - discountAmount);
    const due = Math.max(0, payable - (selectedPatient?.paid || 0));
    const amountInWords = payable > 0 ? `${payable} Taka Only` : "Zero Taka Only";

    // ==================== MESSAGE ====================
    const showMessage = (text, type = "success") => {
        setMessage({ show: true, type, text });
        setTimeout(() => setMessage({ show: false, type: "", text: "" }), 2500);
    };

    // ==================== SAVE PAYMENT ====================
    const handleSavePayment = () => {
        if (!selectedPatient) return;

        const finalPaid = paid + (selectedPatient.paid || 0);
        const remainingDue = Math.max(0, payable - finalPaid);

        if (remainingDue > 0) {
            showMessage("Full Payment must be collected in Due Collection!", "error");
            return;
        }

        const updatedPatient = {
            ...selectedPatient,
            paid: finalPaid,
            discount: discountAmount,
            due: 0,
            payable,
            date: new Date().toISOString()
        };

        const allPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const index = allPatients.findIndex(p => p.id === selectedPatient.id);

        if (index !== -1) {
            allPatients[index] = updatedPatient;
        }

        localStorage.setItem("patients", JSON.stringify(allPatients));
        setPatients(allPatients);

        showMessage("Due Collected Successfully!");
        
        // Reset after save
        setTimeout(() => {
            setSelectedPatient(null);
            setPaid(0);
        }, 1500);
    };

    return (
        <>
            <div className="h-[98vh] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
                <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white py-4 px-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Due Collection</h1>
                        <h2 className="text-xl">Total Due Patients: {filteredPatients.length}</h2>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid gap-4 p-4 h-[calc(98vh-90px)]" style={{ gridTemplateColumns: "1fr 4fr 2fr" }}>

                        {/* LEFT - Patient List */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search by ID or Name..."
                                className="w-full p-3 border rounded-2xl mb-3 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <div className="flex-1 overflow-auto pr-1 space-y-2">
                                {filteredPatients.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => handleSelectPatient(p)}
                                        className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                                            selectedPatient?.id === p.id
                                                ? "bg-red-600 text-white border-red-600"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <span className="font-bold">{p.id}</span> - {p.name}
                                        <span className="block text-sm mt-1 text-red-600 font-semibold">
                                            Due: ৳{p.due || 0}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MIDDLE - Patient Info */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Patient Information</h2>
                                <button
                                    onClick={handleSavePayment}
                                    disabled={!selectedPatient}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-xl font-bold cursor-pointer"
                                >
                                    Collect Due
                                </button>
                            </div>

                            {/* Patient Details */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <input className="p-3 border rounded-xl" value={formData.id} readOnly placeholder="Patient ID" />
                                <input className="p-3 border rounded-xl" value={formData.name} readOnly placeholder="Patient Name" />
                            </div>

                            <div className="grid grid-cols-4 gap-3 mb-4">
                                <input className="p-3 border rounded-xl" value={formData.ageY} readOnly placeholder="Y" />
                                <input className="p-3 border rounded-xl" value={formData.ageM} readOnly placeholder="M" />
                                <input className="p-3 border rounded-xl" value={formData.ageD} readOnly placeholder="D" />
                                <input className="p-3 border rounded-xl" value={formData.gender} readOnly placeholder="Gender" />
                            </div>

                            <input className="p-3 border rounded-xl mb-4" value={formData.phone} readOnly placeholder="Mobile" />

                            {/* Tests */}
                            <div className="flex-1 overflow-auto border rounded-2xl p-3">
                                <h3 className="font-bold mb-2">Tests</h3>
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left p-2">Test Name</th>
                                            <th className="text-right p-2">Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map((t, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="p-2">{t.name}</td>
                                                <td className="p-2 text-right font-bold">{t.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* RIGHT - Billing */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">
                            <h2 className="text-2xl font-bold text-center mb-4 text-red-700">Due Collection</h2>

                            <div className="space-y-4 flex-1">
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p>Total Amount</p>
                                    <p className="text-4xl font-bold text-blue-700">{totalAmount}</p>
                                </div>

                                {/* Discount Section */}
                                <div className="bg-white p-4 border rounded-2xl">
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            onClick={() => setDiscountType("fixed")}
                                            className={`flex-1 py-2 rounded-xl font-semibold ${discountType === "fixed" ? "bg-green-600 text-white" : "bg-red-600"}`}
                                        >
                                            Discount Amount
                                        </button>
                                        <button
                                            onClick={() => setDiscountType("percent")}
                                            className={`flex-1 py-2 rounded-xl font-semibold ${discountType === "percent" ? "bg-green-600 text-white" : "bg-red-600"}`}
                                        >
                                            Discount Percentage
                                        </button>
                                    </div>

                                    <input
                                        type="number"
                                        value={discountValue}
                                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                                        className="w-full p-3 border rounded-xl text-center text-2xl font-bold"
                                        placeholder={discountType === "percent" ? "%" : "Amount"}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                                        <p className="font-semibold text-emerald-700">Payable</p>
                                        <p className="text-3xl font-bold text-emerald-600">{payable}</p>
                                    </div>

                                    <div className="bg-red-50 p-4 rounded-2xl text-center">
                                        <p className="font-semibold text-red-700">Current Due</p>
                                        <p className="text-3xl font-bold text-red-600">{due}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold mb-1">Amount to Collect</p>
                                    <input
                                        type="number"
                                        value={paid}
                                        onChange={(e) => setPaid(Number(e.target.value))}
                                        className="w-full p-4 border-2 border-green-500 rounded-2xl text-center text-3xl font-bold focus:outline-none"
                                        placeholder="Enter Received Amount"
                                    />
                                </div>

                                <div className="bg-indigo-50 p-4 rounded-2xl">
                                    <p className="font-semibold">Amount in Words</p>
                                    <p className="text-lg font-medium">{amountInWords}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-2xl font-bold"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleSavePayment}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold"
                                >
                                    💰 Collect & Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Toast */}
            {message.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className={`px-10 py-6 rounded-2xl text-white text-xl font-bold shadow-2xl ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                        {message.text}
                    </div>
                </div>
            )}
        </>
    );
}