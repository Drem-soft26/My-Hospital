import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestParameterDetails() {

    const navigate = useNavigate();

    const [tests, setTests] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedTest, setSelectedTest] = useState(null);

    const [parameters, setParameters] = useState({});

    const [form, setForm] = useState({
        sl: "", partOfTest: "", result: "", unit: "", referenceValue: "", hormoneValue: "",
    });

    const [selectedRow, setSelectedRow] = useState(null);

    // ================= POPUP STATE =================
    const [popup, setPopup] = useState({
        show: false,
        title: "",
        message: "",
        type: "", // "confirm" or "success"
        action: null,
    });

    const showConfirmPopup = (actionType) => {
        if (!selectedTest) return;

        let title = "";
        let message = "";

        if (actionType === "save") {
            title = "Confirm Save";
            message = `Are you sure you want to Save parameters for ${selectedTest.name}?`;
        } else if (actionType === "edit") {
            title = "Confirm Edit";
            message = `Are you sure you want to Edit this row in ${selectedTest.name}?`;
        } else if (actionType === "delete") {
            title = "Confirm Delete";
            message = `Are you sure you want to Delete this row from ${selectedTest.name}?`;
        }

        setPopup({
            show: true,
            title,
            message,
            type: "confirm",
            action: actionType,
        });
    };

    const showSuccessPopup = (actionType) => {
        let message = "";
        if (actionType === "save") message = `Successfully Saved ${selectedTest?.name}`;
        else if (actionType === "edit") message = `Successfully Edited in ${selectedTest?.name}`;
        else if (actionType === "delete") message = `Successfully Deleted from ${selectedTest?.name}`;

        setPopup({
            show: true,
            title: "✅ Success",
            message,
            type: "success",
            action: null,
        });
    };

    const closePopup = () => {
        setPopup({ show: false, title: "", message: "", type: "", action: null });
    };

    // Load Tests & Parameters
    useEffect(() => {
        const savedTests = JSON.parse(localStorage.getItem("tests") || "[]");
        const formattedTests = savedTests.map((t, index) => ({
            id: t.testId || index + 1,
            name: t.testName || t.name || "Unnamed Test",
        }));
        setTests(formattedTests);
    }, []);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("testParameters") || "{}");
        setParameters(saved);
    }, []);

    const currentRows = selectedTest ? parameters[selectedTest.id] || [] : [];

    const filteredTests = useMemo(() => {
        return tests.filter((t) =>
            t.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, tests]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (!selectedTest) return alert("Select Test First");
        if (!form.partOfTest.trim()) return alert("Part Of Test Required");

        const newRow = {
            sl: form.sl || currentRows.length + 1,
            partOfTest: form.partOfTest,
            result: form.result,
            unit: form.unit,
            referenceValue: form.referenceValue,
            hormoneValue: form.hormoneValue,
        };

        const updated = {
            ...parameters,
            [selectedTest.id]: [...currentRows, newRow],
        };

        setParameters(updated);
        clearForm();
    };

    const handleSelectRow = (row, index) => {
        setSelectedRow(index);
        setForm(row);
    };

    const handleEdit = () => {
        if (selectedRow === null) return alert("Select a Row First");
        showConfirmPopup("edit");
    };

    const handleDelete = () => {
        if (selectedRow === null) return alert("Select a Row First");
        showConfirmPopup("delete");
    };

    const handleSave = () => {
        showConfirmPopup("save");
    };

    // Execute Confirmed Action
    const executeConfirmedAction = () => {
        if (popup.action === "save") {
            localStorage.setItem("testParameters", JSON.stringify(parameters));
            showSuccessPopup("save");
        } 
        else if (popup.action === "edit") {
            const updatedRows = [...currentRows];
            updatedRows[selectedRow] = form;
            setParameters({ ...parameters, [selectedTest.id]: updatedRows });
            clearForm();
            showSuccessPopup("edit");
        } 
        else if (popup.action === "delete") {
            const updatedRows = currentRows.filter((_, i) => i !== selectedRow);
            const reSerial = updatedRows.map((r, i) => ({ ...r, sl: i + 1 }));
            setParameters({ ...parameters, [selectedTest.id]: reSerial });
            clearForm();
            showSuccessPopup("delete");
        }
        closePopup();
    };

    const handlePrint = () => {
        if (!selectedTest || currentRows.length === 0) {
            alert("No data to print!");
            return;
        }
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <title>${selectedTest.name}</title>
                <style>
                    @page { size: A4 portrait; margin-top: 4in; margin-bottom: 0.5in; margin-left: 0.5in; margin-right: 0.5in; }
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .hospital { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
                    h1 { text-align: center; color: #1e40af; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #333; padding: 10px; text-align: left; }
                    th { background-color: #1e40af; color: white; }
                </style>
            </head>
            <body>
                <div class="hospital">MediPlus Hospital & Hormone Center</div>
                <h1>${selectedTest.name}</h1>
                <p style="text-align:center; margin-bottom:30px;">Diagnostic Test Parameters Report</p>
                <table>
                    <thead><tr><th>SL No.</th><th>Part Of Test</th><th>Result</th><th>Unit</th><th>Reference Value</th><th>R. Value Of Hormone</th></tr></thead>
                    <tbody>
                        ${currentRows.map(row => `
                            <tr>
                                <td>${row.sl}</td>
                                <td>${row.partOfTest}</td>
                                <td>${row.result || '-'}</td>
                                <td>${row.unit || '-'}</td>
                                <td>${row.referenceValue || '-'}</td>
                                <td>${row.hormoneValue || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
    };

    const clearForm = () => {
        setSelectedRow(null);
        setForm({ sl: "", partOfTest: "", result: "", unit: "", referenceValue: "", hormoneValue: "" });
    };

    return (
        <>
            {/* ================= POPUP ================= */}
            {popup.show && (
                <div className="fixed inset-0 bg-black/70 flex items-start justify-center pt-20 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className={`p-8 text-center ${popup.type === "success" ? "bg-emerald-500 text-white" : ""}`}>
                            <h2 className="text-3xl font-bold mb-4">{popup.title}</h2>
                            <p className="text-xl mb-8">{popup.message}</p>

                            <div className="flex gap-4 justify-center">
                                {popup.type === "confirm" ? (
                                    <>
                                        <button onClick={closePopup} className="flex-1 py-4 rounded-2xl bg-gray-400 hover:cursor-pointer hover:bg-red-500 font-semibold text-lg">
                                            Cancel
                                        </button>
                                        <button onClick={executeConfirmedAction} className="flex-1 py-4 rounded-2xl bg-cyan-300 hover:cursor-pointer hover:bg-green-600 font-semibold text-lg">
                                            Yes, Confirm
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={closePopup} className="px-12 py-4 rounded-2xl bg-emerald-600 hover:cursor-pointer hover:bg-emerald-700 text-white font-semibold text-lg">
                                        OK
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= YOUR ORIGINAL UI (Unchanged) ================= */}
            <div className="h-[98vh] overflow-hidden bg-gradient-to-br from-slate-200 via-sky-100 to-cyan-200 p-2 md:p-4">
                <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-3">

                    {/* LEFT SIDE - Unchanged */}
                    <div className="bg-white rounded-2xl shadow-[0px_5px_20px_rgba(0,0,0,0.35)] border border-cyan-300 flex flex-col overflow-hidden">
                        <div className="p-3 border-b bg-cyan-50">
                            <input
                                type="text"
                                placeholder="Search Test..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-4 text-xl rounded-xl border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {filteredTests.length > 0 ? filteredTests.map((test) => (
                                <div
                                    key={test.id}
                                    onClick={() => { setSelectedTest(test); clearForm(); }}
                                    className={`p-4 text-2xl rounded-xl cursor-pointer transition-all duration-200 font-semibold border
                                    ${selectedTest?.id === test.id ? "bg-cyan-600 text-white shadow-lg border-cyan-700" : "hover:bg-slate-300 hover:text-white border-slate-200"}`}
                                >
                                    {test.name}
                                </div>
                            )) : (
                                <div className="text-center text-2xl font-semibold text-gray-700 mt-10">No Test Found</div>
                            )}
                        </div>

                        <div className="p-3 border-t bg-slate-100">
                            <button onClick={() => navigate(-1)} className="w-full bg-red-500 hover:cursor-pointer hover:bg-red-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">
                                Back
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Unchanged */}
                    <div className="bg-white rounded-2xl shadow-[0px_5px_20px_rgba(0,0,0,0.35)] border border-cyan-300 flex flex-col overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-700 via-sky-700 to-blue-700 text-white px-5 py-5 shadow">
                            <h2 className="text-3xl font-bold">
                                {selectedTest ? selectedTest.name : "Select Test From Left Side"}
                            </h2>
                        </div>

                        <div className="flex-1 overflow-auto bg-[#fffef5] relative">
                            <table className="w-full border-collapse text-xl">
                                <thead className="sticky top-0 z-30 bg-gradient-to-r from-cyan-800 to-blue-800 text-white">
                                    <tr>
                                        <th className="border p-4 w-[70px]">SL No.</th>
                                        <th className="border p-4 min-w-[250px]">Part Of Test</th>
                                        <th className="border p-4 min-w-[180px]">Result</th>
                                        <th className="border p-4 min-w-[140px]">Unit</th>
                                        <th className="border p-4 min-w-[250px]">Reference Value</th>
                                        <th className="border p-4 min-w-[260px]">R. Value Of Hormone</th>
                                    </tr>
                                </thead>

                                <thead className="sticky top-[60px] z-20 bg-cyan-50 border-b-2 border-cyan-300">
                                    <tr>
                                        <td className="border p-2"><input name="sl" value={form.sl} onChange={handleChange} placeholder="SL" className="w-full p-3 text-xl rounded border" /></td>
                                        <td className="border p-2"><input name="partOfTest" value={form.partOfTest} onChange={handleChange} placeholder="Part Of Test" className="w-full p-3 text-xl rounded border" /></td>
                                        <td className="border p-2"><input name="result" value={form.result} onChange={handleChange} placeholder="Result" className="w-full p-3 text-xl rounded border" /></td>
                                        <td className="border p-2"><input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" className="w-full p-3 text-xl rounded border" /></td>
                                        <td className="border p-2"><input name="referenceValue" value={form.referenceValue} onChange={handleChange} placeholder="Reference Value" className="w-full p-3 text-xl rounded border" /></td>
                                        <td className="border p-2"><input name="hormoneValue" value={form.hormoneValue} onChange={handleChange} placeholder="Hormone Value" className="w-full p-3 text-xl rounded border" /></td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentRows.length > 0 ? currentRows.map((row, index) => (
                                        <tr key={index} onClick={() => handleSelectRow(row, index)} className={`cursor-pointer transition-all ${selectedRow === index ? "bg-cyan-200" : "hover:bg-sky-50"}`}>
                                            <td className="border p-4 font-semibold">{row.sl}</td>
                                            <td className="border p-4 font-semibold">{row.partOfTest}</td>
                                            <td className="border p-4 font-semibold">{row.result}</td>
                                            <td className="border p-4 font-semibold">{row.unit}</td>
                                            <td className="border p-4 font-semibold">{row.referenceValue}</td>
                                            <td className="border p-4 font-semibold">{row.hormoneValue}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-20 text-2xl text-gray-400">No Parameter Added</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 p-4 bg-slate-100 border-t">
                            <button onClick={handleAdd} className="bg-emerald-600 hover:cursor-pointer hover:bg-emerald-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Add</button>
                            <button onClick={handleEdit} className="bg-yellow-500 hover:cursor-pointer hover:bg-yellow-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Edit</button>
                            <button onClick={handleSave} className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Save</button>
                            <button onClick={handlePrint} className="bg-indigo-500 hover:cursor-pointer hover:bg-indigo-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Preview / Print</button>
                            <button onClick={clearForm} className="bg-cyan-500 hover:cursor-pointer hover:bg-cyan-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Clear</button>
                            <button onClick={handleDelete} className="bg-red-500 hover:cursor-pointer hover:bg-red-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}