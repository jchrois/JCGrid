<?php
include("./db_class.php");


if(isset($_GET['name'])) {
    $name = $_GET['name'];
} else {
    $name = 'test';
}


$out = "";
//$out .= "header('Content-Type: application/json');";

try {

    $db = DB::getInstance();

    $sql = "SELECT * FROM animals WHERE animal_name='" . $name . "'";

    $sth = $db->prepare($sql);
    $sth->execute();
    
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);

    $out .= json_encode($result);


}

catch(PDOException $e) {
    	echo $e->getMessage();
}


echo $out;

?>