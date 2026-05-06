import React, { useState } from "react";
import Client from "../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function ReferrerInfo() {

  const navigate = useNavigate();

  const [referrers, setReferrers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  // Basic Info
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [status, setStatus] = useState("Active");

  // Percent Fields
  const [blood, setBlood] = useState("");
  const [urine, setUrine] = useState("");
  const [stool, setStool] = useState("");
  const [ultra, setUltra] = useState("");
  const [echo, setEcho] = useState("");
  const [ecg, setEcg] = useState("");
  const [xray, setXray] = useState("");
  const [hormon, setHormon] = useState("");
  const [histopa, setHistopa] = useState("");
  const [others, setOthers] = useState("");

  const filtered = referrers.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // Select
  const handleSelect = (r) => {
    setSelectedId(r.id);
    setId(r.id);
    setName(r.name);
    setDesignation(r.designation);
    setMobile(r.mobile);
    setEmail(r.email);
    setAddress(r.address);
    setFatherName(r.fatherName);
    setMotherName(r.motherName);
    setStatus(r.status);

    setBlood(r.blood);
    setUrine(r.urine);
    setStool(r.stool);
    setUltra(r.ultra);
    setEcho(r.echo);
    setEcg(r.ecg);
    setXray(r.xray);
    setHormon(r.hormon);
    setHistopa(r.histopa);
    setOthers(r.others);
  };

  // Clear
  const clearForm = () => {
    setSelectedId(null);
    setName("");
    setDesignation("");
    setMobile("");
    setEmail("");
    setAddress("");
    setFatherName("");
    setMotherName("");
    setStatus("Active");

    setBlood("");
    setUrine("");
    setStool("");
    setUltra("");
    setEcho("");
    setEcg("");
    setXray("");
    setHormon("");
    setHistopa("");
    setOthers("");
  };

  // Save
  const handleSave = () => {
    const newData = {
      id,
      name,
      designation,
      mobile,
      email,
      address,
      fatherName,
      motherName,
      status,
      blood,
      urine,
      stool,
      ultra,
      echo,
      ecg,
      xray,
      hormon,
      histopa,
      others
    };

    setReferrers([...referrers, newData]);
    setId(referrers.length + 2);
    clearForm();
  };

  // EDIT FIXED
  const handleEdit = () => {
    if (!selectedId) return;

    const updated = referrers.map(r =>
      r.id === selectedId
        ? {
          id: selectedId,
          name,
          designation,
          mobile,
          email,
          address,
          fatherName,
          motherName,
          status,
          blood,
          urine,
          stool,
          ultra,
          echo,
          ecg,
          xray,
          hormon,
          histopa,
          others
        }
        : r
    );

    setReferrers(updated);
    clearForm();
  };

  // DELETE FIXED
  const handleDelete = () => {
    if (!selectedId) return;

    const updated = referrers.filter(r => r.id !== selectedId);
    setReferrers(updated);
    clearForm();
  };

  return (
    <>
      <Client />

      <div className="grid grid-cols-3 gap-4 p-4 ">

        {/* LEFT (UNCHANGED) */}
        <div className="col-span-1 border p-4 max-h-[90vh] overflow-y-auto shadow-[5px_5px_3px_rgba(0,2,0,0.3)]">
          <input
            className="w-full p-2 border mb-3"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <h3 className="text-center p-3 font-bold text-2xl mb-2">Referrer List</h3>

          {filtered.map((r, i) => (
            <div
              key={r.id}
              onClick={() => handleSelect(r)}
              className="p-2 cursor-pointer text-xl hover:bg-red-200 rounded-md hover:font-bold flex gap-2"
            >
              <span>{i + 1}.</span>
              <span>{r.name}</span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-2 border p-6">

          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <span>ID :</span>
              <input value={id} readOnly className="border p-2 w-full" />
            </div>

            <div>
              <span>Name :</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
            </div>

            <div>
              <span>Designation :</span>
              <input value={designation} onChange={(e) => setDesignation(e.target.value)} className="border p-2 w-full" />
            </div>

            <div>
              <span>Mobile :</span>
              <input
                value={mobile}
                maxLength={11}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Email :</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
            </div>

            <div>
              <span>Address :</span>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 w-full" />
            </div>

            <div>
              <span>Father Name :</span>
              <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="border p-2 w-full" />
            </div>

            <div>
              <span>Mother Name :</span>
              <input value={motherName} onChange={(e) => setMotherName(e.target.value)} className="border p-2 w-full" />
            </div>

            <div className="col-span-2">
              <span>Status :</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 w-full" >
                <option>Active</option>
                <option>Deactive</option>
              </select>
            </div>

          </div>

          {/* TEST SECTION */}
          <div className="mt-5 border p-4">
            <h4 className="font-bold mb-2">Test Commission (%)</h4>

            <div className="grid grid-cols-4 gap-2">

              {/* Blood */}
              <div>
                <span>Blood :</span>
                <input
                  value={blood}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setBlood(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* Urine */}
              <div>
                <span>Urine :</span>
                <input
                  value={urine}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setUrine(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* Stool */}
              <div>
                <span>Stool :</span>
                <input
                  value={stool}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setStool(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* Ultra */}
              <div>
                <span>Ultra :</span>
                <input
                  value={ultra}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setUltra(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00"  />
              </div>

              {/* Echo */}
              <div>
                <span>Echo :</span>
                <input
                  value={echo}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setEcho(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* ECG */}
              <div>
                <span>ECG :</span>
                <input
                  value={ecg}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setEcg(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00"  />
              </div>

              {/* X-ray */}
              <div>
                <span>X-ray :</span>
                <input
                  value={xray}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setXray(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* Hormon */}
              <div>
                <span>Hormon :</span>
                <input
                  value={hormon}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setHormon(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00"
                />
              </div>

              {/* Histopa */}
              <div>
                <span>Histopa :</span>
                <input
                  value={histopa}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setHistopa(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

              {/* Others */}
              <div>
                <span>Others :</span>
                <input
                  value={others}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val)) setOthers(val);
                  }}
                  className="border p-2 w-full"
                  placeholder="0.00" />
              </div>

            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-4 gap-3 mt-6">

            <button onClick={handleSave} className="bg-green-500 text-white p-2 cursor-pointer">
              Save
            </button>

            <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 cursor-pointer">
              Edit
            </button>

            <button onClick={handleDelete} className="bg-red-500 text-white p-2 cursor-pointer">
              Delete
            </button>

            <button
              className="bg-gray-500 text-white p-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

          </div>

        </div>
      </div>
    </>
  );
}