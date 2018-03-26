﻿import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ClientHelper } from '../helpers/clienthelper';
import { Client } from '../helpers/client';
import { ValidationControllerFactory, ValidationRules, ValidationController, Validator, validateTrigger } from 'aurelia-validation';

@inject(HttpClient, ClientHelper, Router, ValidationControllerFactory, Validator)
export class AddClient {
	public httpClient: HttpClient;
	public clientHelper: ClientHelper;
	public router: Router;
	public controller: ValidationController;
	public rules: any;
	public canSave: boolean;
	public validator: Validator;
	public client: Client = new Client();

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

	constructor(httpClient: HttpClient, clientHelper: ClientHelper, router: Router, controllerFactory: ValidationControllerFactory, validator: Validator) {
		this.httpClient = httpClient;
		this.clientHelper = clientHelper;
		this.router = router;
		this.validator = validator;
		this.controller = controllerFactory.createForCurrentScope(validator);

		//this.controller = controllerFactory.createForCurrentScope();
		ValidationRules
			.ensure('clientId').required()
			.ensure('clientName').required()
			.ensure('clientSecret').required()
			.ensure('clientUri').required()
			.on(this.client);

		this.canSave = false;
		this.controller.validateTrigger = validateTrigger.changeOrBlur;
		this.controller.subscribe(event => this.validateWhole());
	}


	private validateWhole() {
		this.validator.validateObject(this.client)
			.then(results => this.canSave = results.every(result => result.valid));
		console.log(this.controller.errors);
	}

	public add() {		
			for (let resource of this.selectedIdentityResources) {
				this.allowedScopes.push(resource);
			}
			for (let resource of this.selectedApiResources) {
				this.allowedScopes.push(resource);
			}

		var client = { ClientId: this.client.clientId, ClientName: this.client.clientName, ClientSecret: this.client.clientSecret, GrantType: this.client.grantType, ClientProperty: this.client.clientProperty, AllowedScopes: this.allowedScopes, ClientUri: this.client.clientUri, RedirectUrl: this.client.redirectUrl, FrontChannelLogoutUrl: this.client.frontChannelLogoutUrl, PostLogoutUrl: this.client.postLogoutUrl };

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