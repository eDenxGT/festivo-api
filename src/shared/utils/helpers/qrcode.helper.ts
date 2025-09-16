import QRCode from 'qrcode';

export async function generateQRCode(qrPayload: {
  registration_id: string;
  event_id: string;
  email: string;
  role: 'guest' | 'judge' | 'participant';
}) {
  const qrData = JSON.stringify({
    registration_id: qrPayload.registration_id,
    event_id: qrPayload.event_id,
    email: qrPayload.email,
    role: qrPayload.role
  });

  const qrCodeDataURL = await QRCode.toDataURL(qrData);

  const qrBase64 = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');

  return qrBase64;
}
