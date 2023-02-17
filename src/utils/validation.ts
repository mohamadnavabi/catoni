const validateMobile = (mobile: string) => {
  const mobileRegex = new RegExp(
    /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/g
  );
  return mobileRegex.test(mobile);
};

const validateEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  );
  return emailRegex.test(email);
};

export { validateMobile, validateEmail };
