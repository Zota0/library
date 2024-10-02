<?php
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    class config {
        public array $config = [];

        public function __construct() {
            $this->read_config();
        }

        public function read_config() {
            $config_pathname = "config.ini";
            $def_conf = [
                "host" => "localhost",
                "user" => "root",
                "pass" => "",
                "db" => "test",
                "port" => 3306,
            ];

            if(!file_exists($config_pathname)) {
                $this->config = $def_conf;
                return;
            }
            
            $file_open = fopen($config_pathname, "r");
            $file_read = fread($file_open, filesize($config_pathname));
            $file_ini = parse_ini_string($file_read, true);

            if(gettype($file_ini) != "array") {
                $this->config = $def_conf;
                return;
            }

            $this->config = $file_ini;
            return;
        }
    
        public function get() {
            return $this->config;
        }
    }


    class database {
        private mysqli|null $conn = null;
        private array|null $conf = null;

        public function __construct() {
            $config = new Config();
            $this->conf = ($config->get());
        }

        public function ConnectToDB() {
            $conn = new mysqli(
                $this->conf["host"],
                $this->conf["user"],
                $this->conf["pass"],
                $this->conf["db"],
                $this->conf["port"]
            );
            if($conn->connect_error) {
                $this->conn = null;
                die("Connection failed: " . $conn->connect_error);
            }

            $this->conn = $conn;
        }

        public function SQL(
                string $sql,
                array|null $params = null,
                int|null $result_mode = null
            ) {
            
            if($this->conn == null) {
                $this->ConnectToDB();
            }

            $query = null;
            if($params != null) {
                $binds = "";
                
                foreach($params as $k => $v) {
                    if(gettype($v) == "string") {
                        $binds .= "s";
                    } else if(gettype($v) == "integer") {
                        $binds .= "i";
                    } else if(gettype($v) == "double") {
                        $binds .= "d";
                    } else if(gettype($v) == "boolean") {
                        $binds .= "b";
                    }
                }
                $params_ = [...$params];

                $query_stmt = $this->conn->prepare($sql);
                $query = $query_stmt->bind_param($binds, ...$params_);
            } else {
                $query = $this->conn->query($sql, $result_mode);
            }

            return $query;
        }

        public function Fetch(string $f_type, $sql) {
            return match($f_type) {
                "n_assoc" => $sql->fetch_array(MYSQLI_ASSOC),
                "n_num" => $sql->fetch_array(MYSQLI_NUM),
                "n_both" => $sql->fetch_array(MYSQLI_BOTH),
                "n_object" => $sql->fetch_object(),
                "n_field" => $sql->fetch_field(),
                
                "a_fields" => $sql->fetch_fields(),
                "a_assoc" => $sql->fetch_all(MYSQLI_ASSOC),
                "a_num" => $sql->fetch_all(MYSQLI_NUM),
                "a_both" => $sql->fetch_all(MYSQLI_BOTH),

                "count" => $sql->num_rows,

                default => null,
            };
        }

        public function Close() {
            if($this->conn != null) {
                $this->conn->close();
                return 0;
            }
            return 1;
        }
    }