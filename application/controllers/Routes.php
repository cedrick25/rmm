<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class routes extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{
		$this->load->view('login');
	}
	public function dashboard()
	{
		$this->load->view('dashboard');
	}
	public function user_accounts()
	{
		$this->load->view('user_accounts');
	}
	public function user_roles()
	{
		$this->load->view('user_roles');
	}
	public function department()
	{
		$this->load->view('department');
	}
	public function location()
	{
		$this->load->view('location');
	}
	public function user_create()
	{
		$this->load->view('user_create');
	}
	public function user_update()
	{
		$this->load->view('user_update');
	}
	public function purchase_request()
	{
		$this->load->view('purchase_request');
	}
	public function purchase_request_create()
	{
		$this->load->view('purchase_request_create');
	}
	public function purchase_request_update()
	{
		$this->load->view('purchase_request_update');
	}
	public function purchase_order()
	{
		$this->load->view('purchase_order');
	}
	public function purchase_order_create()
	{
		$this->load->view('purchase_order_create');
	}
	public function purchase_order_update()
	{
		$this->load->view('purchase_order_update');
	}
	public function product_management()
	{
		$this->load->view('product_management');
	}
	public function product_management_create()
	{
		$this->load->view('product_management_create');
	}
	public function product_management_update()
	{
		$this->load->view('product_management_update');
	}
	public function vendor_create()
	{
		$this->load->view('vendor_create');
	}
	public function vendor()
	{
		$this->load->view('vendor');
	}
	public function vendor_update()
	{
		$this->load->view('vendor_update');
	}
	public function category_management()
	{
		$this->load->view('category_management');
	}
	public function category_create()
	{
		$this->load->view('category_create');
	}
	public function category_update()
	{
		$this->load->view('category_update');
	}
	public function qr_generator()
	{
		$this->load->view('qr_generator');
	}
	public function qr_print()
	{
		$this->load->view('qr_print');
	}
	public function scan_link()
	{
		$this->load->view('scan_link');
	}
	public function scan_link_new()
	{
		$this->load->view('scan_link_new');
	}
	public function scan_link_update()
	{
		$this->load->view('scan_link_update');
	}
	public function scan_tag()
	{
		$this->load->view('scan_tag');
	}
	public function scan_tag_new()
	{
		$this->load->view('scan_tag_new');
	}
	public function scan_tag_update()
	{
		$this->load->view('scan_tag_update');
	}
	public function locations()
	{
		$this->load->view('locations');
	}
	public function locations_create()
	{
		$this->load->view('locations_create');
	}
	public function locations_update()
	{
		$this->load->view('locations_update');
	}
	public function departments()
	{
		$this->load->view('departments');
	}
	public function departments_create()
	{
		$this->load->view('departments_create');
	}
	public function departments_update()
	{
		$this->load->view('departments_update');
	}
	public function asset_create()
	{
		$this->load->view('asset_create');
	}
	public function asset_batch()
	{
		$this->load->view('asset_batch');
	}
	public function asset_batch_view_details()
	{
		$this->load->view('asset_batch_view_details');
	}
	public function asset_view_details()
	{
		$this->load->view('asset_view_details');
	}
	public function assets_dashboard()
	{
		$this->load->view('assets_dashboard');
	}
	public function assets_details()
	{
		$this->load->view('assets_details');
	}
	public function qrcode()
	{
		$this->load->view('qrcode');
	}
	public function userAccess()
	{
		$this->load->view('userAccess');
	}
	public function userAccessCreate()
	{
		$this->load->view('userAccessCreate');
	}
	public function userAccessUpdate()
	{
		$this->load->view('userAccessUpdate');
	}
	public function userGrant()
	{
		$this->load->view('userGrant');
	}
	public function userGrantUpdate()
	{
		$this->load->view('userGrantUpdate');
	}
	public function userLevels()
	{
		$this->load->view('userLevels');
	}
	public function userLevelsCreate()
	{
		$this->load->view('userLevelsCreate');
	}
	public function userLevelsUpdate()
	{
		$this->load->view('userLevelsUpdate');
	}
	public function product_category()
	{
		$this->load->view('product_category');
	}
	public function vendorPointofContact()
	{
		$this->load->view('vendorPointofContact');
	}
	public function add_contact()
	{
		$this->load->view('add_contact');
	}
	public function update_contact()
	{
		$this->load->view('update_contact');
	}
	public function upload_salesInvoice()
	{
		$this->load->view('upload_salesInvoice');
	}
	public function upload_deliveryReceipt()
	{
		$this->load->view('upload_deliveryReceipt');
	}
	public function upload_collectionReceipt()
	{
		$this->load->view('upload_collectionReceipt');
	}
	public function org_chart()
	{
		$this->load->view('org_chart');
	}
	public function asset_request()
	{
		$this->load->view('asset_request');
	}
	public function asset_request_create()
	{
		$this->load->view('asset_request_create');
	}
	public function asset_request_update()
	{
		$this->load->view('asset_request_update');
	}
	public function my_requests()
	{
		$this->load->view('my_requests');
	}
	public function my_approval()
	{
		$this->load->view('my_approval');
	}
	// ams end
	public function systemDashboard()
	{
		$this->load->view('systemDashboard');
	}
}