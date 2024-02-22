export const setAuthTokens =  (accessToken = null, refreshToken = null) => {
	
	try {
	   localStorage.setItem('tourbus_access_token', accessToken || '');
	   localStorage.setItem('tourbus_refresh_token', refreshToken || '');
	  return true;
	} catch (error) {
	  console.error('Error setting authentication tokens:', error);
	  return false;
	}
  };

export const getAuthTokens =  () => {
	try {
	  const accessToken =  localStorage.getItem('tourbus_access_token') || null;
	  const refreshToken =  localStorage.getItem('tourbus_refresh_token') || null;

	  console.log({accessToken,refreshToken })
  
	  return { accessToken, refreshToken };
	} catch (error) {
	  console.error('Error retrieving authentication tokens:', error);
	  return { accessToken: null, refreshToken: null };
	}
  };

  export const deleteAuthTokens =  () => {
	try {
	   localStorage.removeItem('tourbus_access_token');
	   localStorage.removeItem('tourbus_refresh_token');
	  return true; // Indicate successful deletion
	} catch (error) {
	  console.error('Error deleting authentication tokens:', error);
	  return false; // Indicate failure
	}
  };