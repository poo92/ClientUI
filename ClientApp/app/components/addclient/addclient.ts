import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { ClientHelper } from '../helpers/clienthelper';


@inject(HttpClient, ClientHelper)
export class AddClient {
	public httpClient: HttpClient;
	public clientHelper: ClientHelper;
	

	public clientName: string = "poornima";
	public clientId: string = "Poornima";
	public clientSecret: string = "12345";
	public grantType: string = "password";
	public clientProperty: string = "Balancer";
	public clientUri: string = "any";
	public redirectUrl: string = "any";
	public frontChannelLogoutUrl: string = "any";
	public postLogoutUrl: string = "any";
	public selectedIdentityResources: Array<number> = [];
	public selectedApiResources: Array<number> = [];
	public allowedScopes: Array<number> = [];

	constructor(httpClient: HttpClient, clientHelper: ClientHelper) {
		this.httpClient = httpClient;
		this.clientHelper = clientHelper;	
	}	

	public add() {
		for (let resource of this.selectedIdentityResources) {
			this.allowedScopes.push(resource);
		}
		for (let resource of this.selectedApiResources) {
			this.allowedScopes.push(resource);
		}

		var client = { ClientId: this.clientId, ClientName: this.clientName, ClientSecret: this.clientSecret, GrantType: this.grantType, ClientProperty: this.clientProperty, AllowedScopes: this.allowedScopes, ClientUri: this.clientUri, RedirectUrl: this.redirectUrl, FrontChannelLogoutUrl: this.frontChannelLogoutUrl, PostLogoutUrl: this.postLogoutUrl };
				
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