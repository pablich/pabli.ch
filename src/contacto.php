<?php
if (!$_POST ["test"]) {
$nombre = $_POST ["nombre"];
$telefono = $_POST ["telefono"];
$email = $_POST ["email"];
$comentario = $_POST ["comentario"];
$subject1 = "Contacto Pabli.ch $subject";
$headers = "From:  $nombre <$email>";
$host = gethostbyaddr(
$_SERVER["REMOTE_ADDR"]);
$to = "yo@pabli.ch";
$ip =
$_SERVER["REMOTE_ADDR"];
$mensaje = "Contacto desde www.pabli.ch\n\n";  
$mensaje .= "Nombre: " . $nombre . "\n"; 
$mensaje .="Telefono: " . $telefono  . "\n"; 
$mensaje .="E-mail: " . $email  . "\n"; 
$mensaje .="Mensaje: " . $comentario . "\n"; 
$mensaje .="Mas informacion ----> http://www.pabli.ch/\n"; 
mail ($to, $subject1,$mensaje,$headers);
header ("Location: http://www.pabli.ch");
}else{
header ("Location: http://www.pabli.ch");
}
?>