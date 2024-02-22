import api from "../config/authApi.config";
export const adminUserListService = async (page,searchText) => {
	try {
		const response = await api.get(`/auth/admin/user-list?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
};

export const adminAnnouncementListService = async (page,searchText) => {
	try {
		const response = await api.get(`/auth/admin/announcment-list?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
};
export const adminContactUsListService = async (page,searchText) =>{
    try {
		const response = await api.get(`/auth/admin/contact-us-list?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
}

export const adminCategoriesListService = async (page,searchText) =>{
    try {
		const response = await api.get(`/auth/admin/categories?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
}

export const adminLocationsListService = async (page,searchText) =>{
    try {
		const response = await api.get(`/auth/admin/locations?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
}
export const adminSubLocationsListService = async (page,searchText) =>{
    try {
		const response = await api.get(`/auth/admin/sub-locations?page=${page}&s=${searchText}`);
		return response;
	} catch (error) {
		return error;
	}
}
export const updateUserWallet = async (user_id,amt) =>{
	try {
		const response = await api.get(`/auth/admin/update-user-wallet?user_id=${user_id}&amt=${amt}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const getAdminTransactions = async (user_id)=>{
	try {
		const response = await api.get(`/auth/admin/get-admin-transactions?user_id=${user_id}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const getUserTransactions = async (user_id)=>{
	try {
		const response = await api.get(`/auth/admin/get-user-transactions?user_id=${user_id}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const deleteUser = async (user_id)=>{
	try {
		const response = await api.get(`/auth/admin/delete-user?user_id=${user_id}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const changeStatus = async (user_id,isUserActive)=>{
	try {
		const response = await api.get(`/auth/admin/user-change-status?user_id=${user_id}&isUserActive=${isUserActive}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const deleteAnnouncement = async (id)=>{
	try {
		const response = await api.get(`/auth/admin/delete-announcement?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const announcementStatusChange = async (id,isUserActive)=>{
	try {
		const response = await api.get(`/auth/admin/announcement-change-status?id=${id}&isUserActive=${isUserActive}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const updateCategory = async (data)=>{
	try {
		const response = await api.post(`/auth/admin/update-category-details`,data);
		return response;
	} catch (error) {
		return error;
	}

}
export const getAnnouncementFullDetails = async (id)=>{
	try {
		const response = await api.get(`/auth/admin/get-announcement-full-details?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const getSiteSettings  =  async ()=>{
	try {
		const response = await api.get(`/auth/admin/get-settings`);
		return response;
	} catch (error) {
		return error;
	}
}
export const saveSiteSettings = async (data)=>{
	try {
		const response = await api.post(`/auth/admin/update-site-settings`,data);
		return response;
	} catch (error) {
		return error;
	}

}

export const deleteLocation = async (id)=>{
	try {
		const response = await api.get(`/auth/admin/delete-location?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}

}

export const deleteSubLocation = async(id)=>{
	try {
		const response = await api.get(`/auth/admin/delete-sub-location?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}

}
export const deleteContactUs = async(id)=>{
	try {
		const response = await api.get(`/auth/admin/delete-contact-us?id=${id}`);
		return response;
	} catch (error) {
		return error;
	}



}

export const updateLocation = async(data)=>{
	try {
		const response = await api.post(`/auth/admin/update-location`,data);
		return response;
	} catch (error) {
		return error;
	}
	
}

export const updateSubLocation = async(data)=>{
	try {
		const response = await api.post(`/auth/admin/update-sub-location`,data);
		return response;
	} catch (error) {
		return error;
	}

}
export const sendContactUsEmailProcess =  async(data)=>{
	try {
		const response = await api.post(`/auth/admin/send-contact-us-email`,data);
		return response;
	} catch (error) {
		return error;
	}

}