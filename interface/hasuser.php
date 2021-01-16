<?php
  include('./library/conn.php');
  $phone = $_REQUEST['phone'];
  $sql = "select * from users where phone = '$phone'";
  $res = $mysqli->query($sql);
  $mysqli->close();
  if($res->num_rows>0){
      echo '{"phone":"'.$phone.'","has":true,"msg":"手机号已存在"}';
     }
     else{
      echo '{"phone":"'.$phone.'","has":false,"msg":"手机号可以使用"}'; 
     }
?>