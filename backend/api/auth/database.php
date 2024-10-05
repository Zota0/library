<?php
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    class database {
        private mysqli|null $conn = null;
        private array $conf;

        public function __construct() {
            $this->conf = [
                "host" => "localhost",
                "user" => "root",
                "pass" => "",
                "db" => "test",
                "port" => 3306,
            ];
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
                throw new Exception("Database Error: Connection failed: " . $conn->connect_error); 
            }

            $this->conn = $conn;
        }

        
            public function SQL(string $sql, array $params = null) {
        if($this->conn == null) {
            $this->ConnectToDB();
        }

        if($params !== null) {
            $stmt = $this->conn->prepare($sql);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $this->conn->error);
            }

            $types = '';
            foreach ($params as $param) {
                $type = gettype($param);
                switch ($type) {
                    case 'string':
                        $types .= 's';
                        break;
                    case 'integer':
                        $types .= 'i';
                        break;
                    case 'double':
                        $types .= 'd';
                        break;
                    case 'boolean':
                        $types .= 'i'; 
                        break;
                    case 'null':
                        $types .= 's'; 
                        break;
                    default:
                        throw new Exception("Unsupported parameter type: " . $type);
                }
            }

            $stmt->bind_param($types, ...$params); // Correctly bind parameters
            if (!$stmt->execute()) {
                throw new Exception("Execute failed: " . $stmt->error);
            }
            $stmt->close();
            return $this->conn->insert_id;

        } else {
            $normal_query = $this->conn->query($sql);
            if(!$normal_query) {
                throw new Exception("Query failed: " . $this->conn->error);
            }
            return $normal_query;
        }
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