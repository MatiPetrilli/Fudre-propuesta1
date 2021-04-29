<?php
  $token = $_REQUEST["token"];
  $payment_method_id = $_REQUEST["payment_method_id"];
  $installments = $_REQUEST["installments"];
  $issuer_id = $_REQUEST["issuer_id"];


  require_once 'vendor/autoload.php';

  MercadoPago\SDK::setAccessToken("APP_USR-7729808866587559-042423-8cee79c437520041fb7a70b14e542af8-148162511");
  //...
  $payment = new MercadoPago\Payment();
  $payment->transaction_amount = $_REQUEST['importe'];
  $payment->token = $token;
  $payment->description = $_REQUEST['descripcion'];
  $payment->installments = $installments;
  $payment->payment_method_id = $payment_method_id;
  $payment->issuer_id = $issuer_id;
  $payment->payer = array(
 "email" => $_REQUEST['mail_user']
 );
  // Guarda y postea el pago
  $payment->save();
  //...
  // Imprime el estado del pago
  echo $payment->status;
  //...
  header("Location: index.html?status=".$payment->status.'&#contact');
        die();

?>