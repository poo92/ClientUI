import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class AddClient {
	public grantTypes: Array<string> = ["password", "hybrid", "client credentials"];
	//public identityResources: Array<string> = ["openID", "profile", "email", "offline access", "adra claims"];
	//public apiResources: Array<string> = ["notification API", "Integration hub", "balancer", "notification hub"];
	//public clientProperties: Array<string> = ["Balancer", "Task Manager", "Integration Hub", "Setup", "Support", "Screen Steps"];
	public clientProperties: Array<string> = [];
	public apiResources: Array<string> = [];
	public identityResources: Array<string> = [];

	constructor(http: HttpClient) {
		this.getClientProperties(http);
		this.getApiResource(http);
		this.getIdentityResource(http);
	}

	public getClientProperties(http: HttpClient) {
		http.fetch('api/client/getclientproperties')
			.then(result => result.json())
			.then(data => {
				this.clientProperties = data;
			});
	}

	public getApiResource(http: HttpClient) {
		http.fetch('api/client/getapiresources')
			.then(result => result.json())
			.then(data => {				
				for (let apiResource of data) {
					apiResource.name = apiResource.name.replace(/_/g, " "); // to replace all occurences
				}
				this.apiResources = data;
			});
	}

	public getIdentityResource(http: HttpClient) {
		http.fetch('api/client/getidentityresources')
			.then(result => result.json())
			.then(data => {
				for (let identityResource of data) {
					identityResource.name = identityResource.name.replace(/_/g, " "); // to replace all occurences
				}
				this.identityResources = data;
			});
	}
	//constructor(http: HttpClient) {
	//	http.fetch('api/SampleData/WeatherForecasts')
	//		.then(result => result.json() as Promise<WeatherForecast[]>)
	//		.then(data => {
	//			this.forecasts = data;
	//		});
	//}
}