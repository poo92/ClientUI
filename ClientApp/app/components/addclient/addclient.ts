import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ClientHelper } from '../helpers/clienthelper';
import { ValidationControllerFactory, ValidationRules, ValidationController } from 'aurelia-validation';

@inject(HttpClient, ClientHelper, Router, ValidationControllerFactory)
export class AddClient {
	public httpClient: HttpClient;
	public clientHelper: ClientHelper;
	public router: Router;
	public controller: ValidationController;

	public clientName: string = "";
	public clientId: string = "";
	public clientSecret: string = "";
	public grantType: string = "";
	public clientProperty: string = "";
	public clientUri: string = "";
	public redirectUrl: string = "";
	public frontChannelLogoutUrl: string = "";
	public postLogoutUrl: string = "";
	public selectedIdentityResources: Array<number> = [];
	public selectedApiResources: Array<number> = [];
	public allowedScopes: Array<number> = [];

	constructor(httpClient: HttpClient, clientHelper: ClientHelper, router: Router, controllerFactory: ValidationControllerFactory) {
		this.httpClient = httpClient;
		this.clientHelper = clientHelper;	
		this.router = router;
		this.controller = controllerFactory.createForCurrentScope();

		ValidationRules
			.ensure('clientId').required()
			.ensure('clientName').required()
			.on(this);
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
				if (data == "ok") {
					alert("Client Successfully Added.");
					this.router.navigateToRoute('viewallclients')
				}
			});

	}
	
}