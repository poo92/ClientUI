import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

//let httpClient = new HttpClient();
@inject(HttpClient, Router)
export class AddClient {
	public httpClient: HttpClient;
	public router: Router;
	public clients: Array<Client> = [];

	


	constructor(httpClient: HttpClient, router: Router) {
		this.httpClient = httpClient;
		this.router = router;
		this.getClients();
		
	}

	public getClients() {
		this.httpClient.fetch('api/client/getClients')
			.then(result => result.json())
			.then(data => {
				console.log(data);
				this.clients = data;
				
			});
	}

	public onSelectContact(event: UIEvent, client: Client) {
		this.router.navigateToRoute('viewclient', { clientId: client.clientId })
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