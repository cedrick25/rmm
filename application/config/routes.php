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
// AMS start
$route['department'] = "routes/department";
$route['location'] = "routes/location";
$route['user_accounts'] = "routes/user_accounts";
$route['user_roles'] = "routes/user_roles";
$route['dashboard'] = "routes/dashboard";
$route['user_create'] = "routes/user_create";
$route['user_update'] = "routes/user_update";
$route['purchase_request'] = "routes/purchase_request";
$route['purchase_request_create'] = "routes/purchase_request_create";
$route['purchase_request_update'] = "routes/purchase_request_update";
$route['purchase_order'] = "routes/purchase_order";
$route['purchase_order_create'] = "routes/purchase_order_create";
$route['purchase_order_update'] = "routes/purchase_order_update";
$route['product_management'] = "routes/product_management";
$route['product_management_create'] = "routes/product_management_create";
$route['product_management_update'] = "routes/product_management_update";
$route['vendor'] = "routes/vendor";
$route['vendor_create'] = "routes/vendor_create";
$route['vendor_update'] = "routes/vendor_update";
$route['category_management'] = "routes/category_management";
$route['category_create'] = "routes/category_create";
$route['category_update'] = "routes/category_update";
$route['qr_generator'] = "routes/qr_generator";
$route['qr_print'] = "routes/qr_print";
$route['scan_link'] = "routes/scan_link";
$route['scan_link_update'] = "routes/scan_link_update";
$route['scan_link_new'] = "routes/scan_link_new";
$route['scan_tag'] = "routes/scan_tag";
$route['scan_tag_update'] = "routes/scan_tag_update";
$route['scan_tag_new'] = "routes/scan_tag_new";
$route['locations'] = "routes/locations";
$route['locations_update'] = "routes/locations_update";
$route['locations_create'] = "routes/locations_create";
$route['departments'] = "routes/departments";
$route['departments_update'] = "routes/departments_update";
$route['departments_create'] = "routes/departments_create";
$route['assets_dashboard'] = "routes/assets_dashboard";
$route['asset_batch'] = "routes/asset_batch";
$route['assets_details'] = "routes/assets_details";
$route['asset_create'] = "routes/asset_create";
$route['asset_batch_view_details'] = "routes/asset_batch_view_details";
$route['asset_view_details'] = "routes/asset_view_details";
$route['qrcode'] = "routes/qrcode";
$route['userAccess'] = "routes/userAccess";
$route['userAccessCreate'] = "routes/userAccessCreate";
$route['userAccessUpdate'] = "routes/userAccessUpdate";
$route['userGrant'] = "routes/userGrant";
$route['userGrantUpdate'] = "routes/userGrantUpdate";
$route['userLevels'] = "routes/userLevels";
$route['userLevelsCreate'] = "routes/userLevelsCreate";
$route['userLevelsUpdate'] = "routes/userLevelsUpdate";
$route['product_category'] = "routes/product_category";
$route['vendorPointofContact'] = "routes/vendorPointofContact";
$route['add_contact'] = "routes/add_contact";
$route['update_contact'] = "routes/update_contact";
$route['upload_salesInvoice'] = "routes/upload_salesInvoice";
$route['upload_deliveryReceipt'] = "routes/upload_deliveryReceipt";
$route['upload_collectionReceipt'] = "routes/upload_collectionReceipt";
$route['org_chart'] = "routes/org_chart";
$route['systemDashboard'] = "routes/systemDashboard";
$route['asset_request'] = "routes/asset_request";
$route['asset_request_create'] = "routes/asset_request_create";
$route['asset_request_update'] = "routes/asset_request_update";
$route['my_requests'] = "routes/my_requests";
$route['my_approval'] = "routes/my_approval";
// AMS end
$route['default_controller'] = 'Routes';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
