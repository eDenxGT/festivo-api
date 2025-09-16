export function generateEventInvitationTemplate(
  organizerName: string,
  participantRole: 'guest' | 'judge',
  event: {
    title: string;
    description: string;
    location: string;
    floor_details?: string;
    date: Date;
    food_available: boolean;
    food_options?: { morning?: boolean; noon?: boolean; evening?: boolean };
  }
): string {
  const foodDetails =
    event.food_available && event.food_options
      ? `
        <h3 style="margin:16px 0 8px">🍽 Food Options</h3>
        <ul style="padding-left:20px">
          ${event.food_options.morning ? '<li>Morning</li>' : ''}
          ${event.food_options.noon ? '<li>Noon</li>' : ''}
          ${event.food_options.evening ? '<li>Evening</li>' : ''}
        </ul>
      `
      : '';

  return `
    <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:auto; border:1px solid #eaeaea; border-radius:12px; overflow:hidden">
      <div style="background:#4f46e5; color:white; padding:20px; text-align:center">
        <h1 style="margin:0; font-size:24px;">${event.title}</h1>
        <p style="margin:5px 0 0">Organized by ${organizerName}</p>
      </div>
      <div style="padding:20px">
        <h2 style="margin-top:0; font-size:18px;">📌 Event Invitation</h2>
        <p style="font-size:16px; font-weight:bold; margin-bottom:16px">
          You are invited as a <span style="color:#4f46e5; text-transform:capitalize">${participantRole}</span>.
        </p>

        <h3>📍 Event Details</h3>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Location:</strong> ${event.location}${
          event.floor_details ? `, ${event.floor_details}` : ''
        }</p>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
        ${foodDetails}

        <div style="margin:20px 0; text-align:center">
          <p style="font-size:16px; font-weight:bold; margin-bottom:8px"> 🎟 Your Ticket QR Code </p>
          <img src="cid:qrcode" alt="QR Code" style="max-width:200px; border:8px solid #f4f4f4; border-radius:12px"/>
          <p style="margin-top:12px; font-size:14px; color:#666">
            Please present this QR code at any entry gate or food counter scanner during the event.
          </p>
        </div>
      </div>
      <div style="background:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#777">
        <p style="margin:0">Thank you for registering. We look forward to seeing you at <strong>${event.title}</strong>!</p>
      </div>
    </div>
  `;
}

export function generateFullTicketTemplate(
  participantName: string,
  event: {
    title: string;
    description: string;
    location: string;
    floor_details?: string;
    date: Date;
    is_paid: boolean;
    price?: number;
    food_available?: boolean;
    food_options?: {
      morning?: boolean;
      noon?: boolean;
      evening?: boolean;
    };
    max_tickets: number;
  }
): string {
  return `
    <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:auto; border:1px solid #eaeaea; border-radius:12px; overflow:hidden">
      
      <!-- Header -->
      <div style="background:#2563eb; color:white; padding:20px; text-align:center">
        <h1 style="margin:0; font-size:22px;">🎟️ Your Event Ticket</h1>
      </div>

      <!-- Body -->
      <div style="padding:20px;">
        <p style="font-size:16px; margin:0 0 12px">Hello <strong>${participantName}</strong>,</p>
        <p style="font-size:14px; margin:0 0 16px">
          Here are your ticket details for <strong>${event.title}</strong>.  
          Please present the QR code at the entry and food counter.
        </p>

        <!-- Event Details -->
        <div style="margin:20px 0; padding:15px; background:#f9fafb; border-radius:8px">
          <p><strong>📌 Event:</strong> ${event.title}</p>
          <p><strong>📝 Description:</strong> ${event.description}</p>
          <p><strong>📍 Location:</strong> ${event.location}${
            event.floor_details ? `, ${event.floor_details}` : ''
          }</p>
          <p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()} at ${new Date(
            event.date
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          ${
            event.food_available
              ? `<p><strong>🍴 Food Options:</strong> ${
                  [
                    event.food_options?.morning ? 'Morning' : '',
                    event.food_options?.noon ? 'Noon' : '',
                    event.food_options?.evening ? 'Evening' : ''
                  ]
                    .filter(Boolean)
                    .join(', ') || 'Available'
                }</p>`
              : '<p><strong>🍴 Food:</strong> Not available</p>'
          }
        </div>

        <!-- QR Code -->
        <div style="text-align:center; margin:20px 0">
          <img src="cid:qrcode" alt="QR Code" style="max-width:220px; border:8px solid #f4f4f4; border-radius:12px"/>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f9f9f9; padding:12px; text-align:center; font-size:12px; color:#777">
        <p style="margin:0">✅ Keep this ticket safe and carry it to the event. Entry allowed only with a valid ticket.</p>
      </div>
    </div>
  `;
}
