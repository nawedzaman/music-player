
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
  let requestId
  let phoneNumber
  const sendOTP = async (phone) => {
    phoneNumber=phone
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
    console.log(phoneNumber);
    const url = `${BASE_URL}/auth/verify_otp`;
    try{
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
    }
    catch(error){
      console.log(error);
      return error
    }

  };

  export { sendOTP, verifyOTP };
