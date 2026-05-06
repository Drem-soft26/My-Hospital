import React, { useState, useEffect } from "react";
import Client from "../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function DoctorsInfo() {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [feeNew, setFeeNew] = useState("");
    const [feeOld, setFeeOld] = useState("");

    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        localStorage.removeItem("doctors");
        setDoctors([]);
    }, []);

    useEffect(() => {
        setId(doctors.length + 1);
    }, [doctors]);

    // Save
    const handleSave = () => {
        const newDoctor = { id, name, designation, phone, email, feeNew, feeOld };
        const updated = [...doctors, newDoctor];

        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
    };

    // Edit FIXED 🔥
    const handleEdit = () => {
        if (!selectedId) return;

        const updated = doctors.map((doc) =>
            doc.id === selectedId
                ? { id: selectedId, name, designation, phone, email, feeNew, feeOld }
                : doc
        );

        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
    };

    // Delete FIXED 🔥
    const handleDelete = () => {
        if (!selectedId) return;

        const updated = doctors.filter(doc => doc.id !== selectedId);

        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
    };

    // Select
    const handleSelect = (doc) => {
        setSelectedId(doc.id);
        setId(doc.id);
        setName(doc.name);
        setDesignation(doc.designation);
        setPhone(doc.phone);
        setEmail(doc.email);
        setFeeNew(doc.feeNew);
        setFeeOld(doc.feeOld);
    };

    const clearForm = () => {
        setSelectedId(null);
        setName("");
        setDesignation("");
        setPhone("");
        setEmail("");
        setFeeNew("");
        setFeeOld("");
    };

    const filteredDoctors = doctors.filter(d =>
        (d.name || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Client />

            <div className="grid grid-cols-3 gap-4 p-4">

                {/* LEFT (UNCHANGED) */}
                <div className="col-span-1 border-2 border-cyan-400 p-6 max-h-[90vh] overflow-y-auto shadow-[3px_4px_7px_rgba(0,0,0,0.3)]">
                    <input
                        className="w-full p-2 border mb-3 rounded"
                        placeholder="Search Doctor..."
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <h4 className="text-2xl font-bold text-center">Name of Doctor's List</h4>

                    <ul className="space-y-1">
                        {filteredDoctors.map((doc, i) => (
                            <li
                                key={doc.id}
                                onClick={() => handleSelect(doc)}
                                className="p-2 cursor-pointer hover:bg-blue-200 rounded flex gap-2"
                            >
                                <span className="font-bold">{i + 1}.</span>
                                <span>{doc.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT (FIXED UI + SPAN LABELS) */}
                <div className="col-span-2 border-2 border-cyan-400 p-8">

                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <span>ID :</span>
                            <input value={id} readOnly className="input-test w-full" />
                        </div>

                        <div>
                            <span>Doctor Name :</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="input-test w-full" />
                        </div>

                        <div>
                            <span>Designation :</span>
                            <input value={designation} onChange={(e) => setDesignation(e.target.value)} className="input-test w-full" />
                        </div>

                        <div>
                            <span>Phone :</span>
                            <input
                                value={phone}
                                maxLength={11}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                className="input-test w-full"
                            />
                        </div>

                        <div>
                            <span>Email :</span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-test w-full" />
                        </div>

                        <div>
                            <span>New Fee :</span>
                            <input value={feeNew} onChange={(e) => setFeeNew(e.target.value)} className="input-test w-full" />
                        </div>

                        <div>
                            <span>Old Fee :</span>
                            <input value={feeOld} onChange={(e) => setFeeOld(e.target.value)} className="input-test w-full" />
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-4 gap-3 mt-6">

                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white p-2 cursor-pointer"
                        >
                            Save
                        </button>

                        <button
                            onClick={handleEdit}
                            className="bg-yellow-500 text-white p-2 cursor-pointer"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white p-2 cursor-pointer"
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 text-white p-2 cursor-pointer"
                        >
                            Back
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}