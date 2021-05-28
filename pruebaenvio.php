<?php
$url = "https://api.mercadopago.com/preapproval";
$data = array(
    'preapproval_plan_id' => '2c93808479aa1ade0179ab30fee4009f',

    'card_token_id' => $_POST['card_token_id'],
    'payer_email' => 'melina.julieta.macko@gmail.com'
);
$payload = json_encode($data);
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
//curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);


$headers = array(
   "Authorization: Bearer APP_USR-7729808866587559-042423-8cee79c437520041fb7a70b14e542af8-148162511",
   "Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
//return response instead of outputting
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload );

$resp = curl_exec($curl);
echo $resp;
curl_close($curl);




?>