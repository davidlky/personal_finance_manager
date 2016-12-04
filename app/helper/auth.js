import URL from './url';

export default function(callback){
	$.ajax({
		url: URL("/auth/check"),
		method: "GET",
		success: callback
	})
}