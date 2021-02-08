<?php
    $EMAIL_TO = 'ivaneichyk.ivan@gmail.com';
    $SUBJECT = 'Order from litecoin';
    if($_REQUEST && $_REQUEST['name'] && $_REQUEST['email'] && $_REQUEST['phone']){
        $address = $EMAIL_TO;
        $subject = $SUBJECT;
        $header = "Content-Type: text/html; charset=utf-8";
        $message = '
            <p><strong>Name: </strong><span>'.$_REQUEST['name'].'</span></p>
            <p><strong>Phone: </strong><span>'.$_REQUEST['phone'].'</span></p>
            <p><strong>Email: </strong><span>'.$_REQUEST['email'].'</span></p>
        ';
        if($_REQUEST['message'] && strlen($_REQUEST['message']) > 0){
            $message .= '<p><strong>Message: </strong><span>'.$_REQUEST['message'].'</span></p>';
        }
        try{
            mail($address,$subject,$message, $header);
        } catch (Exception $e) {
            echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
        }
    }
?>