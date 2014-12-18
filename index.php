<?php
include("./db_class.php");







try    {
    /*** query the database ***/
    $db = DB::getInstance();
    $result = $db->query("SELECT * FROM animals");

    /*** loop over the results ***/
    foreach($result as $row)
        {
        print $row['animal_type'] .' - '. $row['animal_name'] . '<br />';
        }
    }
catch(PDOException $e)
    {
    	echo $e->getMessage();
    }


?>