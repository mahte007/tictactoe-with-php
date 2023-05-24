<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = 'localhost:3000';
		private $dbname = 'webprog';
		private $user = 'admin';
		private $pass = '123456789';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>