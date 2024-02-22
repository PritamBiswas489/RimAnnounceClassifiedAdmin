import axios from 'axios';
import { getAuthTokens, setAuthTokens } from './auth';
 
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../store/redux/user-account-data.redux';
import { getAppUrl } from './utility';

const app_url =  getAppUrl();
console.log(app_url);
const frontApi = axios.create({
	baseURL: app_url + '/api',
	timeout: 15000,
});
const resetStateData = ()=>{
	const dispatch = useDispatch();
	dispatch(userAccountDataActions.resetState());
}

frontApi.interceptors.request.use(async (config) => {
	const {accessToken, refreshToken} = await getAuthTokens();
	config.headers = {
		Authorization: 'Bearer ' + accessToken,
		refreshtoken: refreshToken,
		'Content-Type': 'multipart/form-data',
	};

	return config;
});

frontApi.interceptors.response.use(async (res) => {
	const accesstoken = res?.data?.meta?.accesstoken || '';
	const refreshtoken = res?.data?.meta?.refreshtoken || '';

	 
	if (accesstoken && refreshtoken) {
		await setAuthTokens(accesstoken, refreshtoken);
	}
	if (res?.data?.status === 401) {
		resetStateData();
		window.location.href = '/';
	}
	return res;
});
export default frontApi;
