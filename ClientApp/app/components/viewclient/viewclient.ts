import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';


//let httpClient = new HttpClient();
@inject(HttpClient, Router)
export class ViewClient {
	public httpClient: HttpClient;
	public router: Router;
	public client: Client;
	public clientProperties: Array<string> = [];
	public grantTypes: Array<string> = [];

	public clientName: string = "";
	public clientId: string = "";
	public clientSecret: string = "";
	public grantType: string = "";
	public clientProperty: string = "";
	public clientUri: string = "";
	public redirectUrl: string = "";
	public frontChannelLogoutUrl: string = "";
	public postLogoutUrl: string = "";
	public clientScopes: Array<string> = [];



	constructor(httpClient: HttpClient, router: Router) {
		this.httpClient = httpClient;
		this.router = router;
		this.getClientProperties();
		this.getGrantTypes();
	}

	public getClientProperties() {
		this.httpClient.fetch('api/client/getclientproperties')
			.then(result => result.json())
			.then(data => {
				this.clientProperties = data;
			});
	}

	public getGrantTypes() {
		this.httpClient.fetch('api/client/getgranttypes')
			.then(result => result.json())
			.then(data => {
				this.grantTypes = data;
			});
	}

	activate(params: { clientId: string; }) {
		var client = { ClientId: params.clientId };
		this.httpClient.fetch('api/client/getclientbyclientid',
			{
				method: "POST",
				body: JSON.stringify(client),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(result => result.json())
			.then(data => {
				console.log(data);
				this.client = data;
			});
	}

}

class Client {
	public clientId: string = "";
	public clientName: string = "";
	public clientSecret: string = "";
	public grantType: string = "";
	public glientProperty: string = "";
	public clientUri: string = "";
	public redirectUrl: string = "";
	public frontChannelLogoutUrl: string = "";
	public postLogoutUrl: string = "";
	public identityResources: Array<string> = [];
	public apiResources: Array<string> = [];

}