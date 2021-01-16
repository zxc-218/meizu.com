<?php
include('./library/conn.php');
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];
$email = $_REQUEST['email'];
$phone = $_REQUEST['phone'];
$sex = $_REQUEST['sex'];
$address = $_REQUEST['address'];
$age = $_REQUEST['age'];

$sql = "select * from users where phone = '$phone'";

$result = $mysqli->query($sql);
if($result->num_rows>0){
    echo '<script>alert("手机号已注册");</script>';
    echo '<script>location.href="../src/html/register.html"</script>';
    $mysqli->close();  //关闭连接
    die();  //终止代码往下写
}

$insetSql = "insert into users (username,password,email,phone,sex,address,age) values ('$username','$password','$email','$phone','$sex','$address','$age')";

$res = $mysqli->query($insetSql);

var_dump($result->num_rows);

if($res == false){
   echo '<script>alert("注册成功");location.href="../src/html/login2.html"</script>';
}else{
    echo '<script>alert("注册失败");location.href="../src/html/register.html"</script>';
}
$mysqli->close();
?>