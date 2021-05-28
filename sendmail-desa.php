<?php
 ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $to = "membresias@fudre.com.ar";
    $subject = "Suscripcion a membresia!";
    $message = "Hola! Quiero registrarme a Fudre!\n
                Nombre: ". $_POST['Nombre'] . "\n
                Apellido: " . $_POST['Apellido'] . "\n
                Mail: " . $_POST['Email'] . "\n
                Telefono: " . $_POST['Telefono'] . "\n
                DNI: " . $_POST['DNI'] . "\r\n\r\n
                --------- DATOS DE ENTREGA -----------\r\n
                Calle: " . $_POST['Calle'] . "\n
                Altura: " . $_POST['Altura'] . "\n
                Piso / puerta: " . $_POST['Piso'] . "\n
                Codigo postal: " . $_POST['Codigo-Postal'] . "\n
                Ciudad: " . $_POST['Ciudad'] . "\n
                Provincia: " . $_POST['Provincia'] . "\r\n\r\n
                --------- DATOS DEL PRODUCTO ----------\r\n
                Membresia: " . $_POST['Membresia'] . "\n
                Botellas: " . $_POST['Botellas'] . "\n
                Comentarios: " . $_POST['Informacion'] . "\n";
    
    // if(mail($to,$subject,$message)) {
		// header("Location: https://www.mercadopago.com/mla/debits/new?preapproval_plan_id=2c93808477ddcf340177dee284d902ea");
        // die();
        echo "Ok";
    // } else {
    //     echo "Error";
    // 	// header("Location: index.html");
    //     // die();
    // }
?>