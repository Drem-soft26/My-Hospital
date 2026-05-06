import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../../Clients/Client";

export default function MarketingInfo() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [id, setId] = useState(1);
    const [name, setName] = useState("");
    const [market, setMarket] = useState("");

    // Auto ID
    useEffect(() => {
        setId(data.length + 1);
    }, [data]);

    const isFormValid = name.trim() !== "" && market.trim() !== "";

    // Save
    const handleSave = () => {
        if (!isFormValid) return;

        const confirmSave = window.confirm("Do you want to save this?");
        if (!confirmSave) return;

        const newItem = { id, name, market };
        setData([...data, newItem]);
        clearForm();
    };

    // Select
    const handleSelect = (item) => {
        setSelectedId(item.id);
        setId(item.id);
        setName(item.name);
        setMarket(item.market);
    };

    // Clear
    const clearForm = () => {
        setSelectedId(null);
        setName("");
        setMarket("");
    };

    // Edit e 
    const handleEdit = () => {
        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const updated = data.map((item) =>
            item.id === selectedId
                ? { id, name, market }
                : item
        );

        setData(updated);
        clearForm();
    };
    // Detete function 

    const handleDelete = () => {
        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const confirmDelete = window.confirm("Are you sure to delete?");
        if (!confirmDelete) return;

        const updated = data.filter((item) => item.id !== selectedId);
        setData(updated);
        clearForm();
    };



    // ✅ PRINT (A4 সুন্দর layout)
    const handlePrint = () => {
        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const selectedData = data.find(d => d.id === selectedId);

        const printWindow = window.open("", "", "width=900,height=700");

        printWindow.document.write(`
    <html>
    <head>
      <title>Print</title>
      <style>
        @page {
          size: A4;
          margin-top: 2in;
          margin-left: 0.5in;
          margin-right: 0.5in;
          margin-bottom: 0.5in;
        }

        body {
          font-family: Arial;
          padding: 20px;
        }

        .header {
          position: fixed;
          top: -1.5in;
          width: 100%;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        table, th, td {
          border: 1px solid black;
        }

        th, td {
          padding: 8px;
        }
      </style>
    </head>

    <body>

      <div class="header">
        <h2>Comfort Hospital</h2>
        <p>Address: Your Hospital Address</p>
      </div>

      <h3 style="text-align:center;">Marketing Officer Info</h3>

      <table>
        <tr><th>ID</th><td>${selectedData.id}</td></tr>
        <tr><th>Name</th><td>${selectedData.name}</td></tr>
        <tr><th>Market</th><td>${selectedData.market}</td></tr>
      </table>

      <script>
        window.print();
      </script>

    </body>
    </html>
  `);

        printWindow.document.close();
    };

    return (
        <>
            <Client />

            {/* 🌿 Light Background */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-100 min-h-screen">

                {/* LEFT */}
                <div className="border rounded-xl shadow-md p-4 bg-white">

                    <h3 className="font-bold mb-2 text-lg text-gray-700">
                        Marketing Officer Name
                    </h3>

                    <div className="border rounded h-[400px] overflow-y-auto p-2">
                        {data.map((d, i) => (
                            <div
                                key={d.id}
                                onClick={() => handleSelect(d)}
                                className="cursor-pointer hover:bg-blue-100 p-1 rounded transition"
                            >
                                {i + 1}. {d.name}
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <button
                        onClick={handlePrint}
                        className="w-full mt-4 p-2 rounded-lg bg-purple-500 hover:bg-purple-600 cursor-pointer text-white transition"
                    >
                        Print
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full mt-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition"
                    >
                        Go Back
                    </button>

                </div>

                {/* RIGHT */}
                <div className="border rounded-xl shadow-md p-4 bg-white">

                    <div className="space-y-3">

                        <div>
                            <span className="text-sm font-medium">Marketing Officer Id :</span>
                            <input value={id} readOnly className="border w-full p-2 rounded mt-1" />
                        </div>

                        <div>
                            <span className="text-sm font-medium">Marketing Officer Name :</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border w-full p-2 rounded mt-1 focus:outline-blue-400"
                            />
                        </div>

                        <div>
                            <span className="text-sm font-medium">Market Name :</span>
                            <textarea
                                value={market}
                                onChange={(e) => setMarket(e.target.value)}
                                className="border w-full p-2 h-24 rounded mt-1 focus:outline-blue-400"
                            />
                        </div>

                    </div>

                    {/* Buttons */}


                    <div className="grid grid-cols-2 gap-3 mt-6">

                        <button
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className={`p-3 rounded-lg ${isFormValid
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Save
                        </button>

                        <button
                            onClick={handleEdit}
                            className="p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </button>

                        <button
                            onClick={clearForm}
                            className="p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            New
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}