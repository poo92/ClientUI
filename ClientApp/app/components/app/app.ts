import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
	router: Router;

	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'ClientApp';
		config.map([
			{
				route: ['', 'home'],
				name: 'home',
				settings: { icon: 'home' },
				moduleId: PLATFORM.moduleName('../home/home'),
				nav: true,
				title: 'Home'
			}, {
				route: 'counter',
				name: 'counter',
				settings: { icon: 'education' },
				moduleId: PLATFORM.moduleName('../counter/counter'),
				nav: true,
				title: 'Counter'
			}, {
				route: 'addclient',
				name: 'addclient',
				settings: { icon: 'education' },
				moduleId: PLATFORM.moduleName('../addclient/addclient'),
				nav: true,
				title: 'Add Client'
			}, {
				route: 'viewallclients',
				name: 'viewallclients',
				settings: { icon: 'th-list' },
				moduleId: PLATFORM.moduleName('../viewallclients/viewallclients'),
				nav: true,
				title: 'View Clients'
			}, {
				route: 'updateclient/:clientId',
				name: 'updateclient',
				href: "updateclient",
				settings: { icon: 'th-list' },
				moduleId: PLATFORM.moduleName('../updateclient/updateclient'),
				nav: false,
				title: 'View Client'
			},
			{
				route: 'fetch-data',
				name: 'fetchdata',
				settings: { icon: 'th-list' },
				moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
				nav: true,
				title: 'Fetch data'
			}]);

		this.router = router;
	}
}

//,
//children: [{
//	route: 'viewallclients/viewclient/:clientId',
//	name: 'viewallclients/viewclient',
//	settings: { icon: 'th-list' },
//	moduleId: PLATFORM.moduleName('../viewclient/viewclient'),
//	nav: true,
//	title: 'View Client'
//}]