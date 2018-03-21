import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

//let httpClient = new HttpClient();
@inject(HttpClient)
export class AddClient {
	public httpClient: HttpClient;
	public clientProperties: Array<string> = [];
	public apiResources: Array<string> = [];
	public identityResources: Array<string> = [];
	public grantTypes: Array<string> = [];

	public clientName: string = "poornima";
	public clientId: string = "Poornima";
	public clientSecret: string = "12345";
	public grantType: string = "Password";
	public clientProperty: string = "Balancer";
	public clientUri: string = "any";
	public redirectUrl: string = "any";
	public frontChannelLogoutUrl: string = "any";
	public postLogoutUrl: string = "any";
	public selectedIdentityResources: Array<number> = [];
	public selectedApiResources: Array<number> = [];


	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
		this.getClientProperties();
		this.getApiResource();
		this.getIdentityResource();
		this.getGrantTypes();
	}

	public getClientProperties() {
		this.httpClient.fetch('api/client/getclientproperties')
			.then(result => result.json())
			.then(data => {
				this.clientProperties = data;
			});
	}

	public getApiResource() {
		this.httpClient.fetch('api/client/getapiresources')
			.then(result => result.json())
			.then(data => {				
				for (let apiResource of data) {
					apiResource.name = apiResource.name.replace(/_/g, " "); // to replace all occurences
				}
				this.apiResources = data;
			});
	}

	public getIdentityResource() {
		this.httpClient.fetch('api/client/getidentityresources')
			.then(result => result.json())
			.then(data => {
				for (let identityResource of data) {
					identityResource.name = identityResource.name.replace(/_/g, " "); // to replace all occurences
				}
				this.identityResources = data;
			});
	}

	public getGrantTypes() {
		this.httpClient.fetch('api/client/getgranttypes')
			.then(result => result.json())
			.then(data => {				
				this.grantTypes = data;
			});
	}

	public add() {
		var client = { ClientId: this.clientId, ClientName: this.clientName, ClientSecret: this.clientSecret, GrantType: this.grantType, ClientProperty: this.clientProperty, IdentityResources: this.selectedIdentityResources, ApiResources: this.selectedApiResources, ClientUri: this.clientUri, RedirectUrl: this.redirectUrl, FrontChannelLogoutUrl: this.frontChannelLogoutUrl, PostLogoutUrl: this.postLogoutUrl };
				
		this.httpClient.fetch('api/client/addclient',
			{
				method: "POST",
				body: JSON.stringify(client),
				headers: {					
					'Content-Type': 'application/json'
				}
			})
			.then(result => result.json())
			.then(data => {
				alert(data);
			});

	}
	
}