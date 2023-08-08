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
	// rmm end
	
}