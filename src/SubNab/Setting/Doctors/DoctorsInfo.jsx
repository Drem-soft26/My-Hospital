import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../../Clients/Client";

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

    const [selectedIndex, setSelectedIndex] = useState(null);

    // 🔥 old data remove
    useEffect(() => {
        localStorage.removeItem("doctors"); // remove old wrong data
        setDoctors([]);
    }, []);

    // Auto ID
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

    // Edit
    const handleEdit = () => {
        if (selectedIndex === null) return;

        const updated = [...doctors];
        updated[selectedIndex] = { id, name, designation, phone, email, feeNew, feeOld };

        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
    };

    // Delete
    const handleDelete = () => {
        if (selectedIndex === null) return;

        const updated = doctors.filter((_, i) => i !== selectedIndex);

        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
    };

    // Select
    const handleSelect = (doc, index) => {
        setSelectedIndex(index);
        setId(doc.id);
        setName(doc.name);
        setDesignation(doc.designation);
        setPhone(doc.phone);
        setEmail(doc.email);
        setFeeNew(doc.feeNew);
        setFeeOld(doc.feeOld);
    };

    const clearForm = () => {
        setSelectedIndex(null);
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

                {/* LEFT */}
                <div
                    className="col-span-1 border-2 border-cyan-400 p-6 h-max overflow-y-auto shadow-[3px_4px_7px_rgba(0,0,0,0.3)]">
                    <input
                        className="w-full p-2 border mb-3 rounded"
                        placeholder="Search Doctor..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <h4 className="text-2xl font-bold text-center">Name of Doctor's List</h4>
                    <ul className="space-y-1">
                        {filteredDoctors.map((doc, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelect(doc, i)}
                                className="p-2 cursor-pointer hover:bg-blue-200 rounded"
                            >
                                {doc.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT */}
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
                        <button className="home-button" onClick={handleSave}>Save</button>
                        <button className="home-button" onClick={handleEdit}>Edit</button>
                        <button className="home-button" onClick={handleDelete}>Delete</button>
                        <button className="home-button" onClick={() => navigate(-1)}>Back</button>
                    </div>

                </div>
            </div>
        </>
    );
}