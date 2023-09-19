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
	public function chart()
	{
		$this->load->view('chart');
	}

	// rmm start
	// cluster start
	public function cluster()
	{
		$this->load->view('cluster');
	}
	public function cluster_create()
	{
		$this->load->view('cluster_create');
	}
	public function cluster_update()
	{
		$this->load->view('cluster_update');
	}
	public function cluster_devices()
	{
		$this->load->view('cluster_devices');
	}
	public function cluster_device_details()
	{
		$this->load->view('cluster_device_details');
	}
	public function cluster_device_update()
	{
		$this->load->view('cluster_device_update');
	}
	public function cluster_move_device()
	{
		$this->load->view('cluster_move_device');
	}
	// cluster end


	public function apps_and_services()
	{
		$this->load->view('apps_and_services');
	}
	
	// tracking start
	public function tracking()
	{
		$this->load->view('tracking');
	}
	public function tracking_devices()
	{
		$this->load->view('tracking_devices');
	}
	// tracking end
	// app monitoring start
	public function app_monitoring()
	{
		$this->load->view('app_monitoring');
	}
	public function app_monitoring_create()
	{
		$this->load->view('app_monitoring_create');
	}
	public function app_monitoring_update()
	{
		$this->load->view('app_monitoring_update');
	}
	// app monitoring end
	public function notification()
	{
		$this->load->view('notification');
	}
	public function user_account()
	{
		$this->load->view('user_account');
	}
	public function user_account_create()
	{
		$this->load->view('user_account_create');
	}
	public function user_account_update()
	{
		$this->load->view('user_account_update');
	}
	public function department()
	{
		$this->load->view('department');
	}
	public function department_create()
	{
		$this->load->view('department_create');
	}
	public function department_update()
	{
		$this->load->view('department_update');
	}
	public function location()
	{
		$this->load->view('location');
	}
	public function location_create()
	{
		$this->load->view('location_create');
	}
	public function location_update()
	{
		$this->load->view('location_update');
	}
	public function permission()
	{
		$this->load->view('permission');
	}
	public function permission_create()
	{
		$this->load->view('permission_create');
	}
	public function permission_update()
	{
		$this->load->view('permission_update');
	}
	public function user_role()
	{
		$this->load->view('user_role');
	}
	public function user_role_create()
	{
		$this->load->view('user_role_create');
	}
	public function user_role_update()
	{
		$this->load->view('user_role_update');
	}
	// rmm end
	
}