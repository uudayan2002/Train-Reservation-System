import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { MongoClient } from 'mongodb';

const QRCodeGenerator = ({ personId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Connect to MongoDB
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('myDatabase');
        const person = await db.collection('people').findOne({ _id: new MongoClient.ObjectID(personId) });
        client.close();

        // Generate QR code URL
        const qrCodeData = `https://example.com/person?id=${personId}`;
        QRCode.toDataURL(qrCodeData, (err, qrCodeUrl) => {
          if (err) {
            console.error(err);
            return;
          }
          setQrCodeUrl(qrCodeUrl);
        });
      } catch (err) {
        console.error(err);
      }
    };

    generateQRCode();
  }, [personId]);

  return (
    <div>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGenerator;