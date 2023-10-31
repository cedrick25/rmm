<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
// rmm start

$route['cluster'] = "routes/cluster";
$route['cluster_create'] = "routes/cluster_create";
$route['cluster_update'] = "routes/cluster_update";
$route['cluster_devices'] = "routes/cluster_devices";
$route['cluster_device_details'] = "routes/cluster_device_details";
$route['cluster_device_update'] = "routes/cluster_device_update";
$route['cluster_move_device'] = "routes/cluster_move_device";

$route['apps_and_services'] = "routes/apps_and_services";
$route['prohibited_apps'] = "routes/prohibited_apps";
$route['prohibited_apps_create'] = "routes/prohibited_apps_create";

$route['app_monitoring'] = "routes/app_monitoring";
$route['app_monitoring_create'] = "routes/app_monitoring_create";
$route['app_monitoring_update'] = "routes/app_monitoring_update";

$route['notification'] = "routes/notification";
$route['dashboard'] = "routes/dashboard";
$route['chart'] = "routes/chart";
$route['licensing'] = "routes/licensing";

$route['user_account'] = "routes/user_account";
$route['user_account_create'] = "routes/user_account_create";
$route['user_account_update'] = "routes/user_account_update";

$route['department'] = "routes/department";
$route['department_create'] = "routes/department_create";
$route['department_update'] = "routes/department_update";

$route['location'] = "routes/location";
$route['location_create'] = "routes/location_create";
$route['location_update'] = "routes/location_update";

$route['permission'] = "routes/permission";
$route['permission_create'] = "routes/permission_create";
$route['permission_update'] = "routes/permission_update";

$route['user_role'] = "routes/user_role";
$route['user_role_create'] = "routes/user_role_create";
$route['user_role_update'] = "routes/user_role_update";
// rmm end
$route['default_controller'] = 'Routes';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
