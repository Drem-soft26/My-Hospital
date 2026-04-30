import React, { useRef } from "react";
import Barcode from "react-barcode";

export default function PopupModal({ open, onClose, data }) {
  const printRef = useRef();

  if (!open) return null;

  const barcodeValue = JSON.stringify({
    name: data.name,
    phone: data.phone,
    age: data.age,
    gender: data.gender,
  });

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=800");

    newWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @page {
              size: A5;
              margin: 5mm;
            }

            body {
              font-family: Arial;
              padding: 10px;
            }

            h2 {
              text-align: center;
              margin-bottom: 5px;
              font-size: 20px;
            }

            .header-flex {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 5px;
            }

            .info-text {
              font-size: 14px;
            }

            .barcode-box {
              width: 200px;
      
            }

            .barcode-box svg {
              width: 100% !important;
 
            }

            p {
              margin: 2px 0;
              font-size: 14px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 14px;
            }

            th, td {
              border-bottom: 1px solid #ddd;
              padding: 4px;
              text-align: left;
            }

            .summary {
              text-align: right;
              margin-top: 10px;
            }

            hr {
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    newWindow.document.close();

    setTimeout(() => {
      newWindow.print();
      newWindow.close();
    }, 500);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>

        {/* PRINT AREA */}
        <div ref={printRef}>

          <h2>Money Receipt <br /> Dream Hospital, Tangail</h2>

          {/* 🔥 FLEX HEADER */}
          <div className="header-flex">

            <div className="info-text">
              <p>Address: Sabaliya, Tangail</p>
              <p>Mobile: 01896036830</p>
            </div>

            <div className="barcode-box">
              <Barcode
                value={barcodeValue}
                height={25}
                width={0.3}
      
                displayValue={false}
              />
            </div>

          </div>

          <hr />

          {/* Patient Info */}
          <div style={styles.info}>
            <p><b>Name:</b> {data.title} {data.name}</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Address:</b> {data.address}</p>
            <p><b>Gender:</b> {data.gender}</p>
            <p><b>Age:</b> {data.age}</p>
            <p><b>Referer:</b> {data.referer}</p>
            <p><b>Doctor:</b> {data.doctor}</p>
          </div>

          <hr />

          <h3>Tests</h3>

          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Cost</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {data.tests.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>৳ {t.cost}</td>
                  <td>{t.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div className="summary">
            <p>Total:<b> {data.total} </b>৳</p>
            <p>Discount: <b>{data.discount}</b> ৳</p>
            <p>Payable: <b>{data.payable} </b>৳ </p>
            <p>Paid: <b> {data.paid}</b> ৳</p>
            <p>Due: <b> {data.due}</b> ৳</p>
            <p>Return: <b> {data.returnMoney}</b> ৳</p>
          </div>

        </div>

        {/* BUTTON */}
        <button onClick={handlePrint} style={styles.printBtn}>
          🖨️ Print
        </button>

        <button onClick={onClose} style={styles.btn}>
          Close
        </button>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "480px",
    maxHeight: "85vh",
    overflowY: "auto",
  },

  info: {
    lineHeight: "1.7",
  },

  printBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  btn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    background: "green",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
