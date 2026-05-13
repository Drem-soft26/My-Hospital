import React, { useState, useEffect } from "react";
import Client from "../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function DoctorsInfo() {

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");

    const [id, setId] = useState(1);
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [available, setAvailable] = useState("");
    const [feeNew, setFeeNew] = useState("");
    const [feeOld, setFeeOld] = useState("");

    const [selectedId, setSelectedId] = useState(null);

    const navigate = useNavigate();

    // Default 12 Doctors
    const defaultDoctors = [
        { id: 1, name: "Prof. Dr. Md. Abdur Rahman", designation: "MBBS, BCS(Health)", phone: "01711234567", address: "Tangail Sadar", available: "Yes", feeNew: "800", feeOld: "600" },
        { id: 2, name: "Dr. Md. Abul Karim", designation: "Professor, MBBS, RMC", phone: "01722345678", address: "Tangail", available: "Yes", feeNew: "700", feeOld: "500" },
        { id: 3, name: "Dr. Toffazal Hasan", designation: "MBBS, Tangail Polyclinic", phone: "01733456789", address: "Tangail", available: "Yes", feeNew: "600", feeOld: "400" },
        { id: 4, name: "Dr. Sha Alam Paikora", designation: "MBBS, General Physician", phone: "01744567890", address: "Tangail", available: "Yes", feeNew: "500", feeOld: "350" },
        { id: 5, name: "Dr. Sultana Kamal", designation: "Gynecologist & Surgeon", phone: "01755678901", address: "Tangail", available: "Yes", feeNew: "900", feeOld: "700" },
        { id: 6, name: "Dr. Rebeka Hossain", designation: "MBBS, DMC, Neuro Medicine", phone: "01766789012", address: "Tangail", available: "Yes", feeNew: "850", feeOld: "650" },
        { id: 7, name: "Prof. Dr. Nabil Ahmed", designation: "Medicine Specialist", phone: "01777890123", address: "Tangail", available: "No", feeNew: "1000", feeOld: "800" },
        { id: 8, name: "Dr. Fatima Begum", designation: "MBBS, Child Specialist", phone: "01788901234", address: "Tangail", available: "Yes", feeNew: "750", feeOld: "550" },
        { id: 9, name: "Dr. Kamrul Islam", designation: "Orthopedic Surgeon", phone: "01799012345", address: "Tangail", available: "Yes", feeNew: "950", feeOld: "750" },
        { id: 10, name: "Dr. Nasrin Akter", designation: "MBBS, Skin & VD", phone: "01811234567", address: "Tangail", available: "Yes", feeNew: "700", feeOld: "500" },
        { id: 11, name: "Dr. Mizanur Rahman", designation: "Cardiologist", phone: "01822345678", address: "Tangail", available: "Yes", feeNew: "1200", feeOld: "900" },
        { id: 12, name: "Dr. Sumaiya Khan", designation: "MBBS, Medicine", phone: "01833456789", address: "Tangail", available: "Yes", feeNew: "650", feeOld: "450" },
    ];

    // Load Doctors
    useEffect(() => {
        try {
            const saved = localStorage.getItem("doctors");

            if (!saved) {
                setDoctors(defaultDoctors);
                localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
            } else {
                const parsed = JSON.parse(saved);

                if (!Array.isArray(parsed) || parsed.length < 5) {
                    setDoctors(defaultDoctors);
                    localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
                } else {
                    setDoctors(parsed);
                }
            }
        } catch (error) {
            console.log(error);

            setDoctors(defaultDoctors);
            localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
        }
    }, []);

    // Auto ID
    useEffect(() => {
        if (doctors.length > 0) {
            const maxId = Math.max(...doctors.map((d) => Number(d.id || 0)));
            setId(maxId + 1);
        } else {
            setId(1);
        }
    }, [doctors]);

    const isAvailableSelected =
        available === "Yes" || available === "No";

    // Save
    const handleSave = () => {

        if (!name.trim()) {
            return alert("Doctor Name is required!");
        }

        const newDoctor = {
            id,
            name,
            designation,
            phone,
            address,
            available,
            feeNew,
            feeOld
        };

        const updated = [...doctors, newDoctor];

        setDoctors(updated);

        localStorage.setItem(
            "doctors",
            JSON.stringify(updated)
        );

        clearForm();
    };

    // Edit
    const handleEdit = () => {

        if (!selectedId) {
            return alert("Please select a doctor first!");
        }

        const updated = doctors.map((doc) =>
            Number(doc.id) === Number(selectedId)
                ? {
                    ...doc,
                    name,
                    designation,
                    phone,
                    address,
                    available,
                    feeNew,
                    feeOld
                }
                : doc
        );

        setDoctors(updated);

        localStorage.setItem(
            "doctors",
            JSON.stringify(updated)
        );

        clearForm();
    };

    // Delete
    const handleDelete = () => {

        if (!selectedId) {
            return alert("Please select a doctor first!");
        }

        const updated = doctors.filter(
            (doc) => Number(doc.id) !== Number(selectedId)
        );

        setDoctors(updated);

        localStorage.setItem(
            "doctors",
            JSON.stringify(updated)
        );

        clearForm();
    };

    // Select Doctor
    const handleSelect = (doc) => {

        setSelectedId(doc.id);

        setId(doc.id);
        setName(doc.name || "");
        setDesignation(doc.designation || "");
        setPhone(doc.phone || "");
        setAddress(doc.address || "");
        setAvailable(doc.available || "");
        setFeeNew(doc.feeNew || "");
        setFeeOld(doc.feeOld || "");
    };

    // Clear Form
    const clearForm = () => {

        setSelectedId(null);

        setName("");
        setDesignation("");
        setPhone("");
        setAddress("");
        setAvailable("");
        setFeeNew("");
        setFeeOld("");
    };

    // Search
    const filteredDoctors = doctors.filter((d) =>
        (d.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <>
            <Client />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-[92vh] overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-50 to-sky-100">

                {/* LEFT SIDE */}
                <div className="lg:col-span-1 border-2 border-cyan-400 rounded-xl p-5 flex flex-col shadow-[4px_4px_8px_grey] bg-white overflow-hidden">

                    <input
                        className="w-full p-2 border rounded mb-3 focus:outline-cyan-400"
                        placeholder="Search Doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <h4 className="text-2xl font-bold text-center mb-3 text-cyan-700">
                        Name of Doctor's List
                    </h4>

                    <ul className="space-y-1 overflow-y-auto flex-1 pr-2">

                        {filteredDoctors.length === 0 ? (
                            <li className="p-4 text-center text-gray-500">
                                No doctor found
                            </li>
                        ) : (

                            filteredDoctors.map((doc, i) => (

                                <li
                                    key={doc.id}
                                    onClick={() => handleSelect(doc)}
                                    className="p-3 cursor-pointer hover:bg-blue-200 rounded flex gap-3 transition-all hover:shadow"
                                >

                                    <span className="font-bold text-cyan-700 w-6">
                                        {i + 1}.
                                    </span>

                                    <span className="font-medium">
                                        {doc.name}
                                    </span>

                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 border-2 border-cyan-400 rounded-xl p-6 flex flex-col shadow-[3px_4px_7px_black] bg-gray-50 overflow-hidden">

                    <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 gap-4">

                        <div>
                            <span className="font-semibold">ID :</span>

                            <input
                                value={id}
                                readOnly
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Doctor Name :
                            </span>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Designation :
                            </span>

                            <input
                                value={designation}
                                onChange={(e) =>
                                    setDesignation(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Phone :
                            </span>

                            <input
                                value={phone}
                                maxLength={11}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Dr. Address :
                            </span>

                            <input
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Dr. Available :
                            </span>

                            <select
                                value={available}
                                onChange={(e) =>
                                    setAvailable(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            >

                                <option value="">
                                    Select Option
                                </option>

                                <option value="Yes">
                                    Yes
                                </option>

                                <option value="No">
                                    No
                                </option>

                            </select>
                        </div>

                        <div>
                            <span className="font-semibold">
                                Doctor Visit: (New Patient)
                            </span>

                            <input
                                type="number"
                                value={feeNew}
                                onChange={(e) =>
                                    setFeeNew(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                        <div>
                            <span className="font-semibold">
                                Doctor Visit: (Old Patient)
                            </span>

                            <input
                                type="number"
                                value={feeOld}
                                onChange={(e) =>
                                    setFeeOld(e.target.value)
                                }
                                className="border p-2 rounded w-full mt-1"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-4 border-t">

                        <button
                            onClick={handleSave}
                            disabled={!isAvailableSelected}
                            className={`p-3 rounded font-bold text-white ${
                                available === "Yes"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : available === "No"
                                    ? "bg-black hover:bg-gray-800"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Save
                        </button>

                        <button
                            onClick={handleEdit}
                            className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded font-bold text-white"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 p-3 rounded font-bold text-white"
                        >
                            Delete
                        </button>

                        <button
                            onClick={clearForm}
                            className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-bold text-white"
                        >
                            Add New
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 hover:bg-gray-600 p-3 rounded font-bold text-white"
                        >
                            Back
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}


