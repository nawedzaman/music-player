
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
let requestId
const sendOTP = async (phoneNumber) => {
  const url = `${BASE_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
    }),
  });

  const data = await response.json();

  
   requestId = data.requestId;

  return requestId;
};

const verifyOTP = async ( otp) => {
  const url = `${BASE_URL}/auth/verify_otp`;
    const phoneNumber="+918472855507";
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
      requestId,
      otp,
    }),
  });

  const data = await response.json();

 
  const token = data.token;


  return token;
};

export { sendOTP, verifyOTP };
