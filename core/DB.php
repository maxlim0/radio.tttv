<?php
require "config.php";
/**
 *	Класс работы с базой данных
 */
class DB {

	private $conn; 

	function __construct() {
		$this->connect();
	} 
	
/**
 * соединение с базой  
 * @param object $connect_type [optional]
 * @return 
 */
	function connect() {
			$this->conn = @mysql_connect(DB_HOST, DB_LOGIN, DB_PASSWORD);
			if ($this->conn!==false) {
		    $select_db = mysql_select_db(DB_BASE_NAME,$this->conn);
				$this->query('SET NAMES '.DB_CHARSET.';',$this->conn);
			} else {
				die('Соединение с базой '.DB_BASE_NAME.' не установлено !');
			} 
	}

/** запрос в базу
 * 
 * @param object $query строка запроса
 * @return 
 */
	function query($query) {
		$result = mysql_query($query,$this->conn);
		if ($this->error($this->conn)!=='') {
			var_d($this->error($this->conn)); die();
		} else {
			return $result;
		}
	}

	function num_rows($qw) {
		return mysql_num_rows($qw);
	}
	
	function fetch_array($qw) {
		return mysql_fetch_array($qw);
	}

	function fetch_assoc($qw) {
		return mysql_fetch_assoc($qw);
	}

	function fetch_row($qw) {
		return mysql_fetch_row($qw);
	}

	function result($qw, $row, $field) {
		return mysql_result($qw, $row, $field);
	}

	function escape($string) {
		return mysql_real_escape_string($string, $this->conn);
	}


	function error() {
		return mysql_error($this->conn);
	}

	function close() {
		return mysql_close($this->conn);
	}

/** функция next_table_id возвращает следущий автоинкрементный ID указанной таблицы
 * 
 * @param object $table - таблица
 * @return 
 */
	function next_table_id($table){
		$qw = $this->query('SHOW TABLE STATUS LIKE "'.$table.'"');
		if ($this->num_rows($qw)>0) { 
			$re = $this->fetch_array($qw);
			return (int)$re["Auto_increment"];
		} else {
			return false;
		}
	}


/** простая вставка таблицу 
 * 
 * @param object $table = строка, имя таблицы,
 * @param object $insert_array = array('key'=>'value','key2'=>'value2', ...) 
 * @return - только что вставленный id 
 */
	function simple_insert($table,$insert_array){
		$table="`".$table."`";
		$fields=array();
		$values=array();
		foreach ($insert_array as $key=>$value) {
			$fields[]="`".$key."`";
			if ($value!="NOW()") {
				$values[]="'".$this->escape($value)."'";
			} else {
				$values[]="".$value."";
			}
		}		
		
		$f=implode(",",(array)$fields);
		$v=implode(",",(array)$values);
		
		$sql="INSERT INTO ".$table." (".$f.") VALUES(".$v.");";
		
		$result=$this->query($sql);
		
		if ($this->error()!='') {
			var_d($sql.' '.$this->error());die();
		} 
		return $this->insert_id();
	}

/** простой апдейт в таблицу
 * 
 * $insert_array = array('key'=>'value', 'key2'=>'value2');
 * $where_array = array('key'=>'value', 'key2'=>'value2');
 * лимит 1 - так, на всякий случай
 */
	function simple_update($table,$update_array,$where_array){
		if (!empty($update_array)&&($table!='')) {
			
			$updates=array();
			foreach ($update_array as $key=>$value) {
				if ($value!="NOW()") {
					$updates[]="`".$key."` = '".$value."'";
				} else {
					$updates[]="`".$key."` = ".$value."";
				}
			}		
			$u=implode(",",(array)$updates);
	
			if (!empty($where_array)) {	
				$wheres=array();
				foreach ($where_array as $key=>$value) {
					$wheres[]="`".$key."` = '".$value."'";
				}		
				$w=implode(" AND ",(array)$wheres);
			} else {
				$w="";
			}
			
			
			$sql="UPDATE ".$table." SET ".$u." WHERE ".$w." LIMIT 1;";
			$result=$this->query($sql);
		}
	}

}	
?>