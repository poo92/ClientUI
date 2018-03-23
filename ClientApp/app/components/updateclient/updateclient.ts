import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Client } from '../helpers/client';
import { ClientHelper } from '../helpers/clienthelper';
import { DialogService } from 'aurelia-dialog';

//let httpClient = new HttpClient();
@inject(HttpClient, Router, ClientHelper, DialogService)
export class UpdateClient {
	public httpClient: HttpClient;
	public router: Router;
	public client: Client;
	public clientHelper: ClientHelper;
	public dialogService: DialogService;

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

	public showConfirmDelete: boolean = false;


	constructor(httpClient: HttpClient, router: Router, clientHelper: ClientHelper, dialogService: DialogService) {
		this.httpClient = httpClient;
		this.clientHelper = clientHelper;
		this.router = router;
		this.dialogService = dialogService;
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
				if (data.allowedScopes) {
					for (let scope of data.allowedScopes) {
						scope = scope.replace(/_/g, " "); // to replace all occurences		
						for (let ir of this.clientHelper.identityResources) {
							if (ir.name == scope) {
								this.selectedIdentityResources.push(scope);
							}
						}

						for (let ap of this.clientHelper.apiResources) {
							if (ap.name == scope) {
								this.selectedApiResources.push(scope);
							}
						}
					}
				}

				this.client = data;
			});
	}

	public update() {
		for (let resource of this.selectedIdentityResources) {
			this.allowedScopes.push(resource);
		}
		for (let resource of this.selectedApiResources) {
			this.allowedScopes.push(resource);
		}

		var client = { ClientId: this.client.clientId, ClientName: this.client.clientName, ClientSecret: this.client.clientSecret, GrantType: this.client.grantType, ClientProperty: this.client.clientProperty, AllowedScopes: this.allowedScopes, ClientUri: this.client.clientUri, RedirectUrl: this.client.redirectUrl, FrontChannelLogoutUrl: this.client.frontChannelLogoutUrl, PostLogoutUrl: this.client.postLogoutUrl };

		this.httpClient.fetch('api/client/updateclient',
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
					alert("Client Successfully Updated.");
					this.router.navigateToRoute('viewallclients')
				}
			});
	}

	public delete(clientId: string) {
		var retVal = confirm("Are you sure you need to delete this client ?");
		if (retVal == true) {
			var client = { ClientId: this.client.clientId};

			this.httpClient.fetch('api/client/deleteclient',
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
						alert("Client Successfully Deleted.");
						this.router.navigateToRoute('viewallclients')
					}					
				});
		}
	}
}
