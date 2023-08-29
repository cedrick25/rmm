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

	// rmm start
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
	public function tracking()
	{
		$this->load->view('tracking');
	}
	public function whitelisting()
	{
		$this->load->view('whitelisting');
	}
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